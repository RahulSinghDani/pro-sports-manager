import React, { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

const AddAcademy = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { role } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    owner_name: '',
    phone_num: '',
    email: '',
    website: '',
    images: null,
    logo: '',
    youtube: '',
    instagram: '',
    facebook: '',
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

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      await axios.post(`${API_BASE_URL}/api/addacademies`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },{ withCredentials: true });
      setSuccess('Academy added successfully!');
      setTimeout(() => {
        navigate(`/Dashboard/${role}`);
      }, 2000);
    } catch (error) {
      console.error('Error adding academy:', error);
      setError('Failed to add academy. Please try again.');
    }
  };

  return (
    <div>
      <nav className='nav'>
        <h1 className='logo'>Pro Sports Manager</h1>
        <Link to={`/Dashboard/${role}`}>
          <button style={{ background: 'rgb(13, 101, 183)', float: 'right' }}>Home</button>
        </Link>
      </nav>
      <div className='container' style={{ maxWidth: '600px', marginTop: '40px', padding: '20px' }}>
        <h2 className='heading'>Add a New Academy</h2>
        <div style={{ width: '100%', height: '2px', backgroundColor: 'blue', margin: '5px 0' }} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <input type='text' name='name' placeholder='Academy Name' value={formData.name} onChange={handleChange} required />
          <input type='text' name='address' placeholder='Address' value={formData.address} onChange={handleChange} required />
          <input type='text' name='owner_name' placeholder='Owner Name' value={formData.owner_name} onChange={handleChange} required />
          <input type='text' name='phone_num' placeholder='Phone Number' value={formData.phone_num} onChange={handleChange} required />
          <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} required />
          <div style={{ display: 'flex', width: '300px' }}>
            <label>Location Coordinates: </label>
            <input type='text' name='latitude' placeholder='Latitude' value={formData.latitude} onChange={handleChange} required />
            <input type='text' name='longitude' placeholder='Longitude' value={formData.longitude} onChange={handleChange} required />
          </div>
          <input type='text' name='website' placeholder='Website' value={formData.website} onChange={handleChange} />
          <input type='file' name='images' accept='images/*' onChange={handleImageChange} required />
          <input type='text' name='logo' placeholder='Logo URL' value={formData.logo} onChange={handleChange} />
          <input type='text' name='youtube' placeholder='YouTube Link' value={formData.youtube} onChange={handleChange} />
          <input type='text' name='instagram' placeholder='Instagram Link' value={formData.instagram} onChange={handleChange} />
          <input type='text' name='facebook' placeholder='Facebook Link' value={formData.facebook} onChange={handleChange} />
          <button type='submit'>Submit</button>
          <Link to={`/Dashboard/${role}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <button>Back</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddAcademy;