import express  from 'express';
import { getNotification, getPostDetails, setNotification } from './Notification.js';

const router = express.Router();

router.get('/notification',getNotification);
router.post('/setNotification',setNotification);
router.get('/getPostDetails',getPostDetails);


export default router;