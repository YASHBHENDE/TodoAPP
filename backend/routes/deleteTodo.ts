import express from 'express';
import { Todo } from '../db/index';
import userAuthentication from '../auth/middleware';

const router = express.Router();

router.delete('/todos/:id', userAuthentication, async (req, res) => {
    const id = req.params.id;   
   
    let deletes = await Todo.findByIdAndDelete(id);

    if (!deletes) {
        res.send({ "msg": "not deleted" });
    } else {
        res.status(200).send({ "msg": "deleted successfully" });
    }
});

export default router;
