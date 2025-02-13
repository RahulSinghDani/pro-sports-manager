import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';  // Import js-cookie for handling authentication tokens
import About from './About';

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

  return (
    <div>
      <nav className='nav'>
        <h1 className='logo'>Pro Sports Manager</h1>
        <Link to={`/`}>
          <button style={{ background: "rgb(13, 101, 183)", float: "right" }}>Home</button>
        </Link>
      </nav>

      <div className="login-container" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
        <div className="user-registration-form">
          <h2 className="heading" style={{ textAlign: "center", width: "100%" }}>Login</h2>
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
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button type="submit" style={{ width: "100%" }}>Login</button>
            <p style={{ width: "100%", textAlign: "center", color: "#555555" }}>New user? Click on Register</p>
            <Link to="/#contact">
              <button style={{ width: "100%", backgroundColor: "gray" }}>Register</button>
            </Link>
          </form>
        </div>
      </div>
      <About />
    </div>
  );
};

export default Login;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import CryptoJS from 'crypto-js';  // Import CryptoJS for hashing
// import About from './About';
// import { useAuth } from "./AuthContext";


// const Login = () => {
//   const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();
//   const { setIsAuthenticated } = useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Hash the password using SHA256 (or another algorithm of your choice)
//     const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);


//     try {
//       const response = await axios.post(`${API_BASE_URL}/login`, {
//         username,
//         password: hashedPassword  // Send the hashed password to the backend
//       }, { withCredentials: true });
      

//       if (response.data.message === 'Login successful') {
//         setIsAuthenticated(true);
//         const { role, academy_id, id } = response.data;
//         if (role === 'admin') {
//           navigate(`/Dashboard/${role}`); // Admin dashboard
//         } else if (role === 'coach') {
//           const coachId = role === 'coach' ? id : null;

//           navigate(`/LoginCoachDashboard/${role}/${academy_id}/${coachId}`); //coach dashboard
//         } else if (role === 'player') {
//           navigate(`/LoginPlayerDashboard/${role}/${academy_id}/${id}`); // Player dashboard
//         } else if (role === 'academy') {
//           // navigate(`/LoginAcademyDashboard/${role}/${id}`); // Academy dashboard
//           const academyId = id;
//           navigate(`/AcademyDetails/${role}/${academyId}`);
//         } else {
//           setErrorMessage('Unknown role. Contact admin.');
//         }
//       } else {
//         setErrorMessage(response.data.message || 'Login failed.');
//         alert("Authentication failed"); 
//       }
//     } catch (error) {
//       setErrorMessage(error.response ? error.response.data.message : 'Unable to connect to server.');
//     }
//   };

//   return (
//     <div>

//       <nav className='nav'>
//         <h1 className='logo'>Pro Sports Manager</h1>
//         <Link to={`/`}>
//           <button style={{ background: "rgb(13, 101, 183)", float: "right" }}>Home</button>
//         </Link>
//       </nav>


//       <div className="login-container" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100vh' }} >
//         {/* <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0" }} />  { /*Adjust margin to position the line */}
//         <div className="user-registration-form">

//           <h2 className="heading" style={{ textAlign: "center", width: "100%" }}>Login</h2>
//           <div className='blue-line'></div>
//           <form onSubmit={handleLogin} >
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//             <button type="submit" style={{ width: "100%" }}>Login</button>
//             <p style={{ width: "100%", textAlign: "center", color: "#555555" }}>New user, Click on Register </p>
//             <Link to="/#contact"><button style={{ width: "100%", backgroundColor: "gray" }}>Register</button></Link>
//           </form>
//         </div>
//       </div>
//       <About />
//     </div>
//   );
// };


// export default Login;


