import express from "express";
import { addBotFeature, updateBotFeatureStatus, getBotFeatures, saveBotFeatures, saveFeatures } from "../controllers/BotFeatureController.js";

const router = express.Router();

router.post("/", addBotFeature);
router.patch("/:id", updateBotFeatureStatus);
router.get("/:botId", getBotFeatures);

// bots
router.post('/sync', saveFeatures);
router.post('/apply/:botId', saveBotFeatures);

export default router;
