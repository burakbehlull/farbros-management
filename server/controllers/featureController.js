// feature codes..

import { featureService } from "#services";
import { loadEvents, loadPrefixCommands, loadSlashCommands } from "#helpers";
import { updateFeature } from "../services/featureService";

const { addManyFeatures, addFeature, getFeatureList } = featureService

// get all features
const featureList = async (req, res) => {
  try {
    const features = await getFeatureList();
    return res.status(200).json({ status: true, data: features });
  } catch (err) {
    console.error("[bot controller - Get Features]:", err);
    return res.status(500).json({ message: "Özellikler getirilemedi.", error: err.message });
  }
}

// upload features
const uploadFeatures = async (req, res) => {
  try {
    const slashCommands = await loadSlashCommands();
    const prefixCommands = await loadPrefixCommands();
    const events = await loadEvents();

    await addManyFeatures([...slashCommands, ...prefixCommands, ...events]);

    return res.status(200).json({ status: true, message: "Bot senkronize edildi." });
  } catch (err) {
    console.error("[bot controller - Sync]:", err);
    return res.status(500).json({ message: "Bot senkronize edilemedi.", error: err.message });
  }
};

// upload one feature
const addToFeature = async (req, res) => {
  try {
    const feature = req.body;
    await addFeature(feature);
    return res.status(201).json({ status: true, message: "Özellik eklendi." });
  } catch (err) {
    console.error("[bot controller - Add Feature]:", err);
    return res.status(500).json({ message: "Özellik eklenemedi.", error: err.message });
  }
}

// update one feature
const updateToFeature = async (req, res) => {
  try {
    const feature = req.body;
    await updateFeature(feature.panelId, feature);
    return res.status(200).json({ status: true, message: "Özellik güncellendi." });
  } catch (err) {
    console.error("[bot controller - Update Feature]:", err);
    return res.status(500).json({ message: "Özellik güncellenemedi.", error: err.message });
  }
}



export {
  featureList,
  uploadFeatures,
  addToFeature,
  updateToFeature
}