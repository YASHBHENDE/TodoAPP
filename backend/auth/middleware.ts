import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken';
import {SEcREAT} from '../config'
function userAuthentication(req:Request,res:Response,next:NextFunction){
    const authheader = req.headers.authorization

    if(authheader){ 
        let token = authheader.split(' ')[1]
       
        jwt.verify(token,SEcREAT,(err,decoded)=>{
              if (err) {
                return res.sendStatus(403);
              }
              if(!decoded){
                return res.sendStatus(403);
              }
              if(typeof decoded === 'string'){
                return res.sendStatus(403);
              }
            
              
              req.headers["userID"] = decoded.username
              
              next()
        })
    }
   
}

export default userAuthentication;