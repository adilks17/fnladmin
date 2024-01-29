import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Cedit from './Cedit';
import { Buffer } from 'buffer';
import { Link } from 'react-router-dom';

const Collegedetails = () => {
    var [selected,setSelected]=useState();
    var[update,setUpdate]=useState(false);
    var [student, setCollege] = useState([]);

   useEffect(()=>{
    axios.get("http://localhost:3005/view")
    .then((response) => {
              setCollege(response.data)
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
             <Button component={Link} to="/addcollege" variant="contained" color="primary">
      Add New
    </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Pid</TableCell>
                            <TableCell >Name</TableCell>
                            <TableCell >University</TableCell>
                            <TableCell >Address</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>AffiliationNumber</TableCell>
                            <TableCell >image</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {student.map((row,pos) => {
                            return (
                            
                                <TableRow key={pos} >
                                    <TableCell >{row.Pid}</TableCell>
                                    <TableCell >{row.Name}</TableCell>
                                    <TableCell>{row.University}</TableCell>
                                    <TableCell >{row.Address}</TableCell>
                                    <TableCell >{row.Phone}</TableCell>
                                    <TableCell >{row.Email}</TableCell>
                                    <TableCell >{row.AffiliationNumber}</TableCell>
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
            result=<Cedit data={selected} method='put'/>
            
        }
        return(result)
}

export default Collegedetails