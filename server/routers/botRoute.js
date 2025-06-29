import express from 'express';
import { Test } from '#controllers';

const router = express.Router();

router.get('/', Test);


export default router;
