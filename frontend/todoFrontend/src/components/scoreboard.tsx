import { CompletedTasks} from "../store/index"
import { useRecoilValue } from "recoil"
import { useEffect, useState } from "react"
import axios from "axios"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface AchieversType {
    username:string,
    CompletedTasks:number | undefined
}

export default function ScoreBoard(){
    const CompletedTask:number = useRecoilValue(CompletedTasks)
    const [TopFiveAchievers,setAchienvers] = useState<AchieversType[]>([])
    
    async function TopFiveAchiever(){
        const response = await axios.get('http://localhost:3000/score',{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        })
        
        setAchienvers(response.data)
      
    }
    useEffect(()=>{
        TopFiveAchiever()
    },[])
    if(localStorage.getItem('token')){
        return<>
        <center style={{marginTop:'3vh'}}><h3>Your score:{CompletedTask}</h3> <br /></center>

        
        <center>
        <TableContainer component={Paper} style={{marginTop:'30vh',width: '59%'}}>
            <center><TableHead>Top Goal achievers</TableHead></center>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                
                <TableHead>
                    <TableRow>
                        <TableCell>username</TableCell>
                        <TableCell align="right">Completedtasks</TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                {TopFiveAchievers.map((row) => (
                    <TableRow
                    key={row.username}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.username}
                    </TableCell>
                    <TableCell align="right">{row.CompletedTasks}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
             </Table>
         </TableContainer>
         </center>
        
        </>
    }else{
        return<>
        <center style={{marginTop:'3vh'}}>Signup to compete<br /></center>

        
        <center>
        <TableContainer component={Paper} style={{marginTop:'30vh',width: '59%'}}>
            <center><TableHead>Top Goal achievers</TableHead></center>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                
                <TableHead>
                    <TableRow>
                        <TableCell>username</TableCell>
                        <TableCell align="right">Completedtasks</TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                {TopFiveAchievers.map((row) => (
                    <TableRow
                    key={row.username}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.username}
                    </TableCell>
                    <TableCell align="right">{(row.CompletedTasks == undefined)?0:row.CompletedTasks}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
             </Table>
         </TableContainer>
         </center>
        
        </>
    }
    
}