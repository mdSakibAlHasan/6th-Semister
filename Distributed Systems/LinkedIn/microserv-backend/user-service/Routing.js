import express  from 'express';
import { login } from './Login.js';
import { CreateAccount } from './CreateAccount.js';

const router = express.Router();

router.post("/login", login);
router.post('/register',CreateAccount);

export default router;