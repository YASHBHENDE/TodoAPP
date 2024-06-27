import express from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../db/index';
import { UserValidation } from './validation';
const router = express.Router();
import {SEcREAT} from '../config'

interface SignupInput{
    username:string,
    password:string,
    email:string
}

router.post('/', async (req, res) => {
    const { username, password,email }:SignupInput = req.body;
    
    const output = UserValidation.safeParse({username,password,email})
    
    if(!output.success){
        const message = output.error
        res.send({"msg":message})
    }else{
        let userByEmail = await User.findOne({ email });

        let userByUsername = await User.findOne({ username });
       
        if (userByUsername) {
            res.status(200).send({ "UserNameExists": "username  exists please choose another username " });
        } else if(userByEmail) {
            res.status(200).send({ "UserExists": "Email already exists.Please 'signin' " });
        }
        else {
            let newUser = await User.create({ 'username': username, 'password': password,'email':email });
            await newUser.save();
    
            let token = jwt.sign({ 'username': newUser.id }, SEcREAT);
            res.status(200).send({ "msg": "new user added successfully", "token": token });
        }
    }
   
});

export default router;
