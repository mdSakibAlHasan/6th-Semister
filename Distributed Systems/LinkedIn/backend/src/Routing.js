//const express = require('express');
import express  from 'express';
import { login } from './Login.js';
import { CreateAccount } from './CreateAccount.js';
import { createPost, setProfileInfo } from './Post.js';

const router = express.Router();

router.post("/login", login);
router.post('/register',CreateAccount);
router.post('/post',createPost);
router.post('/post2',setProfileInfo);


export default router;