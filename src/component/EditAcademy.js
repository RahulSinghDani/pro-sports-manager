import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link, useParams } from 'react-router-dom';
// import Dashboard from './Dashboard';

const EditAcademy = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://165.232.183.58:5000';

  const {role} = useParams(); 
  const [academyId, setAcademyId] = useState('');
  const [academy, setAcademy] = useState({
    name: '',
    address: '',
    owner_name: '',
    phone_num: '',
    email: '',
    location: '',
    website: '',
    images: '',
    logo: '',
    youtube: '',
    instagram: '',
    facebook: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!academyId) return;

    const fetchAcademy = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/academies/${academyId}`);
        setAcademy(response.data); // Set academy details for editing
        setMessage(''); // Clear any previous message
      } catch (error) {
        setMessage('Academy not found or failed to fetch details.');
        setAcademy({}); // Clear academy details
      }
    };

    fetchAcademy();
  }, [ academyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage('');

    try {
      const response = await axios.put(`${API_BASE_URL}/api/academies/${academyId}`, academy);

      if (response.data.success) {
        setMessage('Academy updated successfully!');
        setTimeout(() => {
          navigate(`/Dashboard/${role}`); // Redirect after 4 seconds
        }, 4000);
      } else {
        setMessage(response.data.message || 'Failed to update academy.');
      }
    } catch (error) {
      console.error('Error updating academy:', error);
      setMessage('Failed to update academy. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setAcademy({
      ...academy,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h2 className='heading'>Edit Academy</h2>
      <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0"}}/> {/*  adjust margin to set into column line */}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="academyId">Enter Academy ID:</label>
          <input
            type="text"
            id="academyId"
            name="academyId"
            value={academyId}
            onChange={(e) => setAcademyId(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="name">Academy Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={academy.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={academy.address}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="owner_name">Owner Name:</label>
          <input
            type="text"
            id="owner_name"
            name="owner_name"
            value={academy.owner_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="phone_num">Phone Number:</label>
          <input
            type="text"
            id="phone_num"
            name="phone_num"
            value={academy.phone_num}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={academy.email}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{display:'flex'}}>
        <label>Location Coordinates: </label>
        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          value={academy.latitude}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          value={academy.longitude}
          onChange={handleChange}
          required
        />
        </div>

        <div>
          <label htmlFor="website">Website:</label>
          <input
            type="text"
            id="website"
            name="website"
            value={academy.website}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="images">Images:</label>
          <input
            type="text"
            id="images"
            name="images"
            value={academy.images}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="logo">Logo:</label>
          <input
            type="text"
            id="logo"
            name="logo"
            value={academy.logo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="youtube">YouTube:</label>
          <input
            type="text"
            id="youtube"
            name="youtube"
            value={academy.youtube}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="instagram">Instagram:</label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            value={academy.instagram}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="facebook">Facebook:</label>
          <input
            type="text"
            id="facebook"
            name="facebook"
            value={academy.facebook}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Academy'}
        </button>
        <Link to={`/Dashboard/${role}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <button>Back</button>
      </Link>
      </form>

      {message && <p>{message}</p>}

      {/* <Dashboard /> */}
    </div>
  );
};

export default EditAcademy;
