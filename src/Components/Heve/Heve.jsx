//component to to view heve or raises for proffessional
import { Button, Card, CardActions, CardContent,  Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Heveedit from './Heveedit';

const Heve = () => {
    var [heve,setHeve]= useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3005/viewheve")
        .then(response =>{
            setHeve(response.data)
        })
        .catch(err=>console.log(err))
    },[])
    var [selected,setSelected]=useState();
    var [update,setUpdate]=useState(false);

    const updateValues = (value) =>{
      console.log("updated:",value)
      setSelected(value);
      setUpdate(true);
    }

    var result = <div>

    {heve.map((value,index)=>{
                    return(
                  
                      <Card sx={{ minWidth: 500 }} key={index}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Heve
                        </Typography>
                        <Typography variant="h5" component="div">
                          {value.Leve}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          Responses
                        </Typography>
                        <Typography variant="body2">
                         {value.Response}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={()=>updateValues(value)}>Reply</Button>
                      </CardActions>
                     
                    </Card>

                    
                    
                    )
                })}


    </div>



   if (update) {
    result=<Heveedit data={selected} method='put'/>
   }
  return (result)
}

export default Heve