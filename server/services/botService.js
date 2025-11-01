import { Bot } from "#models"

const addBot = async (data) => {
  try {
    const newBot = new Bot(data);
    await newBot.save();
    return newBot;
  } catch (error) {
    console.error("[addBot] Error adding bot:", error);
    return {
		status: false,
		error: error
	}
  }
};

const getAllBots = async () => {
    try {
        const bots = await Bot.find({});
        return bots;
    } catch (error) {
        console.error("[getFeatureList] Error fetching bots:", error);
        return {
			status: false,
			error: error
		}
    }
};

const getBotById = async (botId) => {
    try {
        const bot = await Bot.findOne({ botId });
        if (!bot) return {
			status: false,
			message: 'Bot bulunamadı!'
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
        if (!bot) return {
			status: false,
			message: 'Bot bulunamadı'
		}
        return bot;
    } catch (error) {
        console.error(`[getBotById] Error fetching bot with token ${token}:`, error);
    }
};

const setBotByToken = async (botId, token) => {
    try {
        const bot = await Bot.findOne({ botId });
        bot.token = token
        await bot.save()
        if (!bot) return {
			status: false,
			message: "Bot bulunamadı"
		}
        return bot;
    } catch (error) {
        console.error(`[setBotById] Error fetching bot with token ${token}:`, error);
		return {
			status: false,
			error: error
		}
    }
};

const getBotByUnderScoreId = async (id) => {
    try {
        const bot = await Bot.findById({ _id: id });
        if (!bot) return {
			status: false,
			message: "Bot bulunamadı"
		}
        return bot;
    } catch (error) {
        console.error(`[getBotById] Error fetching bot with id ${id}:`, error);
        return {
			status: false,
			error: error
		}
    }
};

const removeBot = async (botId) => {
  try {
    const deletedBot = await Bot.findOneAndDelete({ bot: botId });
    if (!deletedBot) return {
		status: false,
		message: 'Bot bulunamadı'
	}
    return deletedBot;
  } catch (error) {
    console.error(`[deletedBot] Error removing bot: ${botId}`, error );
	return {
		status: false,
		error: error
	}
    
  }
};

const getPrefix = async (botId) => {
    try {
        const bot = await Bot.findOne({ botId });
        if (!bot) return { status: false, message: "Bot bulunamadı." }

        return bot.prefix;
    } catch (error) {
        console.error(`[getBotById] Error fetching bot with token`, error);
		return {
			status: false,
			error: error
		}
    }
};

export {
	addBot,
	removeBot,
	
	getAllBots,
	getBotById,
	getBotByUnderScoreId,
	
	getBotByToken,
	setBotByToken,

	getPrefix
}
