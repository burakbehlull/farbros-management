import express from 'express';

import { UserCreate, UserLogin, UserRegister, UserProfile } from '#controllers'


const router = express.Router();

router.post('/', UserCreate);
router.post('/login', UserLogin);
router.post('/register', UserRegister);
router.get('/:id', UserProfile);

export default router;
