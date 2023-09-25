import express  from 'express';
import { login } from './Login.js';
import { CreateAccount } from './CreateAccount.js';
import { getUserName, getNotificationUserName } from './Connection.js';

const router = express.Router();

router.post("/login", login);
router.post('/register',CreateAccount);
router.post('/getUser',getUserName);
router.post('/getNotificationUserName',getNotificationUserName);

export default router;