import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
import CryptoJS from 'crypto-js';
import axios from 'axios';

const CreateAcademyRegistration = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const initialFormData ={
        name: '',
        address: '',
        owner_name: '',
        phone_num: '',
        email: '',
        website: '',
        images: 'N/A',
        logo: 'N/A',
        youtube: 'N/A',
        instagram: 'N/A',
        facebook: 'N/A',
        latitude: 0.00,
        longitude: 0.00,
    }

  const [role, setRole] = useState("academy");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   if (!window.confirm("Are you sure you want to submit the form?")) {
  //     return;
  //   }
    
  //   if (!role.trim() || !username.trim() || !password.trim()) {
  //     alert("Please fill in all user details.");
  //     return;
  //   }

  //   const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
    
  //   try {
  //     const userResponse = await fetch(`${API_BASE_URL}/registerUser`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ role, username, password: hashedPassword }),
  //       credentials: 'include'
  //     });
      
  //     const userData = await userResponse.json();
      
  //     if (userResponse.ok) {
  //       formData.user_id = userData.userId;
  //       await axios.post(`${API_BASE_URL}/api/addacademies`, formData, { withCredentials: true });
  //       alert("Registration successful!");
        
  //       setUsername("");
  //       setPassword("");
  //       setFormData(initialFormData);
  //     } else {
  //       alert(userData.message);
  //     }
  //   } catch (error) {
  //     console.error("Error during registration:", error);
  //     alert("Registration failed. Please try again.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!window.confirm("Are you sure you want to submit the form?")) {
      return;
    }
  
    if (!role.trim() || !username.trim() || !password.trim()) {
      alert("Please fill in all user details.");
      return;
    }
  
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
  
    try {
      const userResponse = await axios.post(`${API_BASE_URL}/registerUser`, {
        role,
        username,
        password: hashedPassword
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });
  
      const userData = userResponse.data;
  
      if (userResponse.status === 200) {
        formData.user_id = userData.userId;
        await axios.post(`${API_BASE_URL}/api/addacademies`, formData, { withCredentials: true });
        alert("Registration successful!");
  
        setUsername("");
        setPassword("");
        setFormData(initialFormData);
      } else {
        alert(userData.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };
  return (
    <div>
      <div className="user-register-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
        <div className="user-registration-form">
          <h2 className="heading" style={{ textAlign: "center" }}>User & Academy Registration</h2>
          <form onSubmit={handleSubmit} className="input-required-field-style">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="text" name="name" placeholder="Academy Name" value={formData.name} onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
            <input type="text" name="owner_name" placeholder="Owner Name" value={formData.owner_name} onChange={handleChange} required />
            <input type="text" name="phone_num" placeholder="Phone Number" value={formData.phone_num} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="text" name="website" placeholder="Website" value={formData.website} onChange={handleChange} />
            <button type="submit" style={{ width: '100%' }}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAcademyRegistration;
