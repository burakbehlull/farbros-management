import express from 'express';
import { BotAdd } from '#controllers';

const router = express.Router();

router.get('/', BotAdd);


export default router;
