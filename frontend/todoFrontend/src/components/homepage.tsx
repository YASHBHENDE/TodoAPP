import { useEffect, useState } from "react"
import axios from 'axios'
import Card from "./card"
import DisplayTodo from "./displayTodo"
import { CompletedTasks } from "../store"
import { useSetRecoilState } from "recoil"

export interface TodoType {
    _id:string,
    title:string,
    description:string,
    completed:boolean
}

const useTodos = ()=>{
    const [todos,settodos]= useState<TodoType[]>([])
    
    async function gettodos(){
        const response = await axios.get('http://localhost:3000/todo',{
            headers:{
                Authorization: localStorage.getItem('token')
            }
        })
      
        settodos(response.data.todos)
    }
    
    useEffect(()=>{
        gettodos()
    },[]) 
    return {todos,settodos}
    
}
export default function Homepage(){
   const {todos,settodos} = useTodos() 
    
    
    const setTaskCompleted = useSetRecoilState(CompletedTasks)
    if(todos.length > 0){
        return <>
           
            <Card settodos = {settodos}/>
            <DisplayTodo todos={todos} settodos={settodos}  setTaskCompleted={setTaskCompleted}/>
           
        </>
    
    }else{
        return <>

            <center style={{marginTop:'3vh'}}><h1>Dont Be Weak. plan your day now!!</h1></center>
             
            <Card settodos = {settodos}/>
            
        </>
    }    
    
}
