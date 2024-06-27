
import mongoose from 'mongoose';
import { MONGODB_URL } from '../config';
mongoose.connect(MONGODB_URL);

const userSchema = new mongoose.Schema({
    'email':String,
    'username': String,
    'password': String,
    'todo': [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
    'CompletedTasks': Number
});

const todoSchema = new mongoose.Schema({
    'title': String,
    'description': String,
    'completed': { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);
const Todo = mongoose.model('Todo', todoSchema);

export { User, Todo };
