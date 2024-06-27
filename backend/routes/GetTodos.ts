import express from 'express';
import { User, Todo } from '../db/index';
import userAuthentication from '../auth/middleware';

const router = express.Router();

router.get('/', userAuthentication, async (req, res) => {
    let user_data = await User.findOne({ '_id':req.headers["userID"] });

    

    // Find the todos from Todo model where ids are present in user_todo
        if(user_data){
            let user_todo = user_data.todo;
            let todos = await Todo.find({ '_id': { $in: user_todo } });

            if (todos.length > 0) {
                res.status(200).send({"todos":todos});
            } else {
                res.send({ "msg": "no todos" ,"todos":[] });
            }
        }
});

export default router;
