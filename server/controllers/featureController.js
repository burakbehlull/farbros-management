// feature codes..

import { featureService } from "#services";
import { loadEvents, loadPrefixCommands, loadSlashCommands } from "#helpers";

const { addManyFeatures } = featureService

const UploadFeatures = async (req, res) => {
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

export {
    UploadFeatures
}