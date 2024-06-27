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
router.get('/', userAuthentication, (req, res) => __awaiter(this, void 0, void 0, function* () {
    let user_data = yield User.findOne({ '_id': req.user.username });
    let user_todo = user_data.todo;
    //TODO: find the todos from todos model. where todos is mentioned in user_todo variable which contains ids of todos which are present in todos model
    let todos = yield Todo.find({ '_id': { $in: user_todo } });
    if (todos.length > 0) {
        res.status(200).send(todos);
    }
    else {
        res.send({ "msg": "no todos" });
    }
}));
module.exports = router;
