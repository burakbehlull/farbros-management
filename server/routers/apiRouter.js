import express from 'express';

const apiRouter = express.Router();

import { botRoute, featureRoute, botFeatureRoute } from "#routers"

apiRouter.use('/bots', botRoute)
apiRouter.use('/features', featureRoute)
apiRouter.use('/bot-feature', botFeatureRoute)

export default apiRouter;