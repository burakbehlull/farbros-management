import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { REST, Routes } from 'discord.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getFilesRecursively(dir) {
  let results = [];

  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of list) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      const subDirFiles = await getFilesRecursively(fullPath);
      results = results.concat(subDirFiles);
    } else if (file.name.endsWith(".js") || file.name.endsWith(".ts")) {
      results.push(fullPath);
    }
  }
  return results;
}

async function loadPrefixCommands() {
  const prefixCommands = []
  const commandsPath = path.join(__dirname, "../commands/prefix-commands");
  const commandFiles = await getFilesRecursively(commandsPath);

  for (const filePath of commandFiles) {
    const command = (await import(`file://${filePath}`)).default;
    if (!command?.name) continue;

    prefixCommands.push({...command, type: 'prefix'});
    console.log(`📢 Prefix komutu yüklendi: ${command.name}`);
  }
  return prefixCommands
}

async function loadSlashCommands() {
  const slashCommands = []
  const commandsPath = path.join(__dirname, "../commands/slash-commands");
  const commandFiles = await getFilesRecursively(commandsPath);

  for (const filePath of commandFiles) {
    const command = (await import(`file://${filePath}`)).default;
    if (!command?.data) continue;

	slashCommands.push({...command, name: command.data.name, type: 'slash'});
    console.log(`⚡ Slash komutu yüklendi: ${command.data.name}`);
  }
  return slashCommands
}

async function loadEvents() {
  const events = []
	
  const eventsPath = path.join(__dirname, "../events");
  const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".js") || f.endsWith(".ts"));

  for (const file of eventFiles) {
    const event = (await import(`file://${path.join(eventsPath, file)}`)).default;

    if (!event?.name) continue;
      
    events.push({...event, type: 'event'});
    
    console.log(`🎯 Event yüklendi: ${event.name}`);
  }
  return events
}

async function deploySlashCommands(token, botId, commands) {
  const rest = new REST().setToken(token);
    try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const data = await rest.put(
      Routes.applicationCommands(botId),
      { body: commands },
    );

      console.log(`✅ Successfully reloaded ${data.length} application (/) commands.`);
      return {
        success: true,
        message: "Successfully reloaded ${data.length} application (/) commands.",
        count: data.length || 0
      }
    } catch (error) {
      console.error('❌ Failed to refresh commands:', error);
      return {
        success: false,
        message: 'Failed to refresh commands:', error
      }
    }
}


export {
    loadPrefixCommands,
    loadSlashCommands,
    loadEvents,
    deploySlashCommands
}