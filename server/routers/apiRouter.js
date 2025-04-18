import express from 'express';
const apiRouter = express.Router();

import { botRoute, featureRoute } from './index.js'

apiRouter.use('/bot', botRoute)
apiRouter.use('/feature', featureRoute)

export default apiRouter;