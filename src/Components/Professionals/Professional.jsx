import React, { useState } from 'react';
import { Button, FormHelperText, TextField } from '@mui/material';

const Professional = () => {
  const [addressError, setAddressError] = useState('');
  const [addressError2, setAddressError2] = useState('');
  const [inputs, setInputs] = useState({
    "Pid": '',
    "Name": '',
    "Workinfo": '',
    "Experience": '',
    "Qualification": '',
    "Contact": '',
    "Email": '',
    'District': '',
    'State': '',
    'Rate':'',
    'OfficeAddress': '',
    'Address': '',
    'Awards': '',
    'Achievements': '',
    'Facebook': '',
    'Instagram': '',
    'X': '',
    'Linkedin': '',
    'Rating': 'Not Rated',
    "workingHours": {
      monday: { from: '', to: '', closed: false },
      tuesday: { from: '', to: '', closed: false },
      wednesday: { from: '', to: '', closed: false },
      thursday: { from: '', to: '', closed: false },
      friday: { from: '', to: '', closed: false },
      saturday: { from: '', to: '', closed: false },
      sunday: { from: '', to: '', closed: false },
    }
  });

  var [selectedImage, setSelectedImage] = useState(null);
  const inputHandler = (event) => {
    const { name, value } = event.target
    setInputs((inputs) => ({ ...inputs, [name]: value }))
    
  }

  const handleImage = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    inputs.image1 = file;
  }

  const saveData = () => {
    const formdata = new FormData();
    formdata.append('Pid', inputs.Pid);
    formdata.append('Name', inputs.Name);
    formdata.append('Workinfo', inputs.Workinfo);
    formdata.append('Experience', inputs.Experience);
    formdata.append('Qualification', inputs.Qualification);
    formdata.append('Contact', inputs.Contact);
    formdata.append('Email', inputs.Email);
    formdata.append('District', inputs.District);
    formdata.append('State', inputs.State);
    formdata.append('Rate', inputs.Rate);
    formdata.append('OfficeAddress', inputs.OfficeAddress);
    formdata.append('Address', inputs.Address);
    formdata.append('Awards', inputs.Awards);
    formdata.append('Achievements', inputs.Achievements);
    formdata.append('Facebook', inputs.Facebook);
    formdata.append('Instagram', inputs.Instagram);
    formdata.append('X', inputs.X);
    formdata.append('Linkedin', inputs.Linkedin);
    formdata.append('Rating', inputs.Rating);
    formdata.append('image1', selectedImage);
    for (let day in inputs.workingHours) {
      formdata.append(`${day}-from`, inputs.workingHours[day].from);
      formdata.append(`${day}-to`, inputs.workingHours[day].to);
      formdata.append(`${day}-closed`, inputs.workingHours[day].closed);
    }
  

    fetch("http://localhost:3005/newProfessional", {
      method: 'post',
      body: formdata,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("record saved")
      })
      .catch((err) => {
        console.log("error")
      })
  }

  return (
    <div>
      <h3>Professional Add</h3>
      <TextField style={{ marginBottom: '20px' ,marginLeft:'20px' }} id="outlined-basic" label="Pid" variant="outlined" name='Pid' value={inputs.Pid} onChange={inputHandler} />
<TextField style={{ marginBottom: '20px',marginLeft:'20px' }} id="outlined-basic" label="Name" variant="outlined" name='Name' value={inputs.Name} onChange={inputHandler} />
<TextField style={{ marginBottom: '20px',marginLeft:'20px' }} id="outlined-basic" label="Workinfo" variant="outlined" name='Workinfo' value={inputs.Workinfo} onChange={inputHandler} />
<TextField style={{ marginBottom: '20px',marginLeft:'20px' }} id="outlined-basic" label="Experience" variant="outlined" name='Experience' value={inputs.Experience} onChange={inputHandler} />
<TextField style={{ marginBottom: '20px',marginLeft:'20px' }} id="outlined-basic" label="Highest Qualification" variant="outlined" name='Qualification' value={inputs.Qualification} onChange={inputHandler} />
<TextField style={{ marginBottom: '20px' ,marginLeft:'20px'}} id="outlined-basic" label="Contact" variant="outlined" name='Contact' value={inputs.Contact} onChange={inputHandler} />
<TextField style={{ marginBottom: '20px' ,marginLeft:'20px'}} id="outlined-basic" label="Email" variant="outlined" name='Email' value={inputs.Email} onChange={inputHandler} /> 
<TextField style={{ marginBottom: '20px' ,marginLeft:'20px'}} id="outlined-basic" label="District" variant="outlined" name='District' value={inputs.District} onChange={inputHandler} />
<TextField style={{ marginBottom: '20px',marginLeft:'20px' }} id="outlined-basic" label="State" variant="outlined" name='State' value={inputs.State} onChange={inputHandler} /> 
<TextField style={{ marginBottom: '20px',marginLeft:'20px' }} id="outlined-basic" label="Session Charge" variant="outlined" name='Rate' value={inputs.Rate} onChange={inputHandler} /> <br />
<TextField
         style={{ marginBottom: '20px' ,marginLeft:'20px'}}
          id="outlined-multiline-static"
          label="Office Address"
          name='OfficeAddress'
          multiline
          rows={4}
          value={inputs.OfficeAddress} onChange={inputHandler}
          error={Boolean(addressError)}
          helperText={
            <FormHelperText id="component-error-text" style={{ marginLeft: '8px' }} error>
              {addressError}
            </FormHelperText>
          }
          onFocus={() => setAddressError('Enter the full address including PIN,district,State,...')}
          onBlur={() => setAddressError('')} />
 <TextField
        style={{ marginBottom: '20px', marginLeft: '20px' }}
        id="outlined-multiline-static"
        label="Address"
        name='Address'
        multiline
        rows={4}
        value={inputs.Address}
        onChange={inputHandler}
        error={Boolean(addressError2)}
        helperText={
          <FormHelperText id="component-error-text" style={{ marginLeft: '8px' }} error>
            {addressError2}
          </FormHelperText>
        }
        onFocus={() => setAddressError2('Enter the full address including PIN,district,State,...')}
        onBlur={() => setAddressError2('')}
      />
          <TextField
         style={{ marginBottom: '20px' ,marginLeft:'20px'}}
          id="outlined-multiline-static"
          label="Awards"
          name='Awards'
          multiline
          rows={4}
          value={inputs.Awards} onChange={inputHandler} />
             <TextField
         style={{ marginBottom: '20px' ,marginLeft:'20px'}}
          id="outlined-multiline-static"
          label="Achievements"
          name='Achievements'
          multiline
          rows={4}
          value={inputs.Achievements} onChange={inputHandler} /><br />

<TextField style={{ marginBottom: '20px' ,marginLeft:'20px'}} id="outlined-basic" label="Facebook" variant="outlined" name='Facebook' value={inputs.Facebook} onChange={inputHandler} />
<TextField style={{ marginBottom: '20px' ,marginLeft:'20px'}} id="outlined-basic" label="Instagram" variant="outlined" name='Instagram' value={inputs.Instagram} onChange={inputHandler} />
<TextField style={{ marginBottom: '20px' ,marginLeft:'20px'}} id="outlined-basic" label="X" variant="outlined" name='X' value={inputs.X} onChange={inputHandler} />
<TextField style={{ marginBottom: '20px' ,marginLeft:'20px'}} id="outlined-basic" label="Linkedin" variant="outlined" name='Linkedin' value={inputs.Linkedin} onChange={inputHandler} />
<br></br><br></br>
      <label htmlFor="">Choose file to upload</label>
        <input type="file" name="image1" id=""  onChange={handleImage}/> <br /><br />
        <WorkingHoursForm workingHours={inputs.workingHours} setWorkingHours={(workingHours) => setInputs((prevInputs) => ({ ...prevInputs, workingHours }))} /> <br /><br />
        <Button variant="contained"onClick={saveData}>Submit</Button>
       
    </div>
  )
}

