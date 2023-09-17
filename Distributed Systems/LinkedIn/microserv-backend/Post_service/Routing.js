import express  from 'express';
import { setPostInfo } from './Post.js';
import { getPostInfo, getPhoto } from './Feed.js';

const router = express.Router();

router.post('/post',setPostInfo);
router.get('/news',getPostInfo);
router.get('/photo',getPhoto);

export default router;