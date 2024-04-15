import jwt from 'jsonwebtoken';
import { renewToken } from './renewToken.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import { config } from 'dotenv';
config();


const verifyJWT = (req, res, next) => {
  const accesstoken = req.cookies.accessToken;
  if(accesstoken){
    
    jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if(err){
        console.log('err.message',err.message);
      }else{
        req.email = decoded.email;
        console.log(decoded);
        next();
      }
    });
  }
  else{
    renewToken(req,res, () => {
      next();
    })
  }
  // if (!accesstoken) {
  //   // if (renewToken(req, res)) {
  //   //   next();
  //   // }
  //   console.log("accesstoken not working");
  //   res.json({message: "something wrong"});
  //   next();
  // } else {
  //   jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
  //     if (err) {
        
  //       return res.redirect('/login');
  //     } else {
  //       console.log("DECODED EMAIL", decoded.email);
  //       req.email = decoded.email;
  //       //res.status(200).json({success:true});
  //       next();
  //     }
  //   });
  // }
};

export {verifyJWT}