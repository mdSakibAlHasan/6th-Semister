//const express = require('express');
import express  from 'express';
import { login } from './Login.js';
import { CreateAccount } from './CreateAccount.js';
import { setPostInfo } from './Post.js';
import { getPostInfo, getPhoto } from './Feed.js';
import { getNotification, getPostDetails, getID } from './Notification.js';

const router = express.Router();

router.post("/login", login);
router.post('/register',CreateAccount);
router.post('/post',setPostInfo);
router.get('/news',getPostInfo);
router.get('/photo',getPhoto);
router.get('/notification',getNotification);
router.post('/getPostDetails',getPostDetails);
router.get('/getID',getID);


export default router;