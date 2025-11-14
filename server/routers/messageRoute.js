import express from 'express';
import { GetMessages, CreateMessage } from '#controllers';

const router = express.Router();

router.post('/:botId', GetMessages);
router.post('/:botId/create', CreateMessage);

export default router;
