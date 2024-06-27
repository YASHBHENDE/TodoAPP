import express from 'express';
import { User, Todo } from '../db/index';
import userAuthentication from '../auth/middleware';
import { TodoValidation } from '../auth/validation';
const router = express.Router();

interface TodoType {
    title:string,
    description:string,
    completed:boolean
}

router.post('/', userAuthentication, async (req, res) => {
   
    
    const {title,completed,description}:TodoType = req.body

    const output =  TodoValidation.safeParse({title,completed,description})

    if(!output.success){
        res.send({"msg":output.error})
    }

    let todo = await Todo.create({ title, description, completed });
    await todo.save();

    let user_data = await User.findOne({ '_id': req.headers["userID"] });
   
    if(user_data){
        user_data.todo.push(todo._id);
        await user_data.save(); 
        res.status(201).send({ "id": todo.id });
    }
    
});

export default router;
