import { Button, Select, TextField,MenuItem, InputLabel, FormControl } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'


const User = () => {
  var [college, setCollege] = useState([]);
  var[inputs, setInputs]= useState({
    "userId":'',
    "Name":'',
    "Email":'',
    "Address":'',
    "Phone":'',
    "Rollno":'',
    "College":'',
    "Username":'',
    "Password":'',

  });
  useEffect(()=>{
    axios.get("http://localhost:3005/view")
    .then((response) => {
              setCollege(response.data)
               console.log(response.data)
        
    })
    .catch(err => console.log(err))
   },[])

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
  formdata.append('userId',inputs.userId);
  formdata.append('Name',inputs.Name);
  formdata.append('Email',inputs.Email);
  formdata.append('Address',inputs.Address);
  formdata.append('Phone',inputs.Phone);
  formdata.append('Rollno',inputs.Rollno);
  formdata.append('College',inputs.College);
  formdata.append('Username',inputs.Username);
  formdata.append('Password',inputs.Password);
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
      <TextField id="outlined-basic" label="userId" name='userId' type="number" variant="outlined" value={inputs.userId} onChange={inputHandler}  /> <br /> <br /> 
      <TextField id="outlined-basic" label="Name" name='Name' variant="outlined" value={inputs.Name} onChange={inputHandler} /> <br /> <br /> 
      <TextField id="outlined-basic" label="Phone" name='Phone' type="number" variant="outlined"  value={inputs.Phone} onChange={inputHandler} /> <br /> <br />  
        <TextField id="outlined-basic" label="Email" name='Email' type="email" variant="outlined" value={inputs.Email} onChange={inputHandler} /> <br /> <br /> 
        <TextField id="outlined-basic" label="Rollno" name='Rollno' variant="outlined" value={inputs.Rollno} onChange={inputHandler} /> <br /> <br /> 
  <FormControl sx={{ width: 300 }}>
        <InputLabel id="college-select">Age</InputLabel>
        <Select
  labelId="college-select"
  label="College"
  name='College'
  value={inputs.College}
  onChange={inputHandler}
>
  {college.map((value, index) => (
    <MenuItem key={index} value={value.Name}>
      {value.Name}
    </MenuItem>
  ))}
</Select>

      </FormControl> 
       <br />
       <br />
       
        <TextField
          id="outlined-multiline-static"
          label="Address"
          name='Address'
          multiline
          rows={4}
          value={inputs.Address} onChange={inputHandler} /> <br /> <br /> 
           <TextField id="outlined-basic" label="Username" name='Username' variant="outlined" value={inputs.Username} onChange={inputHandler} /> <br /> <br />
           <TextField id="outlined-basic" label="Password" name='Password'type='password' variant="outlined" value={inputs.Password} onChange={inputHandler} /> <br /> <br />
        <label htmlFor="">Choose ID card image to upload</label>
        <input type="file" name="Image1" id="" onChange={handleImage} /> <br /><br />
        <Button variant="contained"onClick={saveData}>Submit</Button>
        
    </div>
  )
}

export default User