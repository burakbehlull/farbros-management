import express from 'express';
import { uploadFeatures, addToFeature, updateToFeature, featureList, featureToById } from '#controllers'

const router = express.Router();

router.get('/', featureList);
router.post('/by', featureToById);

router.post("/sync", uploadFeatures);

router.post("/add", addToFeature);
router.put("/update", updateToFeature);


export default router;
