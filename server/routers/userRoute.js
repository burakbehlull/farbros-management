import express from 'express';

import { UserCreate, UserLogin, UserRegister, UserProfile, GetUsersBot } from '#controllers'


const router = express.Router();

router.post('/', UserCreate);
router.post('/login', UserLogin);
router.post('/register', UserRegister);
router.get('/:id', UserProfile);
router.get('/:userId/bots', GetUsersBot);

export default router;
