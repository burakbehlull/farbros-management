import express from 'express';
const apiRouter = express.Router();

import { botRoute } from './index.js'

apiRouter.use('/bot', botRoute)

export default apiRouter;