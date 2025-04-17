import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultImage from './Images/ground2.jpg';
import imageCompression from 'browser-image-compression';

const NewsForm = ({ role, academyId }) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [showPopup, setShowPopup] = useState(false);

    const [newsData, setNewsData] = useState([]); // Holds news list
    const [newsDetails, setNewsDetails] = useState({ title: '', image: null });
    const [reload, setReload] = useState(false); // Triggers re-fetching

    // Fetch news on mount and when reload changes
    useEffect(() => {
        if (API_BASE_URL) {
            axios.get(`${API_BASE_URL}/api/getNews/${academyId}?t=${new Date().getTime()}`, { withCredentials: true })
                .then(response => {
                    setNewsData(response.data); // Update news list
                })
                .catch(error => console.error('Error fetching news data:', error));
        }
    }, [API_BASE_URL, academyId, reload]);

    // Handle text & image inputs
    const handleInputChange = async (e) => {
        const { name, value, files } = e.target;

        if (name === 'image' && files?.[0]) {
            try {
                const options = {
                    maxSizeMB: 0.5,
                    maxWidthOrHeight: 1024,
                    useWebWorker: true,
                };

                const compressedFile = await imageCompression(files[0], options);

                setNewsDetails(prevState => ({
                    ...prevState,
                    [name]: compressedFile,
                }));
            } catch (error) {
                console.error("Image compression error:", error);
            }
        } else {
            setNewsDetails(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await axios.delete(`${API_BASE_URL}/api/news-announcements/${id}`, { withCredentials: true });
            setShowPopup({ message: "Equipment deleted successfully!", type: "success" });
            setReload(prev => !prev);
        } catch (error) {
            console.error("Error deleting equipment:", error);
            setShowPopup({ message: "Failed to delete equipment. Please try again.", type: "error" });
        }
        setTimeout(() => {
            setShowPopup(false);
        }, 2000);
    };
    // Handle publishing news
    const handlePublish = () => {
        if (!newsDetails.title) {
            alert('Title is required.');
            return;
        }

        const formData = new FormData();
        formData.append('academy_id', academyId);
        formData.append('title', newsDetails.title);
        if (newsDetails.image) formData.append('image', newsDetails.image);

        axios.post(`${API_BASE_URL}/api/publishNews`, formData, { withCredentials: true })
            .then(() => {
                alert('News published successfully!');
                setNewsDetails({ title: '', image: null });
                setReload(prev => !prev); // Triggers re-fetching
            })
            .catch(error => {
                console.error('Error publishing news:', error);
                alert('Failed to publish news');
            });
    };

    return (
        <div className='news-main'>
            {(role === 'academy' || role === 'admin') && (
                <div className='input-news-section'>
                    <textarea
                        className='news-input-textarea'
                        placeholder="Enter Announcements"
                        name="title"
                        value={newsDetails.title}
                        onChange={handleInputChange}
                        rows="4"
                        cols="50"
                        required
                    />
                    <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                        <input type="file" name="image" accept="image/*" onChange={handleInputChange} />
                        <button onClick={handlePublish}>Publish</button>
                    </div>
                </div>
            )}
            <p className="announcements-title">Announcements</p>

            <div className="news-container">
                {Array.isArray(newsData) ? (
                    newsData.length === 0 ? (
                        <p>No Announcements found.</p>
                    ) : (
                        newsData.map(news => (
                            <div key={news.id} className="display-news-section">
                                <div className='display-news-section2'>
                                    <img
                                        src={news.image ? `${API_BASE_URL}/uploads/${news.image}` : defaultImage}
                                        alt="News"
                                        className="news-image"
                                        onError={(e) => { e.target.src = defaultImage; }}
                                    />
                                    <div className="news-text">
                                        <p><strong>{news.title}</strong></p>
                                        <p><strong><i>Publish Date: </i></strong>
                                            {news.created_at ? new Date(news.created_at).toLocaleDateString('en-GB') : 'Not Available'}
                                        </p>
                                        <p><div className="equipment-actions">
                                            {/* <button onClick={() => handleEdit(item)} className="edit-btn">Edit</button> */}
                                            {(role === 'academy' || role === 'admin') && (
                                                <button onClick={() => handleDelete(news.id)} className="delete-btn">
                                                    Delete
                                                </button>
                                            )}
                                            {showPopup && (
                                                <div style={{
                                                    position: 'fixed', bottom: '20px', right: '20px',
                                                    backgroundColor: showPopup.type === "success" ? "green" : "red",
                                                    color: 'white', padding: '10px 20px',
                                                    borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0,0,0,0.2)'
                                                }}>
                                                    {showPopup.message}
                                                </div>
                                            )}
                                        </div></p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default NewsForm;
