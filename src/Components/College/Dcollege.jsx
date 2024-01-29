
import { Select ,MenuItem} from '@mui/material';
import axios from 'axios';

import React, { useEffect, useState } from 'react'

const Dcollege = () => {
  var [college, setCollege] = useState([]);

  useEffect(()=>{
   axios.get("http://localhost:3005/view")
   .then((response) => {
             setCollege(response.data)
              console.log(response.data)
       
   })
   .catch(err => console.log(err))
  },[])
  return (
 <Select>
    {college.map((value,index)=>{
      return(
        <MenuItem key={index}>{value.Name}</MenuItem>
      )
    })}
 
 </Select>
  )
}

export default Dcollege
