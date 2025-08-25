import { Bot, BotFeature } from "#models";

async function checkFeature(panelId, botId) {
    const bot = await Bot.findOne({ botId });
    if (!bot) return false;
    const botFeature = await BotFeature.find({ bot: bot._id }).populate('feature');
    const feature = botFeature.find(f => f.feature.panelId === panelId);
    if (!feature || !feature.status) return false;

    return feature.status;
}

function allowToFeatures(allowData, features) {
  const allows = []

  for (const f of features) {
    const result = allowData.find(allow => allow.panelId === f.feature.panelId);
    if(result) allows.push(result);
  }
  return allows;
}

async function eventExecuter(client, events, botId){
	for (const event of events) {
    // event execution
		if (event.once) {
		    client.once(event.name, async (...args) => {
          const isAllowed = await checkFeature(event.panelId, botId);
          if(!isAllowed) return
          event.execute(client, ...args)
        });
		} else {
		    client.on(event.name, async (...args) => {
          const isAllowed = await checkFeature(event.panelId, botId);
          if(!isAllowed) return
          event.execute(client, ...args)
        });
		}

	}
}

export {
  checkFeature,
	allowToFeatures,
	eventExecuter
}