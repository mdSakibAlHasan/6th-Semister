//const express = require('express');
import express  from 'express';
import { login } from './Login.js';
const router = express.Router();

router.get("/login", login);


export default router;