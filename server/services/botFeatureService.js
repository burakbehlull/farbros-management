import { BotFeature } from "#models";


const getByBotId = async (botId) => {
    try {
        const botFeatures = await BotFeature.find({ bot: botId }).populate("feature");
        if (!botFeatures || botFeatures.length === 0) {
            throw new Error(`No features found for bot with ID ${botId}`);
        }
        return botFeatures;
    } catch (error) {
        console.error(`[getByBotId] Error fetching features for bot with ID ${botId}:`, error);
        throw new Error(`Error fetching features for bot with ID ${botId}`);
    }
    
}