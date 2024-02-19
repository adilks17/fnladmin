import React, { useState} from 'react';
import { TextField } from '@mui/material';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';

const Cedit = (props) => {
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
        formdata.append('Cid',inputs.Cid);
        formdata.append('Name',inputs.Name);
        formdata.append('University',inputs.University);
        formdata.append('Address',inputs.Address);
        formdata.append('Phone',inputs.Phone);
        formdata.append('Email',inputs.Email);
        formdata.append('AffiliationNumber',inputs.AffiliationNumber);
        formdata.append('image1', selectedImage);
      
        fetch(`http://localhost:3005/editcollege/${inputs._id}`,
            { method: 'put', body: formdata, })
            .then((response) => response.json())
            .then((data) => {
                alert("record saved")
            })
            .catch((err) => {
                console.log("error", err)
            })

        navigate('/college')

    }
 return (
    <form onSubmit={handleSubmit}>
    <TextField id="outlined-basic" label="Cid" type="number" variant="outlined" name='Cid' value={inputs.Cid} onChange={handleInputChange}  /> <br /> <br /> 
 <TextField id="outlined-basic" label="Name" variant="outlined"value={inputs.Name} name='Name' onChange={handleInputChange} /> <br /> <br /> 
 <TextField id="outlined-basic" label="University" variant="outlined" name='University' value={inputs.University} onChange={handleInputChange} /> <br /> <br /> 
 <TextField
     id="outlined-multiline-static"
     label="Address"
     multiline
     rows={4}
     name='Address'
     value={inputs.Address} onChange={handleInputChange} /> <br /> <br /> 
   <TextField id="outlined-basic" label="Phone" type="number" variant="outlined" name='Phone'  value={inputs.Phone} onChange={handleInputChange} /> <br /> <br /> 
   <TextField id="outlined-basic" label="Email" type="email" variant="outlined" name='Email' value={inputs.Email} onChange={handleInputChange} /> <br /> <br /> 
   <TextField id="outlined-basic" label="AffiliationNumber" variant="outlined" name='AffiliationNumber' value={inputs.AffiliationNumber} onChange={handleInputChange} /> <br /> <br /> 
      {/* Other form fields */}
   <input type="file" name='image1' accept="image/*" onChange={handleImageChange} />
   <img src={`data:image/jpeg;base64,${Buffer.from(inputs.image1.data).toString('base64')}`} width="50" height="50" alt='Error' />   
 <br /><br />
 <button type="submit">Update</button>
</form>
    
  )
}
export default Cedit