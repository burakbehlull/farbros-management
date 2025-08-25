export default {
    name: 'selam',
    description: 'Selam command, replies with selam.',
	panelId: 'prefix:selam',
    execute(client, message, args) {
      message.reply('Selamün Aleyküm!');  
    },
};
  