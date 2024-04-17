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
        console.log('err.message',err.message);
      }else{
        req.userId = decoded.userId;
        console.log('is this decoded',decoded);
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