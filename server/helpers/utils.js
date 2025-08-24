import { Bot, BotFeature } from "#models";

async function checkFeature(panelId, botId) {
    const bot = await Bot.findOne({ botId });
    if (!bot) return false;

    const feature = await BotFeature.findOne({ panelId, bot: bot._id });
    if (!feature || !feature.status) return false;

    return feature.status;
}

function allowToFeatures(allowData, features) {
  const allows = []
  for (const feature of features) {
    const result = allowData.find(allow => allow.panelId === feature.panelId);
    if(result) allows.push(result);
  }
  console.log(allows)
  return allows;
}

function eventExecuter(client, events){
	for (const event of events) {
		if (event.once) {
		  client.once(event.name, (...args) => event.execute(client, ...args));
		} else {
		  client.on(event.name, (...args) => event.execute(client, ...args));
		}
	}
}

export {
  checkFeature,
	allowToFeatures,
	eventExecuter
}