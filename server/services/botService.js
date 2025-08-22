import { Bot } from "#models"

const addBot = async (data) => {
  try {
    const newBot = new Bot(data);
    await newBot.save();
    return newBot;
  } catch (error) {
    console.error("[addBot] Error adding bot:", error);
    throw new Error("Error adding bot");
  }
};

const getAllBots = async () => {
    try {
        const bots = await Bot.find({});
        return bots;
    } catch (error) {
        console.error("[getFeatureList] Error fetching bots:", error);
        throw new Error("Error fetching bot list");
    }
};

const getBotById = async (botId) => {
    try {
        const bot = await Bot.findOne({ botId });
        if (!bot) {
            throw new Error(`Bot with botId ${botId} not found`);
        }
        return bot;
    } catch (error) {
        console.error(`[getBotById] Error fetching bot with botId ${botId}:`, error);
        throw new Error(`Error fetching bot with botId ${botId}`);
    }
};

const getBotByToken = async (token) => {
    try {
        const bot = await Bot.findOne({ token });
        if (!bot) {
            throw new Error(`Bot with token ${token} not found`);
        }
        return bot;
    } catch (error) {
        console.error(`[getBotById] Error fetching bot with token ${token}:`, error);
        throw new Error(`Error fetching bot with token ${token}`);
    }
};

const removeBot = async (botId) => {
  try {
    const deletedBot = await Bot.findOneAndDelete({ bot: botId });
    if (!deletedBot) {
      throw new Error(
        `Bot ${featureId} for bot ${botId} not found`
      );
    }
    return deletedBot;
  } catch (error) {
    console.error(
      `[deletedBot] Error removing bot: ${botId}`,
      error
    );
    throw new Error(`Error removing bot ${botId}`);
  }
};

export {
	addBot,
	removeBot,
	
	getAllBots,
	getBotById,
	
	getBotByToken
}
