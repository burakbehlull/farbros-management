export default {
    name: 'ping',
    description: 'Ping command, replies with pong.',
	panelId: 'prefix:ping',
    execute(client, message, args) {
      // message.reply('Pong! 🏓');  

	  console.log("ping")
    },
};
  