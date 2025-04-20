import express from 'express';

const apiRouter = express.Router();

import { botRoute, featureRoute, botFeatureRoute } from './index.js'

apiRouter.use('/bots', botRoute)
apiRouter.use('/features', featureRoute)
apiRouter.use('/bot-features', botFeatureRoute)

export default apiRouter;