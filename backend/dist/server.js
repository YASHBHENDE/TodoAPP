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
const bodyParser = require('body-parser');
const port = 3000;
const app = express();
const signin = require('./auth/signin');
const signup = require('./auth/signup');
const createTodo = require('./routes/createTodo');
const getTodos = require('./routes/GetTodos');
const updateTodo = require('./routes/updateTodo');
const deleteTodo = require('./routes/deleteTodo');
const userAuthentication = require('./auth/middleware');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
app.use('/sign-up', signup);
app.use('/sign-in', signin);
app.use('/todos', createTodo);
app.use('/todo', getTodos);
app.use('/update', updateTodo);
app.use('/delete', deleteTodo);
app.get('/me', userAuthentication, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const username = yield User.findById(req.user.username);
    res.send(username);
}));
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
