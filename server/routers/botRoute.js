import express from 'express'
const router = express.Router();

import { BotStart } from '../controllers/botController.js'

router.route('/start').post(BotStart)

export default router;