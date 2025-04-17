import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import defaultProfileImg from "./Images/profile-icon.png";
import About from './About';
import LogoIcon from './Images/PSM-logo1.ico';

const EditAcademy = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { role, academyId } = useParams(); // Destructure both role and academyId from URL params
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
        facebook: '',
        images: '',
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
                setTimeout(() => navigate(`/AcademyDetails/${role}/${academyId}`), 1000);
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
            <nav className='nav'>
                <div className='logo-container'>
                    <Link to={`/AcademyDetails/${role}/${academyId}`}><img style={{ width: '50px', borderRadius: '50%' }} src={LogoIcon} alt='logo' /></Link>
                    <Link to={`/AcademyDetails/${role}/${academyId}`} className="logo" >Pro Sports Manager</Link>
                </div>
            </nav>
            <div className='edit-academy-container' >
                <h2 className="edit-academy-title">Edit Academy</h2>
                <form onSubmit={handleSubmit}>
                    <div className='edit-academy-current-image'>
                        <img
                            src={`${API_BASE_URL}/uploads/${academy.images}`}
                            alt="Current Academy"
                            width="400"
                            height="250"
                            style={{ borderRadius: '12px' }}
                            onError={(e) => {
                                e.target.onerror = null; // Prevents infinite loop if default image is also not found
                                e.target.src = defaultProfileImg; // Default image
                            }}
                        />

                    </div>
                    <div className='edit-academy-inputs'>
                        <label>
                            Academy Name:
                            <input type="text" name="name" placeholder="Academy Name" value={academy.name} onChange={handleChange} required />
                        </label>

                        <label>
                            Address:
                            <input type="text" name="address" placeholder="Address" value={academy.address} onChange={handleChange} required />
                        </label>

                        <label>
                            Owner Name:
                            <input type="text" name="owner_name" placeholder="Owner Name" value={academy.owner_name} onChange={handleChange} required />
                        </label>

                        <label>
                            Phone Number:
                            <input type="text" name="phone_num" placeholder="Phone Number" value={academy.phone_num} onChange={handleChange} required />
                        </label>

                        <label>
                            Email:
                            <input type="email" name="email" placeholder="Email" value={academy.email} onChange={handleChange} required />
                        </label>

                        <label>
                            Latitude:
                            <input type="text" name="latitude" placeholder="Latitude" value={academy.latitude} onChange={handleChange} />
                        </label>

                        <label>
                            Longitude:
                            <input type="text" name="longitude" placeholder="Longitude" value={academy.longitude} onChange={handleChange} />
                        </label>

                        <label>
                            Website:
                            <input type="text" name="website" placeholder="Website" value={academy.website} onChange={handleChange} />
                        </label>

                        <label>
                            YouTube:
                            <input type="text" name="youtube" placeholder="YouTube" value={academy.youtube} onChange={handleChange} />
                        </label>

                        <label>
                            Instagram:
                            <input type="text" name="instagram" placeholder="Instagram" value={academy.instagram} onChange={handleChange} />
                        </label>

                        <label>
                            Facebook:
                            <input type="text" name="facebook" placeholder="Facebook" value={academy.facebook} onChange={handleChange} />
                        </label>
                    </div>

                    <div className='edit-academy-images-input-div'>
                        <label className='img-input-academy'>Academy Image: <input type="file" accept="image/*" onChange={handleImageChange} />
                            {previewImage && <img src={previewImage} alt="New Academy" width="150" height="150" />}</label>


                        <label className='img-input-academy'>Academy Logo:  <input type="file" accept="image/*" onChange={handleLogoChange} />
                            {previewLogo && <img src={previewLogo} alt="New Logo" width="150" height="150" />}</label>

                    </div>
                    {/* <button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update Academy'}</button> */}
                    <button type="submit" disabled={loading} className="update-button">
                        {loading ? (
                            <>
                                <span className="spinner"></span> Updating...
                            </>
                        ) : (
                            "Update Academy"
                        )}
                    </button>

                    <Link to={`/AcademyDetails/${role}/${academyId}`}><button type="button">Back</button></Link>
                </form>
                {message && <p>{message}</p>}
            </div>
            <About />
        </div>
    );
};

export default EditAcademy;
