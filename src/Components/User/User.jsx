import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'


const User = () => {
  var[inputs, setInputs]= useState({
    "Uid":'',
    "Name":'',
    "Email":'',
    "Address":'',
    "Phone":'',
    "Rollno":'',
    "College":'',

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
  formdata.append('Email',inputs.Email);
  formdata.append('Address',inputs.Address);
  formdata.append('Phone',inputs.Phone);
  formdata.append('Rollno',inputs.Rollno);
  formdata.append('College',inputs.College);
  formdata.append('image1',selectedImage);

  fetch("http://localhost:3005/newuser",{
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
      <h3>USER ADD</h3> <br /> 
      <TextField id="outlined-basic" label="Uid" name='Uid' type="number" variant="outlined" value={inputs.Uid} onChange={inputHandler}  /> <br /> <br /> 
      <TextField id="outlined-basic" label="Name" name='Name' variant="outlined" value={inputs.Name} onChange={inputHandler} /> <br /> <br /> 
      <TextField id="outlined-basic" label="Phone" name='Phone' type="number" variant="outlined"  value={inputs.Phone} onChange={inputHandler} /> <br /> <br />  
        <TextField id="outlined-basic" label="Email" name='Email' type="email" variant="outlined" value={inputs.Email} onChange={inputHandler} /> <br /> <br /> 
        <TextField id="outlined-basic" label="Rollno" name='Rollno' variant="outlined" value={inputs.Rollno} onChange={inputHandler} /> <br /> <br /> 
        <TextField id="outlined-basic" label="College" name='College' variant="outlined" value={inputs.College} onChange={inputHandler} /> <br /> <br /> 
        <TextField
          id="outlined-multiline-static"
          label="Address"
          name='Address'
          multiline
          rows={4}
          value={inputs.Address} onChange={inputHandler} /> <br /> <br /> 
        <label htmlFor="">Choose ID card image to upload</label>
        <input type="file" name="Image1" id="" onChange={handleImage} /> <br /><br />
        <Button variant="contained"onClick={saveData}>Submit</Button>
        
    </div>
  )
}

export default User