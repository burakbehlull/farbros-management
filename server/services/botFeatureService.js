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
};

const addManyBotFeatures = async (featuresData) => {
  try {
    const botFeatures = await BotFeature.insertMany(featuresData);
    return botFeatures;
  } catch (error) {
    console.error("[addManyBotFeatures] Error adding multiple bot features:", error);
    throw new Error("Error adding multiple bot features");
  }
};


const removeBotFeature = async (featureId, botId) => {
  try {
    const deletedFeature = await BotFeature.findOneAndDelete({
      feature: featureId,
      bot: botId,
    });
    if (!deletedFeature) {
      throw new Error(
        `Bot feature with featureId ${featureId} for bot ${botId} not found`
      );
    }
    return deletedFeature;
  } catch (error) {
    console.error(
      `[removeBotFeature] Error removing feature ${featureId} bot ${botId}:`,
      error
    );
    throw new Error(`Error removing feature ${featureId}`);
  }
};


const getFeaturesByBotId = async (botId) => {
  try {
    const botFeatures = await BotFeature.find({ bot: botId }).populate("feature");
    if (!botFeatures || botFeatures.length === 0) {
      throw new Error(`No features found for bot with ID ${botId}`);
    }
    return botFeatures;
  } catch (error) {
    console.error(
      `[getFeaturesByBotId] Error fetching features for bot ${botId}:`,
      error
    );
    throw new Error(`Error fetching features for bot ${botId}`);
  }
};


const setFeatureStatus = async (featureId, botId, status) => {
  try {
    const updatedBotFeature = await BotFeature.findOneAndUpdate(
      { feature: featureId, bot: botId },
      { status },
      { new: true, runValidators: true }
    );
    if (!updatedBotFeature) {
      throw new Error(
        `Bot feature with featureId ${featureId} for bot ${botId} not found`
      );
    }
    return updatedBotFeature;
  } catch (error) {
    console.error(
      `[setFeatureStatus] Error updating feature ${featureId} bot ${botId}:`,
      error
    );
    throw new Error(`Error updating feature ${featureId}`);
  }
};

export {
  addBotFeature,
  addManyBotFeatures,
  removeBotFeature,
  getFeaturesByBotId,
  setFeatureStatus,
};
