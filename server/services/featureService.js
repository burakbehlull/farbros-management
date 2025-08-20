
// feature all

import { Feature } from "#models";

const getFeatureList = async () => {
    try {
        const features = await Feature.find({});
        if (!features || features.length === 0) {
            throw new Error("No features found");
        }
        return features;
    } catch (error) {
        console.error("[getFeatureList] Error fetching features:", error);
        throw new Error("Error fetching feature list");
    }
};

