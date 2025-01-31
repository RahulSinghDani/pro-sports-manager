import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultImage from './Images/ground2.jpg';
// import { newDate } from 'react-datepicker/dist/date_utils';

const NewsForm = ({ role, academyId }) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [newsData, setNewsData] = useState([]); // Initialize with an empty array
    const [newsDetails, setNewsDetails] = useState({ title: '', image: null });

    useEffect(() => {
        if (API_BASE_URL) {
            axios.get(`${API_BASE_URL}/api/getNews/${academyId}`)
                .then(response => {
                    console.log(response.data); // Check the data structure
                    setNewsData(response.data); // Directly set the fetched data
                })
                .catch(error => console.error('Error fetching news data:', error));
        }
    }, [API_BASE_URL, academyId]);
    // console.log("news data : ",newsData);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setNewsDetails(prevState => ({
            ...prevState,
            [name]: name === 'image' && files?.[0] ? files[0] : value,
        }));
    };

    const handlePublish = () => {
        if (!newsDetails.title) {
            alert('Title is required.');
            return;
        }

        const formData = new FormData();
        formData.append('academy_id', academyId);
        formData.append('title', newsDetails.title);
        if (newsDetails.image) formData.append('image', newsDetails.image);

        axios.post(`${API_BASE_URL}/api/publishNews`, formData)
            .then(response => {
                alert('News published successfully!');
                setNewsDetails({ title: '', image: null });
                setNewsData(response.data); // Directly set new fetched data
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
                    />
                    <input type="file" name="image" accept="image/*" onChange={handleInputChange} />
                    <button onClick={handlePublish}>Publish</button>
                </div>
            )}
            <p className="announcements-title">Announcements</p>

            <div className="news-container">
                {!newsData ? (
                    <p>Loading...</p>
                ) : newsData.length === 0 ? (
                    <p>No Announcements found.</p>
                ) : (
                    newsData.map(news => (
                        <div key={news.id} className="display-news-section">
                            <div className='display-news-section2' >
                                <img
                                    src={news.image ? `${API_BASE_URL}/uploads/${news.image}` : defaultImage}
                                    alt="News"
                                    className="news-image"
                                    onError={(e) => { e.target.src = defaultImage; }}
                                />
                                <div className="news-text">
                                    <p><strong>{news.title}</strong>
                                        <p><strong><i>Publish Date: </i></strong> {news.created_at ? new Date(news.created_at).toLocaleDateString('en-GB') : '-'} </p>
                                        {/* <p><strong>ID: </strong> {news.id || 'N/A'}</p>  */}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NewsForm;
