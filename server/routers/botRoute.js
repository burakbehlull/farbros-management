import express from 'express';
import { GetBots, BotAdd, Test } from '#controllers';

const router = express.Router();

router.get('/', GetBots)
router.post('/', BotAdd);
router.get('/test', Test);


export default router;
