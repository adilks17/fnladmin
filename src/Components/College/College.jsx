import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'


const College = () => {
  var[inputs, setInputs]= useState({
    "Cid":'',
    "Name":'',
    "University":'',
    "Address":'',
    "Phone":'',
    "Email":'',
    "AffiliationNumber":''
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
  formdata.append('Cid',inputs.Cid);
  formdata.append('Name',inputs.Name);
  formdata.append('University',inputs.University);
  formdata.append('Address',inputs.Address);
  formdata.append('Phone',inputs.Phone);
  formdata.append('Email',inputs.Email);
  formdata.append('AffiliationNumber',inputs.AffiliationNumber);
  formdata.append('image1',selectedImage);

  fetch("http://localhost:3005/new",{
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
      <h3>COLLEGE ADD</h3> <br /> 
      <TextField id="outlined-basic" label="Cid" name='Cid' type="number" variant="outlined" value={inputs.Cid} onChange={inputHandler}  /> <br /> <br /> 
      <TextField id="outlined-basic" label="Name" name='Name' variant="outlined" value={inputs.Name} onChange={inputHandler} /> <br /> <br /> 
      <TextField id="outlined-basic" label="University" name='University' variant="outlined" value={inputs.University} onChange={inputHandler} /> <br /> <br /> 
      <TextField
          id="outlined-multiline-static"
          label="Address"
          name='Address'
          multiline
          rows={4}
          value={inputs.Address} onChange={inputHandler} /> <br /> <br /> 
        <TextField id="outlined-basic" label="Phone" name='Phone' type="number" variant="outlined"  value={inputs.Phone} onChange={inputHandler} /> <br /> <br /> 
        <TextField id="outlined-basic" label="Email" name='Email' type="email" variant="outlined" value={inputs.Email} onChange={inputHandler} /> <br /> <br /> 
        <TextField id="outlined-basic" label="AffiliationNumber" name='AffiliationNumber' variant="outlined" value={inputs.AffiliationNumber} onChange={inputHandler} /> <br /> <br /> 
        <label htmlFor="">Choose image to upload</label>
        <input type="file" name="Image1" id="" onChange={handleImage} /> <br /><br />
        <Button variant="contained"onClick={saveData}>Submit</Button>
        
    </div>
  )
}

export default College