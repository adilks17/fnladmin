import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Buffer } from 'buffer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Professionaledit from './Professionaledit';

const Professionaldetails = () => {
    var [selected,setSelected]=useState();
    var[update,setUpdate]=useState(false);
    var [professional, setProffessional] = useState([]);

   useEffect(()=>{
    axios.get("http://localhost:3005/viewProfessional")
    .then((response) => {
              setProffessional(response.data)
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
             <Button component={Link} to="/addprofessional" variant="contained" color="primary">
             Add New
    </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Pid</TableCell>
                            <TableCell >Name</TableCell>
                            <TableCell >Workinfo</TableCell>
                            <TableCell >Experience</TableCell>
                            <TableCell >Contact</TableCell>
                            <TableCell >Email</TableCell>
                            <TableCell>District</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell>Linkedin</TableCell>
                            <TableCell >image</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {professional.map((row,pos) => {
                            return (
                            
                                <TableRow key={pos} >
                                    <TableCell >{row.Pid}</TableCell>
                                    <TableCell >{row.Name}</TableCell>
                                    <TableCell>{row.Workinfo}</TableCell>
                                    <TableCell >{row.Experience}</TableCell>
                                    <TableCell >{row.Contact}</TableCell>
                                    <TableCell >{row.Email}</TableCell>
                                    <TableCell>{row.District}</TableCell>
                                     <TableCell>{row.State}</TableCell>
                                     <TableCell>{row.Linkedin}</TableCell>
                                    <TableCell><img src={`data:image/jpeg;base64,${Buffer.from(row.image1.data).toString('base64')}`} width="50" height="50" alt="error" /></TableCell>
                                    <TableCell><EditIcon onClick={()=>updateValues(row)}/></TableCell>
                                </TableRow>
                            
                                
                                
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        if(update){
            result=<Professionaledit data={selected} method='put'  />
            
        }
        return(result)
  
}

export default Professionaldetails
