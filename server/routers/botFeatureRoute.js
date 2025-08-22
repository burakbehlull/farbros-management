import express from 'express';
import { botList } from '#controllers'

const router = express.Router();

router.get('/', (req,res)=> {
	res.status(200).json({status: true, data: botList || []})
});


export default router;
