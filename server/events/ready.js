import { Events, ActivityType } from 'discord.js';

export default {
	eventName: Events.ClientReady,
	name: "Ready Eventi",
	once: true,
	panelId: "event:clientReady",
	async execute(client) {
		console.log(`${client.user.tag} is here for you!`);

		client.user.setPresence({
			activities: [
				{
					name: 'SETUP',
					type: ActivityType.Watching
				}
			],
			status: "idle",
		});
		
	},
};
