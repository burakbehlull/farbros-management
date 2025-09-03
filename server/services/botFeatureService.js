import { Bot, BotFeature } from "#models";

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
    const botFeatures = await BotFeature.insertMany(featuresData, { ordered: false, });
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


const getFeaturesByBotId = async (botId, { page = 1, limit = 9 } = {}) => {
  try {
    page = parseInt(page);
    limit = parseInt(limit);

    const bot = await Bot.findOne({ botId });
    if (!bot) {
      throw new Error(`Bot with id ${botId} not found`);
    }

    const totalItems = await BotFeature.countDocuments({ bot: bot._id });

    const botFeatures = await BotFeature.find({ bot: bot._id })
      .populate("feature")
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      features: botFeatures,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      page,
      limit,
    };
  } catch (error) {
    console.error(
      `[getFeaturesByBotId] Error fetching features for bot ${botId}:`,
      error
    );
    throw new Error(`Error fetching features for bot ${botId}`);
  }
};


const setBotFeatureStatus = async (featureId, botId, status) => {
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
  
  setBotFeatureStatus,
};
