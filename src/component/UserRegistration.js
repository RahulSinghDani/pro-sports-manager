import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CryptoJS from 'crypto-js';  // Import CryptoJS

const UserRegistration = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNext = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!role.trim() || !username.trim() || !password.trim()) {
      alert("Please fill in all the fields.");
      return;
    }
    // Hash the password using SHA-256 or another algorithm of your choice
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
    // Send user data to backend
    const response = await fetch(`${API_BASE_URL}/registerUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, username, password: hashedPassword }),  // Send the hashed password
    });

    const data = await response.json();
    if (response.ok) {
      // Redirect based on role
      // if (role === "player") {
      //   navigate(`/playerRegistration`, { state: { user_id: data.userId } });
      // }
      if (role === "academy") {
        navigate(`/AcademyRegistration`, { state: { user_id: data.userId } });
      } else if (role === "coach") {
        navigate(`/Login`);
      }
    } else {
      alert(data.message);
    }
  };
  console.log("Selected role:", role);

  return (
    <div>
      <nav className="nav">
        <h1 className="logo">Pro Sports Manager</h1>
        <Link to={`/`}>
          <button style={{ background: "rgb(13, 101, 183)", float: "right" }}>Home</button>
        </Link>
      </nav>

      <div className="user-register-container" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '80vh' }}>

        <h2 className="heading" style={{ textAlign: "center", width: "100%" }}>User Data Form</h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
          <label htmlFor="role-select">Role:</label>
          <select id="role-select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Select Role</option>
            <option value="academy">Academy</option>
            <option value="coach">Coach</option>
          </select>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />

          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button style={{ width: '100%' }} onClick={handleNext}>Next</button>
          <Link to={`/`}><button style={{ background: 'black' }}>Go Back</button></Link>
        </form>
      </div>
    </div>
  );
};


export default UserRegistration;
