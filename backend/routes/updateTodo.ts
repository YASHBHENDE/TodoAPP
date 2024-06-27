import express from 'express';
import { Todo, User } from '../db/index';
import userAuthentication from '../auth/middleware';

const router = express.Router();

router.put('/todos/:id', userAuthentication, async (req, res) => {
    const id = req.params.id;
    const changed_title = req.body.changed_title;
    const changed_completed = req.body.completed;
    const changed_description = req.body.changed_description;
    
    let todo = await Todo.findByIdAndUpdate(id,
        {
            'title': changed_title,
            'description': changed_description,
            'completed': changed_completed
        }
    );
    
    if (!todo) {
        res.send({ "msg": "not updated, fuck off!" });
        return;
    }

    if (changed_completed === true) {
        const user = req.headers["userID"];
       
        await User.findByIdAndUpdate(user, { $inc: { CompletedTasks: 1 } });
        await Todo.findByIdAndDelete(id);
    }

    res.status(200).send({ "msg": "updated successfully","userData": await User.findById(req.headers["userID"]) });
});

export default router;
