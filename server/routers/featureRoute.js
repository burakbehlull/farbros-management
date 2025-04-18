import express from "express";
import {
    GetFeatures,
    AddFeature,
    UpdateFeatures,
	UpdateSingleFeature 
} from "../controllers/featureController.js";

const router = express.Router();

router.get("/:id/features", GetFeatures);
router.post("/:id/feature", AddFeature);
router.put("/:id/features", UpdateFeatures);
router.put("/:id/feature", UpdateSingleFeature);

 

export default router;
