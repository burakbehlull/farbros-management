export default {
    name: 'hello',
    description: 'Hello command, replies with hi.',
	panelId: 'prefix:hello',
    execute(client, message, args) {
      message.reply('Hi! 🏓');  
    },
};
  