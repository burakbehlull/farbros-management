import express from 'express';
import { botList, UploadFeatures } from '#controllers'

const router = express.Router();

router.get('/', (req,res)=> {
	res.status(200).json({status: true, data: botList || []})
});

router.post("/sync", UploadFeatures)


export default router;
