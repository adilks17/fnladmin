import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const ResponsiveNavbar = ({ isLoggedIn, onLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Home', 'About', 'College','Professional','User','Heve', 'Contact','Movies','Books'].map((text, index) => (
          <ListItem button key={text} component={Link} to={`/${text.toLowerCase()}`}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="static" style={{backgroundColor:'black'}}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
           BEINGWELL
          </Typography>
          <Typography fontSize={16}  style={{ flexGrow: 1 ,textAlign:'right'}}>
          <AdminPanelSettingsIcon fontSize='large'/>
          </Typography>
          {isLoggedIn && (
            <Button color='error' style={{alignItems:'right'}} onClick={onLogout}>Logout</Button>
          
        )}
     
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()} 
      </Drawer>
    </div>
  );
};

export default ResponsiveNavbar;
