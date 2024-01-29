import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { TextField } from '@mui/material';
import { Buffer } from 'buffer';

const Cedit = (props) => {
    var[inputs,setInputs]=useState(props.data)
    const [selectedImage, setSelectedImage] = useState(null);
    //  useEffect(() => {
    //       // Fetch existing data including the image URL
    //       axios.get("http://localhost:3005/view")
    //         .then(response => {
    //           setFormData(response.data);
    //         })
    //         .catch(error => {
    //           console.error('Error fetching data: ', error);
    //         });
    //     }, []);

        // const [formData, setFormData] = useState({
        //     Cid:'',
        //     Name:'',
        //     University:'',
        //     Address:'',
        //     Phone:'',
        //     Email:'',
        //     AffiliationNumber:'',
        //     // other form fields
        //     image: '', // Assuming this holds the image URL
        //   });

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
        
            const formDataToSend = new FormData();
            formDataToSend.append('Cid',inputs.Cid);
            formDataToSend.append('Name',inputs.Name);
            formDataToSend.append('University',inputs.University);
            formDataToSend.append('Address',inputs.Address);
            formDataToSend.append('Phone',inputs.Phone);
            formDataToSend.append('Email',inputs.Email);
            formDataToSend.append('AffiliationNumber',inputs.AffiliationNumber);
            // append other form fields if any
        
            if (selectedImage) {
              formDataToSend.append('image1', selectedImage);
            }
            else{
              formDataToSend.append('image1',inputs.image1);
            }
        
            try {
              const response = await axios.put("http://localhost:3005/edit/", formDataToSend, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
        
              console.log('Data updated:', response.data);
              // Optionally handle success
            } catch (error) {
              console.error('Error updating data: ', error);
              // Optionally handle error
            }
          };

      

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