//const express = require('express');
import express  from 'express';
import { login } from './Login.js';
import { CreateAccount } from './CreateAccount.js';
import { setPostInfo } from './Post.js';
import { getPostInfo } from './Feed.js';

const router = express.Router();

router.post("/login", login);
router.post('/register',CreateAccount);
router.post('/post',setPostInfo);
router.get('/news',getPostInfo);


export default router;