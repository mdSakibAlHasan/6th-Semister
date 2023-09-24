import express  from 'express';
import { login } from './Login.js';
import { CreateAccount } from './CreateAccount.js';
import { getUserName } from './Connection.js';

const router = express.Router();

router.post("/login", login);
router.post('/register',CreateAccount);
router.post('/getUser',getUserName);

export default router;