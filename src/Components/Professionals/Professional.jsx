import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'


const Professional = () => {
  var[inputs,setInputs]=useState({
    "Pid":'',
    "Name":'',
    "Workinfo":'',
    "Experience":'',
    "Contact":'',
    "Email":'',
    'District':'',
    'State':'',
    'Linkedin':''
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
  formdata.append('Pid',inputs.Pid);
  formdata.append('Name',inputs.Name);
  formdata.append('Workinfo',inputs.Workinfo);
  formdata.append('Experience',inputs.Experience);
  formdata.append('Contact',inputs.Contact);
  formdata.append('Email',inputs.Email);
  formdata.append('District',inputs.District);
  formdata.append('State',inputs.State);
  formdata.append('Linkedin',inputs.Linkedin);
  formdata.append('image1',selectedImage);

  fetch("http://localhost:3005/newProfessional",{
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
      <h3>Professional Add</h3>
      <TextField id="outlined-basic" label="Pid" variant="outlined" name='Pid' value={inputs.Pid} onChange={inputHandler} /><br></br><br></br>
      <TextField id="outlined-basic" label="Name" variant="outlined" name='Name' value={inputs.Name} onChange={inputHandler} /><br></br><br></br>
      <TextField id="outlined-basic" label="Workinfo" variant="outlined" name='Workinfo' value={inputs.Workinfo} onChange={inputHandler} /><br></br><br></br>
      <TextField id="outlined-basic" label="Experience" variant="outlined" name='Experience' value={inputs.Experience} onChange={inputHandler} /><br></br><br></br>
      <TextField id="outlined-basic" label="Contact" variant="outlined" name='Contact' value={inputs.Contact} onChange={inputHandler} /><br></br><br></br>
      <TextField id="outlined-basic" label="Email" variant="outlined" name='Email' value={inputs.Email} onChange={inputHandler} /><br></br><br></br>
      <TextField id="outlined-basic" label="District" variant="outlined" name='District' value={inputs.District} onChange={inputHandler} /><br></br><br></br>
      <TextField id="outlined-basic" label="State" variant="outlined" name='State' value={inputs.State} onChange={inputHandler} /><br></br><br></br>
      <TextField id="outlined-basic" label="Linkedin" variant="outlined" name='Linkedin' value={inputs.Linkedin} onChange={inputHandler} /><br></br><br></br>
      <label htmlFor="">Choose file to upload</label>
        <input type="file" name="image1" id=""  onChange={handleImage}/> <br /><br />
        <Button variant="contained"onClick={saveData}>Submit</Button>
        

    </div>
  )
}

export default Professional
