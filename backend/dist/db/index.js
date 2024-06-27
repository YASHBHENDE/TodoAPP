const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://yashabhaybhende:yDNiVSuVfrjyeMXY@cluster0.g6nsvuo.mongodb.net/learn2');
const userSchema = new mongoose.Schema({
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
module.exports = {
    User,
    Todo
};
