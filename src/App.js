// App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ResponsiveNavbar from './Components/Admin/ResponsiveNavbar';
import Home from './Components/Pages/Home';
import About from './Components/Pages/About';
import Contact from './Components/Pages/Contact';
import Collegedetails from './Components/College/Collegedetails';
import Professionaldetails from './Components/Professionals/Professionaldetails';
import College from './Components/College/College';
import Professional from './Components/Professionals/Professional';
import User from './Components/User/User';
import Userdetails from './Components/User/Userdetails';
import Heve from './Components/Heve/Heve';
import Dcollege from './Components/College/Dcollege';
import Login from './Components/Login/Login';


const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    const storedValue = localStorage.getItem('isLoggedIn');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const toggleLogin = () => {
    setLoggedIn(!isLoggedIn);
  };

  const handleLogout = () => {
    // Additional logout logic if needed
    toggleLogin(); // Call the function to update the isLoggedIn state
  };

  return (
    <Router>
      {isLoggedIn ? <ResponsiveNavbar isLoggedIn={isLoggedIn} onLogout={handleLogout} /> : null}
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={toggleLogin} />} />
        {isLoggedIn ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/heve" element={<Heve />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/addcollege" element={<College />} />
            <Route path="/college" element={<Collegedetails />} />
            <Route path="/addprofessional" element={<Professional />} />
            <Route path="/professional" element={<Professionaldetails />} />
            <Route path="/adduser" element={<User />} />
            <Route path="/user" element={<Userdetails />} />
            <Route path="/d" element={<Dcollege />} />
          </>
        ) : (
          // Redirect to login when not logged in
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
