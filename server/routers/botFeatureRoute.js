import express from 'express';
import { GetBotFeatureById } from '#controllers'


const router = express.Router();


router.get('/', GetBotFeatureById);


export default router;
