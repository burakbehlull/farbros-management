import { Feature } from "#models";

const getFeatureList = async () => {
    try {
        const features = await Feature.find({});
        return features;
    } catch (error) {
        console.error("[getFeatureList] Error fetching features:", error);
        throw new Error("Error fetching feature list");
    }
};


const getFeatureByPanelId = async (panelId) => {
    try {
        const feature = await Feature.findOne({ panelId });
        if (!feature) {
            throw new Error(`Feature with panelId ${panelId} not found`);
        }
        return feature;
    } catch (error) {
        console.error(`[getFeatureByPanelId] Error fetching feature with panelId ${panelId}:`, error);
        throw new Error(`Error fetching feature with panelId ${panelId}`);
    }
};

const addFeature = async (featureData) => {
    try {
        const newFeature = new Feature(featureData);
        await newFeature.save();
        return newFeature;
    }
    catch (error) {
        console.error("[addFeature] Error adding feature:", error);
        throw new Error("Error adding feature");
    }
};

const addManyFeatures = async (featuresData) => {
    try {
        const results = [];

        for (const feature of featuresData) {
            const updated = await Feature.findOneAndUpdate(
                { panelId: feature.panelId },
                { $set: feature },
                { upsert: true, new: true }
            );
            results.push(updated);
        }

        return results;
    } catch (error) {
        console.error("[addManyFeatures] Error adding/updating features:", error);
        throw new Error("Error adding/updating features");
    }
};

const updateFeature = async (panelId, updateData) => {
    try {
        const updatedFeature = await Feature.findOneAndUpdate(
            { panelId },
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedFeature) {
            throw new Error(`Feature with panelId ${panelId} not found`);
        }
        return updatedFeature;
    } catch (error) {
        console.error(`[updateFeature] Error updating feature with panelId ${panelId}:`, error);
        throw new Error(`Error updating feature with panelId ${panelId}`);
    }
};

export {
    getFeatureList,
    getFeatureByPanelId,
    addFeature,
    addManyFeatures,
    updateFeature
};