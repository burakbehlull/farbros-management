import express from "express";
import {
    GetFeatures,
    AddFeature,
    UpdateFeatures,
	UpdateSingleFeature 
} from "../controllers/featureController.js";

const router = express.Router();

router.get("/:id", GetFeatures);
router.post("/:id", AddFeature);
router.put("/:id/", UpdateFeatures);
router.patch("/:id", UpdateSingleFeature);

 

export default router;
