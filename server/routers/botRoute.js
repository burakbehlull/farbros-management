import express from 'express';
import { BotAdd } from '#controllers';

const router = express.Router();

router.get('/', GetBots)
router.post('/', BotAdd);


export default router;
