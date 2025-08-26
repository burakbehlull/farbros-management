import express from 'express';
import { GetBots, BotAdd, BotStart, BotStop, updatePrefix, updateBotInfo,
    reloadAll, reloadEvents, reloadSlashCommands, reloadPrefixCommands } from '#controllers';

const router = express.Router();

router.get('/', GetBots)
router.post('/', BotAdd);
router.post('/:id/start', BotStart);
router.post('/:id/stop', BotStop);

router.put('/:id', updateBotInfo);

router.patch('/:id/prefix', updatePrefix);

router.post('/:id/reload', reloadAll);
router.post('/:id/reload/prefix', reloadPrefixCommands);
router.post('/:id/reload/slash', reloadSlashCommands);
router.post('/:id/reload/event', reloadEvents);

export default router;
