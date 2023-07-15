// const express = require('express');
// const cors = require('cors');
import express  from 'express';
import cors from 'cors';
import Router from './src/Routing.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

app.get('/',(req,res)=>{
    res.send('This is home page get');
});
app.post('/',(req,res)=>{
    res.send('This is home page post');
});


app.use('/app',Router);
// app.use('/api',authRoutes);
// app.use('/app',profileRoute);
// app.use('/RD',RDroute);
// app.use('/edit',EditProfile);


{/* <script src="https://smtpjs.com/v3/smtp.js">
</script> */}

app.listen(3001,()=>{
    console.log('lisening on port 3001');
});