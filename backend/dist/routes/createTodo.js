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
const User = require('../db/index');
const Todo = require('../db/index');
const userAuthentication = require('../auth/middleware');
router.post('/', userAuthentication, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const title = req.body.title;
    const completed = req.body.completed;
    const description = req.body.description;
    let todo = yield Todo.create({ title, description, completed });
    todo.save();
    let user_data = yield User.findOne({ '_id': req.user.username });
    console.log(user_data);
    user_data.todo.push(todo._id);
    yield user_data.save();
    res.status(201).send({ "id": todo.id });
}));
module.exports = router;
