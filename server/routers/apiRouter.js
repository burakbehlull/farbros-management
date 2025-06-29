import express from 'express';

const apiRouter = express.Router();

import { botRoute, featureRoute } from "#routers"

apiRouter.use('/bots', botRoute)
apiRouter.use('/features', featureRoute)

export default apiRouter;