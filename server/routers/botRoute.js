import express from 'express';
import { GetBots, BotAdd, BotStart, BotStop, Test, } from '#controllers';

const router = express.Router();

router.get('/', GetBots)
router.post('/', BotAdd);
router.post('/:id/start', BotStart);
router.post('/:id/stop', BotStop);
router.get('/test', Test);


export default router;
