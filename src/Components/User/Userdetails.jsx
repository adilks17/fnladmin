import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { Buffer } from 'buffer';
import { Link } from 'react-router-dom';

const Userdetails = () => {
    var [selected,setSelected]=useState();
    var[update,setUpdate]=useState(false);
    var [User, setUser] = useState([]);

   useEffect(()=>{
    axios.get("http://localhost:3005/viewuser")
    .then((response) => {
              setUser(response.data)
               console.log(response.data)
        
    })
    .catch(err => console.log(err))
   },[])

   const updateValues=(row)=>{
    setSelected(row);
    setUpdate(true)
   }
   
      var result=
        <div>
            <br /> 
             <Button component={Link} to="/adduser" variant="contained" color="primary">
      Add New
    </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Uid</TableCell>
                            <TableCell >Name</TableCell>
                            <TableCell >Phone</TableCell>
                            <TableCell >Email</TableCell>
                            <TableCell>Rollno</TableCell>
                            <TableCell>College</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell >image</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {User.map((row,pos) => {
                            return (
                            
                                <TableRow key={pos} >
                                    <TableCell >{row.Uid}</TableCell>
                                    <TableCell >{row.Name}</TableCell>
                                    <TableCell>{row.Phone}</TableCell>
                                    <TableCell >{row.Email}</TableCell>
                                    <TableCell >{row.Rollno}</TableCell>
                                    <TableCell >{row.College}</TableCell>
                                    <TableCell >{row.Address}</TableCell>
                                    <TableCell>
                                        <img src={`data:image/jpeg;base64,${Buffer.from(row.image1.data).toString('base64')}`} width="50" height="50" alt='Error' />   
                                    </TableCell>
                                    <TableCell><EditIcon onClick={()=>updateValues(row)}/></TableCell>
                                </TableRow>
                            
                                
                                
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        if(update){
            result=1
            
        }
        return(result)
}

export default Userdetails