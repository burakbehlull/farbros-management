// feature codes..
import { BotFeature } from "#models";
import { botFeatureService, botService } from "#services";

const { getFeaturesByBotId, addManyBotFeatures, addBotFeature, removeBotFeature, setBotFeatureStatus } = botFeatureService;
const { getBotById } = botService;


// Get Bot Feature By Id
const GetBotFeatureById = async (req,res) => {
    try {
        const features = await getFeaturesByBotId(req.body.botId);
        return res.status(200).json({ status: true, data: features });
    } catch (err) {
        console.error("[bot feature controller  - Get Bot Features]:", err);
        return res.status(500).json({ message: "Özellikler getirilemedi.", error: err.message });
    }
}

// Add Many To Bot Features
const AddManyToBotFeatures = async (req,res) => {
    const { botId, data } = req.body;
    try {
        const bot = await getBotById(botId);
        if (!bot) return res.status(200).json({ status: true, message: "Bot not found" })

        const features = await addManyBotFeatures(bot._id, data);
        return res.status(200).json({ status: true, data: features });
    } catch (err) {
        console.error("[bot feature controller  - Add Many To Bot Features]:", err);
        return res.status(500).json({ message: "Özellikler eklenemedi.", error: err.message });
    }
}

// Add One To Bot Feature
const AddOneToBotFeature = async (req, res) => {
    const { botId, feature } = req.body;
    try {
        /*
        const bot = await getBotById(botId);
        if (!bot) return res.status(200).json({ status: true, message: "Bot not found" });
        */
        const featureExists = await BotFeature.findOne({ feature, bot: botId });
        if (featureExists) return res.status(200).json({ status: true, message: "Bu özellik botta mevcut." });

        const result = await addBotFeature({ feature, bot: botId });
        return res.status(200).json({ status: true, message: "Özellik eklendi", data: result });
    } catch (err) {
        console.error("[bot feature controller  - Add One To Bot Feature]:", err);
        return res.status(500).json({ message: "Özellik eklenemedi.", error: err.message });
    }
}

// Remove From Bot Feature
const RemoveFromBotFeature = async (req, res) => {
    const { botId, featureId } = req.body;
    try {
        const result = await removeBotFeature(featureId, botId);
        return res.status(200).json({ status: true, data: result });
    } catch (err) {
        console.error("[bot feature controller  - Remove Bot Feature]:", err);
        return res.status(500).json({ message: "Özellik kaldırılamadı.", error: err.message });
    }
}

// Update Bot Feature Status
const UpdateBotFeatureStatus = async (req, res) => {
    const { botId, featureId, status } = req.body;
    try {
        const result = await setBotFeatureStatus(featureId, botId, status);
        return res.status(200).json({ status: true, data: result });
    } catch (err) {
        console.error("[bot feature controller  - Update Bot Feature Status]:", err);
        return res.status(500).json({ message: "Özellik durumu güncellenemedi.", error: err.message });
    }
}

export {
    GetBotFeatureById,
    AddManyToBotFeatures,
    AddOneToBotFeature,

    UpdateBotFeatureStatus,

    RemoveFromBotFeature
}