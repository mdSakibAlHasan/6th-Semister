//const express = require('express');
import express  from 'express';
import { login } from './Login.js';
import { CreateAccount } from './CreateAccount.js';
import { setPostInfo } from './Post.js';

const router = express.Router();

router.post("/login", login);
router.post('/register',CreateAccount);
router.post('/post',setPostInfo);


export default router;