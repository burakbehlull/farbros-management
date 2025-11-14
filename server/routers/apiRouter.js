import express from 'express';

const apiRouter = express.Router();

import { botRoute, featureRoute, botFeatureRoute, userRoute, messageRoute } from "#routers"

apiRouter.use('/bots', botRoute)
apiRouter.use('/features', featureRoute)
apiRouter.use('/bot-feature', botFeatureRoute)
apiRouter.use('/user', userRoute)
apiRouter.use('/messages', messageRoute)


export default apiRouter;

