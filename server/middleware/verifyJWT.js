import jwt from 'jsonwebtoken';
import { renewToken } from './renewToken.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import { config } from 'dotenv';
config();


const verifyJWT = (req, res, next) => {
  const accesstoken = req.cookies.accessToken;
  console.log('ACCESS TOKEN',accesstoken);
  if(accesstoken){
    console.log("CHECKING ACCESS TOKEN",accesstoken);
    jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if(err){
        console.log("ERROR", err);
        //possible fix to jwt expired error
        res.cookie('refreshToken', '', { maxAge: 10 });
        res.cookie('accessToken', '', { maxAge: 10 });
        console.log('err.message',err.message);

        return res.status(401).json({ error: 'Unauthorized' });
      }else{
        req.userId = decoded.userId;
        next();
      }
    });
  }
  else{
    renewToken(req,res, () => {
      next();
    })
  }
};

export {verifyJWT}