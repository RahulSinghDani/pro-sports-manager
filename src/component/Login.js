import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';  // Import js-cookie for handling authentication tokens
import About from './About';
import LogoIcon from './Images/PSM-logo1.ico';

const Login = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Hash the password before sending it to the backend
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username,
        password: hashedPassword
      }, { withCredentials: true });

      if (response.data.message === 'Login successful') {
        const { role, academy_id, id, token } = response.data;

        // Store JWT token in secure cookies
        Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });

        // Redirect user based on role
        if (role === 'admin') {
          navigate(`/Dashboard/${role}`);
        } else if (role === 'coach') {
          navigate(`/LoginCoachDashboard/${role}/${academy_id}/${id}`);
        } else if (role === 'player') {
          navigate(`/LoginPlayerDashboard/${role}/${academy_id}/${id}`);
        } else if (role === 'academy') {
          navigate(`/AcademyDetails/${role}/${id}`);
        } else {
          setErrorMessage('Unknown role. Contact admin.');
        }
      } else {
        setErrorMessage(response.data.message || 'Login failed.');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Unable to connect to server.');
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);
  return (
    <div>
      <nav className='nav'>
        <div className='logo-container'>
          <Link to={`/`}><img style={{ width: '50px', borderRadius: '50%' }} src={LogoIcon} alt='logo' /></Link>
          <Link to={`/`} className="logo" >Pro Sports Manager</Link>
        </div>
        <Link to={`/`}>
          <button style={{ background: "rgb(13, 101, 183)", float: "right" }}>Home</button>
        </Link>
      </nav>

      <div className="login-container" >
        <div className="user-registration-form">
          <h2 className="heading" >Login</h2>
          <div className='blue-line'></div>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errorMessage && <p style={{ color: 'red' }} >{errorMessage}</p>}
            <button type="submit" >Login</button>
            <p >New user? Click on Register</p>
            <Link to="/#contact">
              <button >Register</button>
            </Link>
          </form>
        </div>
      </div>
      <About />
    </div>
  );
};

export default Login;