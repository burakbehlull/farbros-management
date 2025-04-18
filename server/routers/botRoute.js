import express from 'express'
const router = express.Router();

import { BotStart, BotAdd, GetBots } from '../controllers/botController.js'

router.route('/start').post(BotStart)
router.route('/add').post(BotAdd)
router.route('/bots').get(GetBots)

export default router;