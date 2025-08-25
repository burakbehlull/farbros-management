import express from 'express';
import { botList, uploadFeatures, addToFeature, updateToFeature, featureList } from '#controllers'

const router = express.Router();

router.get('/', featureList);

router.post("/sync", uploadFeatures);

router.post("/add", addToFeature);
router.put("/update", updateToFeature);


export default router;
