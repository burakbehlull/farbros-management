import { Events } from 'discord.js';
import { checkFeature } from '#helpers';

export default {
  name: Events.MessageCreate, 
  panelId: "event:prefixCommandExecuter",
  async execute(client, message) {
    const prefix = "."
	
	  if(message.author.bot) return
	
    const botId = message.client.user.id;

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.prefixCommands.get(commandName);
    if (!command) return;
    
    const isAllowed = await checkFeature(`prefix:${commandName}`, botId);
    console.log("isAllowed:", isAllowed);
    if (!isAllowed) return;


    try {
      await command(client, message, args);
    } catch (error) {
      console.error(`❌ Error executing command: ${commandName}`, error);
      message.channel.send('❌ There was an error executing that command.');
    }
  },
};
