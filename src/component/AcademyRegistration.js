import React, { useState } from 'react';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import About from './About';

const AcademyRegistration = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { role } = useParams();
  const location = useLocation();
  const user_id = location.state?.user_id;
  const [formData, setFormData] = useState({
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
    user_id: user_id,
    latitude: 0.00,
    longitude: 0.00,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${API_BASE_URL}/api/addacademies`, formData ,{ withCredentials: true })
      .then((response) => {
        setSuccess('Academy added successfully!');
        setTimeout(() => {
          navigate(`/Login`); // Redirect to Dashboard after success
        }, 2000); // Wait for 2 seconds before redirecting
      })
      .catch((error) => {
        console.error('Error adding academy:', error);
        setError('Failed to add academy. Please try again.');
      });
  };

  return (
    <div className='body'>

      <nav className='nav'>
        <h1 className='logo'>Pro Sports Manager</h1>
        <Link to={`/`}>
          <button style={{ background: "rgb(13, 101, 183)", float: "right" }}>Home</button>
        </Link>
      </nav>
      <div className="center-div" style={{ marginTop: '40px', padding: '20px' }}>
        <div className="user-registration-form">
          <h2 className='heading'>Register Your Academy</h2>
          <div style={{ width: "100%", height: "2px", backgroundColor: "grey" }} /> {/*  adjust margin to set into column line */}

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
          <div className=''>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Academy Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="owner_name"
                placeholder="Owner Name"
                value={formData.owner_name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone_num"
                placeholder="Phone Number"
                value={formData.phone_num}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="website"
                placeholder="Website"
                value={formData.website}
                onChange={handleChange}
              />

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to={`/Dashboard/${role}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <button style={{background:'grey'}}>Back</button>
                </Link>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <About />
    </div>
  );
};

export default AcademyRegistration;
