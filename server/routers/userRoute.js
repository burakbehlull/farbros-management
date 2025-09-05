import express from 'express';

import { UserCreate, UserLogin, UserRegister, UserProfile, GetUsersBot, GenerateNewAccessToken, UserAccessVerify} from '#controllers'


const router = express.Router();

router.post('/', UserCreate);
router.post('/login', UserLogin);
router.post('/register', UserRegister);
router.get('/:id', UserProfile);
router.get('/:userId/bots', GetUsersBot);

router.post('/auth/refresh', GenerateNewAccessToken);
router.post('/auth/verify', UserAccessVerify);

export default router;
