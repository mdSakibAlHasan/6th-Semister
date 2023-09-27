import express  from 'express';
import { setPostInfo } from './Post.js';
import { getPostInfo, getPhoto } from './Feed.js';
import { getNotificationDetails } from './Connection.js';

const router = express.Router();

router.post('/post',setPostInfo);
router.get('/news',getPostInfo);
router.get('/photo',getPhoto);
router.post('/getNotificationDetails',getNotificationDetails);

export default router;