// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
//import './Navbar.css'; // Create a separate CSS file for Navbar styles

const logout = () =>{
  document.cookie.split(';').forEach(function(cookie) {
    const cookieName = cookie.split('=')[0].trim();
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  });

  // Redirect the user to a logged-out page (you can change the URL)
  window.location.href = '/login';
}

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <img src={logo} alt="Logo" style={{ width: '100px', height: '50px' }} className="logo" />
      </div>
      <div className="navbar-buttons">
        <Link to="/home">Home</Link>
        <Link to="/post">Post</Link>
        <Link to="/notification">Notification</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
