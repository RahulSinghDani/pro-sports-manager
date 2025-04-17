import React from 'react';
import axios from 'axios';
import './Style.css';
import LogOutPng from './Images/log-out_1.png';
import LogoIcon from './Images/PSM-logo1.ico';

const Navbar = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/logout`, {}, { withCredentials: true });
      window.location.href = '/Login'; // Redirect after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <nav className='nav'>
        <div display='flex' className='logo-container'>
          {/* <img src={LogoIcon} alt='logo' /> */}
          <img style={{ width: '50px', borderRadius: '50%' }} src={LogoIcon} alt='logo' />
          <h1 className="logo">Pro Sports Manager</h1>
        </div>
        <a onClick={handleLogout} className='logout-btn-png'>
          <img src={LogOutPng} alt='logout' />
        </a>
      </nav>
    </div>
  );
};

export default Navbar;
