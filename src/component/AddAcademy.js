import React, { useState } from 'react';
import { useNavigate ,Link, useParams } from 'react-router-dom';
import axios from 'axios';

const AddAcademy = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://165.232.183.58:5000';

  const {role} = useParams();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    owner_name: '',
    phone_num: '',
    email: '',
    website: '',
    images: '',
    logo: '',
    youtube: '',
    instagram: '',
    facebook: '',
    user_id: null,
    latitude: '',
    longitude: '',
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
      .post(`${API_BASE_URL}/api/academies`, formData)
      .then((response) => {
        setSuccess('Academy added successfully!');
        setTimeout(() => {
          navigate(`/Dashboard/${role}`); // Redirect to Dashboard after success
        }, 2000); // Wait for 2 seconds before redirecting
      })
      .catch((error) => {
        console.error('Error adding academy:', error);
        setError('Failed to add academy. Please try again.');
      });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 className='heading'>Add a New Academy</h2>
      <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0"}}/> {/*  adjust margin to set into column line */}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <div className='container'>
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
        <div style={{display:'flex',width:'300px'}}>
        <label>Location Coordinates: </label>
        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          value={formData.latitude}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          value={formData.longitude}
          onChange={handleChange}
          required
        />
        </div>
        <input
          type="text"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
        />
        <input
          type="text"
          name="images"
          placeholder="Images (Comma-separated URLs)"
          value={formData.images}
          onChange={handleChange}
        />
        <input
          type="text"
          name="logo"
          placeholder="Logo URL"
          value={formData.logo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="youtube"
          placeholder="YouTube Link"
          value={formData.youtube}
          onChange={handleChange}
        />
        <input
          type="text"
          name="instagram"
          placeholder="Instagram Link"
          value={formData.instagram}
          onChange={handleChange}
        />
        <input
          type="text"
          name="facebook"
          placeholder="Facebook Link"
          value={formData.facebook}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
        <Link to={`/Dashboard/${role}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <button>Back</button>
      </Link>
      </form>
      </div>
    </div>
  );
};

export default AddAcademy;
