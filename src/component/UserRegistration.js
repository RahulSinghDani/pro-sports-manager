import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const UserRegistration = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const [role, setRole] = useState("player");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNext = async () => {
    // Send user data to backend
    const response = await fetch(`${API_BASE_URL}/registerUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      // Redirect based on role
      if (role === "player") {
        navigate(`/playerRegistration`, { state: { user_id: data.userId } });
      } else if (role === "academy") {
        navigate(`/AcademyRegistration`, { state: { user_id: data.userId } });
      }
    } else {
      alert(data.message);
    }
  };

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
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {/* <option value="player">Player</option> */}
            <option value="academy">Academy</option>
            <option value="coach">coach</option>
          </select>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
     
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
   
          <button style={{ width: '100%' }} onClick={handleNext}>Next</button>
          <Link to={`/`}><button style={{ background: 'black' }}>Go Back</button></Link>
        </form>
      </div>
    </div>
  );
};


export default UserRegistration;
