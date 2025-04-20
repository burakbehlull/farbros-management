import express from "express";
import { addFeature, getFeatures } from "../controllers/FeatureController.js";

const router = express.Router();

router.post("/", addFeature);
router.get("/", getFeatures);

export default router;
