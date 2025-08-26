import express from 'express';

import { UserCreate, UserLogin, UserRegister } from '#controllers'


const router = express.Router();

router.post('/', UserCreate);
router.post('/login', UserLogin);
router.post('/register', UserRegister);

export default router;
