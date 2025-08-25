import express from 'express';
import { GetBotFeatureById, AddManyToBotFeatures, AddOneToBotFeature, RemoveFromBotFeature, UpdateBotFeatureStatus } from '#controllers'


const router = express.Router();


router.get('/', GetBotFeatureById);

router.post('/one', AddOneToBotFeature);
router.post('/many', AddManyToBotFeatures);

router.put('/', UpdateBotFeatureStatus);

router.delete('/', RemoveFromBotFeature);


export default router;
