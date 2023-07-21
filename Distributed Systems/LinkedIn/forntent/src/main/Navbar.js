// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
//import './Navbar.css'; // Create a separate CSS file for Navbar styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <img src={logo} alt="Logo" style={{ width: '100px', height: '50px' }} className="logo" />
      </div>
      <div className="navbar-buttons">
        <Link to="/">Home</Link>
        <Link to="/post">Post</Link>
        <Link to="/notification">Notification</Link>
      </div>
    </nav>
  );
};

export default Navbar;
