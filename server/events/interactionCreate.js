import { checkFeature } from '#helpers';
import { Events } from 'discord.js';


export default {
  name: Events.InteractionCreate,
  panelId: "event:slashCommandExecuter",
  async execute(client, interaction) {
	
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.slashCommands.get(interaction.commandName);
    const botId = interaction.client.user.id;

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    const isAllowed = await checkFeature(`slash:${interaction.commandName}`, botId);
    if (!isAllowed) return;

    try {
      await command(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
    }
  }
};
