import React, { useState} from 'react';
import { TextField } from '@mui/material';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';

const Professionaledit = (props) => {
  const navigate = useNavigate();
    var[inputs,setInputs]=useState(props.data)
    const [selectedImage, setSelectedImage] = useState(null);
          const handleInputChange = (e) => {
            const { name, value } = e.target;
            setInputs({ ...inputs, [name]: value });
          };

          const handleImageChange = (e) => {
            const imageFile = e.target.files[0];
            setSelectedImage(imageFile);
          };
          const handleSubmit = async (e) => {
            e.preventDefault();

            const formdata = new FormData();
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
      
        fetch(`http://localhost:3005/editprofessional/${inputs._id}`,
            { method: 'put', body: formdata, })
            .then((response) => response.json())
            .then((data) => {
                alert("record saved")
            })
            .catch((err) => {
                console.log("error", err)
            })

        navigate('/professional')

    }
 return (
    <form onSubmit={handleSubmit}>
    <TextField id="outlined-basic" label="Pid" variant="outlined" name='Pid' value={inputs.Pid} onChange={handleInputChange} /><br></br><br></br>
      <TextField id="outlined-basic" label="Name" variant="outlined" name='Name' value={inputs.Name} onChange={handleInputChange} /><br></br><br></br>
      <TextField id="outlined-basic" label="Workinfo" variant="outlined" name='Workinfo' value={inputs.Workinfo} onChange={handleInputChange} /><br></br><br></br>
      <TextField id="outlined-basic" label="Experience" variant="outlined" name='Experience' value={inputs.Experience} onChange={handleInputChange} /><br></br><br></br>
      <TextField id="outlined-basic" label="Contact" variant="outlined" name='Contact' value={inputs.Contact} onChange={handleInputChange} /><br></br><br></br>
      <TextField id="outlined-basic" label="Email" variant="outlined" name='Email' value={inputs.Email} onChange={handleInputChange} /><br></br><br></br>
      <TextField id="outlined-basic" label="District" variant="outlined" name='District' value={inputs.District} onChange={handleInputChange} /><br></br><br></br>
      <TextField id="outlined-basic" label="State" variant="outlined" name='State' value={inputs.State} onChange={handleInputChange} /><br></br><br></br>
      <TextField id="outlined-basic" label="Linkedin" variant="outlined" name='Linkedin' value={inputs.Linkedin} onChange={handleInputChange} /><br></br><br></br>
      {/* Other form fields */}
   <input type="file" name='image1' accept="image/*" onChange={handleImageChange} />
   <img src={`data:image/jpeg;base64,${Buffer.from(inputs.image1.data).toString('base64')}`} width="50" height="50" alt='Error' />   
 <br /><br />
 <button type="submit">Update</button>
</form>
    
  )
}
export default Professionaledit