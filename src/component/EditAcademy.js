import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';

const EditAcademy = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { role } = useParams();
  const [academyId, setAcademyId] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [logoPic, setLogoPic] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);

  const [academy, setAcademy] = useState({
    name: '',
    address: '',
    owner_name: '',
    phone_num: '',
    email: '',
    latitude: '',
    longitude: '',
    website: '',
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
        const response = await axios.get(`${API_BASE_URL}/api/academies/${academyId}`, { withCredentials: true });
        setAcademy(response.data);
        setMessage('');
      } catch (error) {
        setMessage('Academy not found or failed to fetch details.');
        setAcademy({});
      }
    };

    fetchAcademy();
  }, [API_BASE_URL, academyId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogoPic(file);
    setPreviewLogo(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    Object.keys(academy).forEach((key) => {
      formData.append(key, academy[key]);
    });
    if (profilePic) formData.append('images', profilePic);
    if (logoPic) formData.append('logo', logoPic);

    try {
      const response = await axios.put(`${API_BASE_URL}/api/update-academy/academies/${academyId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      
      if (response.data.success) {
        setMessage('Academy updated successfully!');
        setTimeout(() => navigate(`/Dashboard/${role}`), 4000);
      } else {
        setMessage(response.data.message || 'Failed to update academy.');
      }
    } catch (error) {
      setMessage('Failed to update academy. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setAcademy({ ...academy, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Edit Academy</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Academy ID" value={academyId} onChange={(e) => setAcademyId(e.target.value)} required />
        <input type="text" name="name" placeholder="Academy Name" value={academy.name} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={academy.address} onChange={handleChange} required />
        <input type="text" name="owner_name" placeholder="Owner Name" value={academy.owner_name} onChange={handleChange} required />
        <input type="text" name="phone_num" placeholder="Phone Number" value={academy.phone_num} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={academy.email} onChange={handleChange} required />
        <input type="text" name="latitude" placeholder="Latitude" value={academy.latitude} onChange={handleChange} required />
        <input type="text" name="longitude" placeholder="Longitude" value={academy.longitude} onChange={handleChange} required />
        <input type="text" name="website" placeholder="Website" value={academy.website} onChange={handleChange} required />
        <input type="text" name="youtube" placeholder="YouTube" value={academy.youtube} onChange={handleChange} required />
        <input type="text" name="instagram" placeholder="Instagram" value={academy.instagram} onChange={handleChange} required />
        <input type="text" name="facebook" placeholder="Facebook" value={academy.facebook} onChange={handleChange} required />

        <label>Academy Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {previewImage && <img src={previewImage} alt="New Academy" width="150" height="150" />}

        <label>Academy Logo:</label>
        <input type="file" accept="image/*" onChange={handleLogoChange} />
        {previewLogo && <img src={previewLogo} alt="New Logo" width="150" height="150" />}

        <button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update Academy'}</button>
        <Link to={`/Dashboard/${role}`}><button type="button">Back</button></Link>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditAcademy;
