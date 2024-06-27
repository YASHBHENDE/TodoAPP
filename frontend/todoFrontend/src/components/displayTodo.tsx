/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from "axios";
import { TodoType } from "./homepage";
import voice1 from '../assets/respect-brother-101soundboards.mp3';
import voice2 from '../assets/stay-hard-101soundboards.mp3';
import {Card as MuiCard,} from "@mui/material";
interface Props {
    todos: TodoType[],
    settodos: React.Dispatch<React.SetStateAction<TodoType[]>>,
    setTaskCompleted: React.Dispatch<React.SetStateAction<number>>
}

const DisplayTodo: React.FC<Props> = ({ todos, settodos, setTaskCompleted }) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            {todos.length > 0 && todos.map((todo: TodoType) => (
                <Todo key={todo._id} todo={todo} settodos={settodos} setTaskCompleted={setTaskCompleted} />
            ))}
        </Box>
    );
}

interface Prop2 {
    todo: TodoType,
    settodos: React.Dispatch<React.SetStateAction<TodoType[]>>,
    setTaskCompleted: React.Dispatch<React.SetStateAction<number>>
}

const Todo: React.FC<Prop2> = ({ todo, settodos, setTaskCompleted }) => {
    const [changedTitle, setChangedTitle] = useState(todo.title);
    const [changedDescription, setChangedDescription] = useState(todo.description);

    function speech() {
        const songs = [voice1, voice2];
        const index = Math.floor(Math.random() * 2);
        const song = new Audio(songs[index]);
        song.play();
    }

    return (
        <MuiCard sx={{ maxWidth: 400, margin: '50px auto', padding: 2, boxShadow: 3 }}>
            <TextField
                fullWidth
                label="Title"
                variant="outlined"
                onChange={(e) => setChangedTitle(e.target.value)}
                value={changedTitle}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Description"
                variant="outlined"
                onChange={(e) => setChangedDescription(e.target.value)}
                value={changedDescription}
                margin="normal"
            />
            <Box mt={2} display="flex" justifyContent="space-between" width="100%">
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={async () => {
                        const response = await axios.delete(`http://localhost:3000/delete/todos/${todo._id}`, {
                            headers: {
                                Authorization: localStorage.getItem('token')
                            }
                        });
                       
                        settodos((prevtodos: TodoType[]) => prevtodos.filter((single_todo: TodoType) => single_todo._id !== todo._id));
                    }}
                >
                    DELETE
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={async () => {
                        speech();
                        const response = await axios.put(`http://localhost:3000/update/todos/${todo._id}`, {
                            'completed': true,
                        }, {
                            headers: {
                                Authorization: localStorage.getItem('token')
                            }
                        });
                        settodos((prevtodos: TodoType[]) => prevtodos.filter((single_todo: TodoType) => single_todo._id !== todo._id));
                        setTaskCompleted(response.data.userData.CompletedTasks);
                    }}
                >
                    Completed!
                </Button>
                <Button 
                    variant="contained" 
                   
                    onClick={async () => {
                        const response = await axios.put(`http://localhost:3000/update/todos/${todo._id}`, {
                            'changed_title': changedTitle,
                            'changed_description': changedDescription,
                        }, {
                            headers: {
                                Authorization: localStorage.getItem('token')
                            }
                        });
                       
                        settodos((prevtodos: TodoType[]) => prevtodos.map((single_todo: TodoType) => {
                            if (single_todo._id === todo._id) {
                                return {
                                    ...single_todo,
                                    title: changedTitle,
                                    description: changedDescription,
                                };
                            }
                            return single_todo;
                        }));
                    }}
                >
                    Update
                </Button>
            </Box>
        </MuiCard>
    );
}

export default DisplayTodo;
