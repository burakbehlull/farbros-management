import Features from "../models/Features.js";

export const addFeature = async (req, res) => {
    const { name, description, type } = req.body;
    if (!name || !type) return res.status(400).json({ message: "Name ve Type zorunludur." });

    const newFeature = new Features({ name, description, type });
    await newFeature.save();
    res.json({ message: "Feature eklendi.", feature: newFeature });
};

export const getFeatures = async (req, res) => {
    const features = await Features.find({});
    res.json(features);
};