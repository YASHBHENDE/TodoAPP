var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const router = express.Router();
const Todo = require('../db/index');
const userAuthentication = require('../auth/middleware');
router.put('/todos/:id', userAuthentication, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    const changed_title = req.body.changed_title;
    const changed_completed = req.body.completed;
    const changed_description = req.body.changed_description;
    let todo = yield Todo.findByIdAndUpdate(id, {
        'title': changed_title,
        'description': changed_description,
        'completed': changed_completed
    });
    if (!todo) {
        res.send({ "msg": "not updated , fuck of!" });
    }
    if (changed_completed == true) {
        const user = req.user.username;
        console.log(user);
        yield User.findByIdAndUpdate(user, { $inc: { CompletedTasks: 1 } });
        yield Todo.findByIdAndDelete(id);
    }
    res.status(200).send({ "msg": "updated successfullly" });
}));
module.exports = router;
