import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping command, replies with pong.'),
  panelId: 'slash:ping',
  async execute(interaction) {
    // await interaction.reply('Pong! 🏓');
	console.log("slash:ping")
  },
};
