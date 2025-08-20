import { BotFeature } from "#models";

const addBotFeature = async (botFeatureData) => {
    try {
        const newBotFeature = new BotFeature(botFeatureData);
        await newBotFeature.save();
        return newBotFeature;
    } catch (error) {
        console.error("[addBotFeature] Error adding bot feature:", error);
        throw new Error("Error adding bot feature");
    }
}

const getFeaturesByBotId = async (botId) => {
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

const setFeatureStatus = async (panelId, status) => {
    try {
        const updatedBotFeature = await BotFeature.findOneAndUpdate(
            { panelId },
            { status },
            { new: true, runValidators: true }
        );
        if (!updatedBotFeature) {
            throw new Error(`Bot feature with panelId ${panelId} not found`);
        }
        return updatedBotFeature;
    } catch (error) {
        console.error(`[setFeatureStatus] Error updating feature status for panelId ${panelId}:`, error);
        throw new Error(`Error updating feature status for panelId ${panelId}`);
    }
};

export {
    addBotFeature,
    getFeaturesByBotId,
    setFeatureStatus
};