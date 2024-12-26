import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username,
        password
      });

      if (response.data.message === 'Login successful') {
        const { role, academy_id, id } = response.data;
        if (role === 'admin') {
          navigate(`/Dashboard/${role}`); // Admin dashboard
        } else if (role === 'coach') {
          const coachId = role === 'coach' ? id : null;

          navigate(`/LoginCoachDashboard/${role}/${academy_id}/${coachId}`); //coach dashboard
        }else if (role === 'player') {
          navigate(`/LoginPlayerDashboard/${role}/${academy_id}/${id}`); // Player dashboard
        } else if (role === 'academy') {
          // navigate(`/LoginAcademyDashboard/${role}/${id}`); // Academy dashboard
          const academyId= id;
          navigate(`/LoginHome/${role}/${academyId}`);
        } else {
          setErrorMessage('Unknown role. Contact admin.');
        }
      } else {
        setErrorMessage(response.data.message || 'Login failed.');
      }
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Unable to connect to server.');
    }
  };

  return (
    <div>

      <nav className='nav'>
        <h1 className='logo'>Pro Sports Manager</h1>
        <Link to={`/`}>
          <button style={{ background: "rgb(13, 101, 183)", float: "right" }}>Home</button>
        </Link>
      </nav>



      {/* <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0" }} />  { /*Adjust margin to position the line */} 
      <div className="login-container" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '80vh' }}>


      <h2 className="heading" style={{ textAlign: "center", width: "100%"}}>Login</h2>


        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
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
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button type="submit" style={{ width: "100%" }}>Login</button>
          <p style={{ width: "100%", textAlign: "center", color: "#555555" }}>New user, Click on Register </p>
          <Link to="/UserRegistration"><button style={{ width: "100%", backgroundColor: "gray" }}>Register</button></Link>
        </form>
      </div>
    </div>
  );
};


export default Login;


