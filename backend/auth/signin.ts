import express from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../db/index';

const router = express.Router();
import {SEcREAT} from '../config'
import { SigninValidation } from './validation';


interface SigninINput{
    email:string,
    password:string
}

router.post('/', async (req, res) => {
    const { email, password }:SigninINput = req.body;
    
    const output = SigninValidation.safeParse({email,password})
    
    if(!output.success){
        res.send({"error":output.error})
    }else{
        let userexists = await User.findOne({ 'email': email, 'password': password });

        
        if (userexists) {
            let token = jwt.sign({ 'username': userexists._id }, SEcREAT);
            res.send({ "msg": "logged in successfully", "token": token });
        } else {
            res.status(403).send({ "msg": "Invalid Credentials " });
        }
    }

    
});

export default router;