const WorkingHoursForm = ({ workingHours, setWorkingHours }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [day, part] = name.split('-');
    setWorkingHours({
      ...workingHours,
      [day]: {
        ...workingHours[day],
        [part]: type === 'checkbox' ? checked : value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission of working hours data
    console.log(workingHours);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Monday:
        <input
          type="time"
          name="monday-from"
          value={workingHours.monday.from}
          onChange={handleChange}
          disabled={workingHours.monday.closed}
        />
        to
        <input
          type="time"
          name="monday-to"
          value={workingHours.monday.to}
          onChange={handleChange}
          disabled={workingHours.monday.closed}
        />
        <input
          type="checkbox"
          name="monday-closed"
          checked={workingHours.monday.closed}
          onChange={handleChange}
        />
        Closed
      </label>
      <br />
      <label>
                Tuesday:
                <input
                    type="time"
                    name="tuesday-from"
                    value={workingHours.tuesday.from}
                    onChange={handleChange}
                    disabled={workingHours.tuesday.closed}
                />
                to
                <input
                    type="time"
                    name="tuesday-to"
                    value={workingHours.tuesday.to}
                    onChange={handleChange}
                    disabled={workingHours.tuesday.closed}
                />
                <input
                    type="checkbox"
                    name="tuesday-closed"
                    checked={workingHours.tuesday.closed}
                    onChange={handleChange}
                />
                Closed
            </label>
            <br />
            <label>
                Wednesday:
                <input
                    type="time"
                    name="wednesday-from"
                    value={workingHours.wednesday.from}
                    onChange={handleChange}
                    disabled={workingHours.wednesday.closed}
                />
                to
                <input
                    type="time"
                    name="wednesday-to"
                    value={workingHours.wednesday.to}
                    onChange={handleChange}
                    disabled={workingHours.wednesday.closed}
                />
                <input
                    type="checkbox"
                    name="wednesday-closed"
                    checked={workingHours.wednesday.closed}
                    onChange={handleChange}
                />
                Closed
            </label>
            <br />
            <label>
                Thursday:
                <input
                    type="time"
                    name="thursday-from"
                    value={workingHours.thursday.from}
                    onChange={handleChange}
                    disabled={workingHours.thursday.closed}
                />
                to
                <input
                    type="time"
                    name="thursday-to"
                    value={workingHours.thursday.to}
                    onChange={handleChange}
                    disabled={workingHours.thursday.closed}
                />
                <input
                    type="checkbox"
                    name="thursday-closed"
                    checked={workingHours.thursday.closed}
                    onChange={handleChange}
                />
                Closed
            </label>
            <br />
            <label>
                Friday:
                <input
                    type="time"
                    name="friday-from"
                    value={workingHours.friday.from}
                    onChange={handleChange}
                    disabled={workingHours.friday.closed}
                />
                to
                <input
                    type="time"
                    name="friday-to"
                    value={workingHours.friday.to}
                    onChange={handleChange}
                    disabled={workingHours.friday.closed}
                />
                <input
                    type="checkbox"
                    name="friday-closed"
                    checked={workingHours.friday.closed}
                    onChange={handleChange}
                />
                Closed
            </label>
            <br />
            <label>
                Saturday:
                <input
                    type="time"
                    name="saturday-from"
                    value={workingHours.saturday.from}
                    onChange={handleChange}
                    disabled={workingHours.saturday.closed}
                />
                to
                <input
                    type="time"
                    name="saturday-to"
                    value={workingHours.saturday.to}
                    onChange={handleChange}
                    disabled={workingHours.saturday.closed}
                />
                <input
                    type="checkbox"
                    name="saturday-closed"
                    checked={workingHours.saturday.closed}
                    onChange={handleChange}
                />
                Closed
            </label>
            <br />
            <label>
                Sunday:
                <input
                    type="time"
                    name="sunday-from"
                    value={workingHours.sunday.from}
                    onChange={handleChange}
                    disabled={workingHours.sunday.closed}
                />
                to
                <input
                    type="time"
                    name="sunday-to"
                    value={workingHours.sunday.to}
                    onChange={handleChange}
                    disabled={workingHours.sunday.closed}
                />
                <input
                    type="checkbox"
                    name="sunday-closed"
                    checked={workingHours.sunday.closed}
                    onChange={handleChange}
                />
                Closed
            </label>
            <br />
      <button type="submit">OK</button>
    </form>
  );
};

export default Professional;
