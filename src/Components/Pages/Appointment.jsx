import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardActions, CardContent, Typography, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from '@mui/material';
import SimpleAlert from './Alert';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
const Appointment = ({userId}) => {
    const [Data, setData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialog2, setOpenDialog2] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    
    useEffect(() => {
        axios.get("http://localhost:3005/viewAppointment")
            .then(response => {
               setData(response.data)
            })
            .catch(err => console.log(err));
    }, []);
    const filteredData = Data.filter(value => value.Status !=='rejected');
    const confirmHandler = () => {
        selectedAppointment.Status='confirmed';
         axios.put("http://localhost:3005/Appointmentedit/" + selectedAppointment._id, selectedAppointment)
             .then((response) => {
              setAlertOpen(true)
             })
             .catch(err => console.log(err));
     
 };
    const rejectHandler = () => {
           selectedAppointment.Status='rejected';
           
            axios.put("http://localhost:3005/Appointmentedit/" + selectedAppointment._id, selectedAppointment)
                .then((response) => {
                 setAlertOpen(true)
                })
                .catch(err => console.log(err));
        
    };
    const deleteHandler = (appointmentId) => {
        axios.delete(`http://localhost:3005/deleteAppointment/${appointmentId}`)
            .then((response) => {
                setAlertOpen(true);
                setData(Data.filter((value) => value._id !== appointmentId));
            })
            .catch((err) => console.log(err));
    };
    
    return (
        <div>
            <SimpleAlert open={alertOpen} onClose={() => setAlertOpen(false)} message="Appointment cancelled" />

            {filteredData.map((value, index) => {
                const Bcolor = value.Status === 'confirmed' ? 'rgba(0, 255, 0, 0.1)' : 
                                    value.Status === 'cancelled' ? 'rgba(255, 0, 0, 0.1)' : 
                                    'rgba(255, 255, 0, 0.1)';
                const Tcolor = value.Status === 'confirmed' ? 'green' : 
                                  value.Status === 'cancelled' ? 'red' : 
                                  'black';

                return (
                 
                    <div key={index} style={{ display: 'flex', justifyContent: 'center'}}>
                           
                        <Card sx={{ minWidth: 600, backgroundColor: Bcolor, marginBottom:'20px'}} >
    <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
           {value.Incharge}
        </Typography>
        <Typography variant="h7" component="div">
            <small>Date:</small>{value.Date}  <small>Time:</small>{value.Time}
        </Typography>
        <Typography sx={{ mb: 1.5, color: Tcolor }}>
            {value.Status}
        </Typography>
        {value.Helper !== null && (
                                <Typography variant="body2">
                                    <small>Remarks:</small>{value.Helper}
                                </Typography>
                            )}

    </CardContent>
    <CardActions>
    {value.Status === 'cancelled' ? (
        <DeleteIcon onClick={() => deleteHandler(value._id)} />
    ) : (
        <>
        {value.Status !== 'confirmed' &&    <CheckIcon onClick={() => {
                setOpenDialog2(true);
                setSelectedAppointment(value);
            }} />}
          
            <ClearIcon onClick={() => {
                setOpenDialog(true);
                setSelectedAppointment(value);
            }} />
          
        </>
    )}
</CardActions>
</Card>
<Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
    <DialogTitle>Are you sure to cancel?</DialogTitle>
    <DialogContent>
    {selectedAppointment && (
        <TextField
            autoFocus
            margin="dense"
            id="helper"
            label="Helper"
            type="text"
            fullWidth
            value={selectedAppointment.Helper}
            onChange={(e) => {
                setSelectedAppointment({ ...selectedAppointment, Helper: e.target.value });
            }}
        />
    )}
</DialogContent>

    <DialogActions>
        <Button onClick={() => {
            // Handle cancel logic here
            setOpenDialog(false);
        }}>No</Button>
        <Button onClick={() => {
            rejectHandler();
            setOpenDialog(false);
        }}>Yes</Button>
    </DialogActions>
</Dialog>
<Dialog open={openDialog2} onClose={() => setOpenDialog2(false)}>
    <DialogTitle>Are you sure to confirm?</DialogTitle>
    <DialogContent>
    {selectedAppointment && (
        <TextField
            autoFocus
            margin="dense"
            id="helper"
            label="Helper"
            type="text"
            fullWidth
            value={selectedAppointment.Helper}
            onChange={(e) => {
                setSelectedAppointment({ ...selectedAppointment, Helper: e.target.value });
            }}
        />
    )}
</DialogContent>

    <DialogActions>
        <Button onClick={() => {
            // Handle cancel logic here
            setOpenDialog2(false);
        }}>No</Button>
        <Button onClick={() => {
            confirmHandler();
            setOpenDialog2(false);
        }}>Yes</Button>
    </DialogActions>
</Dialog>


                    </div>
                );
            })}
        </div>
    );
};

export default Appointment;
