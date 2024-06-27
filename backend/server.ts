import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import signinRouter from './auth/signin';
import signupRouter from './auth/signup';
import createTodoRouter from './routes/createTodo';
import getTodosRouter from './routes/GetTodos';
import updateTodoRouter from './routes/updateTodo';
import deleteTodoRouter from './routes/deleteTodo';
import userAuthentication from './auth/middleware';
import score from './routes/score'
import { User } from './db';
const port = 3000;

const app = express();






app.use(bodyParser.json());
app.use(cors());

app.use('/sign-up', signupRouter);
app.use('/sign-in', signinRouter);
app.use('/todos', createTodoRouter);
app.use('/todo', getTodosRouter);
app.use('/update', updateTodoRouter);
app.use('/delete', deleteTodoRouter);
app.use('/score',score)


app.get('/me', userAuthentication, async (req, res) => {
    
    const username = await User.findById(req.headers["userID"])
    
    res.send(username)
});





app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

