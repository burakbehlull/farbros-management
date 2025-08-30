// feature codes..

import { featureService } from "#services";
import { loadEvents, loadPrefixCommands, loadSlashCommands } from "#helpers";

const { addManyFeatures, addFeature, getFeatureList, getFeatureByPanelId, updateFeature } = featureService

// get all features
const featureList = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const result = await getFeatureList({ page, limit });

    return res.status(200).json({
      status: true,
      data: result.features,
      page: result.page,
      limit: result.limit,
      totalItems: result.totalItems,
      totalPages: result.totalPages,
    });
  } catch (err) {
    console.error("[bot controller - Get Features]:", err);
    return res.status(500).json({ message: "Özellikler getirilemedi.", error: err.message });
  }
}

// get one feature by panelId
const featureToById = async (req, res) => {
  try {
    const { panelId } = req.body;
    const feature = await getFeatureByPanelId(panelId);
    if (!feature) {
      return res.status(404).json({ status: false, message: "Özellik bulunamadı." });
    }
    return res.status(200).json({ status: true, data: feature });
  } catch (err) {
    console.error("[bot controller - Get Feature By ID]:", err);
    return res.status(500).json({ message: "Özellik getirilemedi.", error: err.message });
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
  featureToById,

  uploadFeatures,
  addToFeature,

  updateToFeature
}