import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'


const Books = () => {
  var[inputs, setInputs]= useState({
    "Uid":'',
    "Name":'',
    "Description":'',
    "Link":'',
  });

  var[selectedImage,setSelectedImage]=useState(null);
    const inputHandler = (event) => {
        const { name, value } = event.target
        setInputs((inputs) => ({ ...inputs, [name]: value }))
        console.log(inputs)
    }

const handleImage=(event)=>{
    const file =event.target.files[0];
    setSelectedImage(file);
    inputs.image1=file;
}

const saveData=()=>{
  const formdata=new FormData();
  formdata.append('Uid',inputs.Uid);
  formdata.append('Name',inputs.Name);
  formdata.append('Description',inputs.Description);
  formdata.append('Link',inputs.Link);
  formdata.append('image1',selectedImage);

  fetch("http://localhost:3005/newbook",{
      method:'post',
      body:formdata,
  })
  .then((response)=>response.json())
  .then((data)=>{
      alert("record saved")
  })
  .catch((err)=>{
      console.log("error")
  })
}



  return (
    <div>
      <h3>Book ADD</h3> <br /> 
      <TextField id="outlined-basic" label="Uid" name='Uid' type="number" variant="outlined" value={inputs.Uid} onChange={inputHandler}  /> <br /> <br /> 
      <TextField id="outlined-basic" label="Name" name='Name' variant="outlined" value={inputs.Name} onChange={inputHandler} /> <br /> <br /> 
      <TextField
          id="outlined-multiline-static"
          label="Description"
          name='Description'
          multiline
          rows={4}
          value={inputs.Description} onChange={inputHandler} /> <br /> <br /> 
        <TextField id="outlined-basic" label="Link" name='Link' variant="outlined" value={inputs.Link} onChange={inputHandler} /> <br /> <br /> 
        <label htmlFor="">Choose image to upload</label>
        <input type="file" name="Image1" id="" onChange={handleImage} /> <br /><br />
        <Button variant="contained"onClick={saveData}>Submit</Button>
        
    </div>
  )
}

export default Books