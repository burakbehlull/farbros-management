import Bot from "../models/Bot.js";
import Feature from "../models/Feature.js";

export const GetFeatures = async (req, res) => {
    const { id } = req.params;
    const bot = await Bot.findById(id);
    if (!bot) return res.status(404).json({ message: "Bot bulunamadı." });

    const features = await Feature.find({ bot: id });
    res.json(features);
};

export const AddFeature = async (req, res) => {
    const { id } = req.params;
    const { name, status, value } = req.body;

    const bot = await Bot.findById(id);
    if (!bot) return res.status(404).json({ message: "Bot bulunamadı." });

    const existing = await Feature.findOne({ bot: id, name });
    if (existing) return res.json({ message: "Bu özellik zaten var." });

    const feature = new Feature({
        bot: id,
        name,
        status,
        value
    });

    await feature.save();
    res.json({ message: "Özellik eklendi.", feature });
};

export const UpdateFeatures = async (req, res) => {
    const { id } = req.params;
    const { features } = req.body;

    if (!Array.isArray(features)) {
        return res.status(400).json({ message: "features dizisi gerekli" });
    }

    await Feature.deleteMany({ bot: id });
    const created = await Feature.insertMany(features.map(f => ({ ...f, bot: id })));

    res.json({ message: "Özellikler güncellendi.", features: created });
};
