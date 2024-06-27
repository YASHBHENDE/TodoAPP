import axios from "axios";
import React, { useState } from "react";
import {
    Card as MuiCard,
    CardContent,
    CardActions,
    TextField,
    Button,
    Typography
} from "@mui/material";
import { TodoType } from "./homepage";


interface Prop2 {
    
    settodos: React.Dispatch<React.SetStateAction<TodoType[]>>
}
const Card:React.FC<Prop2> = ({settodos})=> {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState<string>('');

    const handleAddClick = async () => {

        if(title === "" && description == ""){
            alert("title and description cannnot be empty")
        }else{
            const response = await axios.post('http://localhost:3000/todos', {
                title,
                description,
                completed: false
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
           
            settodos((prevtodos:TodoType[])=>{
               
                return [...prevtodos,{title,description,completed:false,_id:response.data.id}]
            })
        }
        
    };

    return (
        <MuiCard sx={{ maxWidth: 400, margin: '50px auto', padding: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    New Mission!
                </Typography>
                <TextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </CardContent>
            <CardActions>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleAddClick}
                >
                    ADD
                </Button>
            </CardActions>
        </MuiCard>
    );
}
export default Card