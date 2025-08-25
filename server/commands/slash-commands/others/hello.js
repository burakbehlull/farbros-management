import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Hello command, replies with hello.'),
  panelId: 'slash:hello',
  async execute(interaction) {
    await interaction.reply('slash Pong! 🏓');
  },
};
