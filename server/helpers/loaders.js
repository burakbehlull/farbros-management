import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

async function loadPrefixCommands(client) {
  const commandsPath = path.join(__dirname, "../commands/prefix-commands");
  const commandFiles = await getFilesRecursively(commandsPath);

  for (const filePath of commandFiles) {
    const command = (await import(`file://${filePath}`)).default;
    if (!command?.name) continue;

    client.prefixCommands.set(command.name, command);
    console.log(`📢 Prefix komutu yüklendi: ${command.name}`);
  }
}

async function loadSlashCommands(client) {
  const commandsPath = path.join(__dirname, "../commands/slash-commands");
  const commandFiles = await getFilesRecursively(commandsPath);

  for (const filePath of commandFiles) {
    const command = (await import(`file://${filePath}`)).default;
    if (!command?.data) continue;

    client.slashCommands.set(command.data.name, command);
    console.log(`⚡ Slash komutu yüklendi: ${command.data.name}`);
  }
}

async function loadEvents(client) {
  const eventsPath = path.join(__dirname, "../events");
  const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".js") || f.endsWith(".ts"));

  for (const file of eventFiles) {
    const event = (await import(`file://${path.join(eventsPath, file)}`)).default;
    if (event.once) {
      client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
      client.on(event.name, (...args) => event.execute(client, ...args));
    }
    console.log(`🎯 Event yüklendi: ${event.name}`);
  }
}

export {
    loadPrefixCommands,
    loadSlashCommands,
    loadEvents
}