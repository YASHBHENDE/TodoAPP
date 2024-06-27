import express from "express";
import { User } from "../db";
import userAuthentication from "../auth/middleware";
const router = express.Router()



router.get('/',async (req,res)=>{
    let TOPFIVE_USRES = []
    
    const users = await User.find({}).sort({CompletedTasks:-1})
     
    for(let i=0;i<5;i++){
        if(users[i]!= null){
            TOPFIVE_USRES.push(users[i])
        }
       
    }
    
    
    res.send(TOPFIVE_USRES)
    
   

})


export default router