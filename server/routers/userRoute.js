import express from 'express';

import { UserCreate } from '#controllers'


const router = express.Router();

router.post('/', UserCreate);

export default router;
