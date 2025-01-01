import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Style.css'; // Ensure your styles are imported
import defaultImage from './Images/ground2.jpg';
import MapPng from './Images/map-png.png';
import About from './About';

const BookableDashboard = () => {
    const [bookableDetails, setBookableDetails] = useState(null); // State for a single booking's details
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { role, academyId, id } = useParams(); // Extract academyId and id from the route parameters
    const formatText = (text) => text.split('\n').map((line, index) => <p key={index}>{line}</p>);



    console.log('Role:', role, 'Academy ID:', academyId, 'Ground ID:', id);
    const capitalizeFirstLetter = (text) => {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };
    // Fetch details for a specific ground by ID
    useEffect(() => {
        if (id && academyId) {
            axios
                .get(`${API_BASE_URL}/all-bookable-grounds/${academyId}/${id}`)
                .then((response) => {
                    if (response.data && response.data.length > 0) {
                        setBookableDetails(response.data[0]);
                    } else {
                        console.error('No data found for the given ID.');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching ground details:', error);
                });
        }
    }, [API_BASE_URL, academyId, id]);

    return (
        <div>
            <div className="nav">
                <h1 className="logo">Pro Sports Manager</h1>
            </div>
            <div className='below-navbar'>
                {/* <h2 className="heading">Bookable Dashboard</h2> */}
                <div className="bookable-dashboard">
                    {/* Display details of a single booking if data is available */}
                    {bookableDetails ? (
                        <div>

                            <p style={{ padding: '12px 28px', fontWeight: 'bold', textAlign: 'left', fontSize: '1.5rem', textTransform: 'capitalize', color: 'rgb(62, 62, 62)' }}>
                                {capitalizeFirstLetter(bookableDetails.name)} : {capitalizeFirstLetter(bookableDetails.remarks)}
                            </p>

                            <div className="bookable-card">

                                <div className='bookable-img-div'>
                                    <img className='bookable-img'
                                        src={
                                            bookableDetails.image_url?.startsWith('http') // Check if the URL is a valid link
                                                ? bookableDetails.image_url // Use the provided link if valid
                                                : `${API_BASE_URL}/uploads/${bookableDetails.image_url}` // Otherwise, construct the file path
                                        }
                                        alt={bookableDetails.name || 'Image not available'}
                                        onError={(e) => { e.target.src = defaultImage; }} // Fallback if the image fails to load
                                    />
                                    <Link to={`/booking-book-now/${role}/${academyId}/${id}`} className='book-now-button'>
                                        <button>BOOK NOW</button>
                                    </Link>


                                </div>

                                <div className='bookable-box1'>

                                    <p>
                                        {/* <strong>Date of Booking:</strong> {new Date(bookableDetails.date_of_booking).toLocaleDateString()} */}
                                        <br />
                                        <div style={{ border: '1px solid grey', padding: '10px', borderRadius: '10px', marginBottom: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)' }}>
                                            <p style={{ fontSize: "1.7rem", color: 'grey' }}><strong style={{ color: 'rgb(50, 50, 50)' }} >Timing:</strong> {bookableDetails.time}</p>
                                            <br />
                                            <p style={{ fontSize: "1.2rem" }}><strong>Contact Name:</strong> {bookableDetails.customer_name}</p>
                                            <br />
                                            <p style={{ fontSize: "1.2rem" }}><strong>Contact:</strong> {bookableDetails.contact}</p>
                                            <br />
                                        </div>
                                        <div style={{ border: '1px solid grey', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)' }}>
                                            <p style={{ fontSize: "1.2rem" }}><strong>Charges:</strong> Rs. {bookableDetails.amount}  per person </p>
                                        </div>
                                        <br />
                                        {/* <strong>Status:</strong> {bookableDetails.status} */}
                                        <br />
                                        {/* <p>{bookableDetails.location}</p> */}

                                    </p>
                                    <p style={{ textAlign: 'left', fontSize: '1.2rem', textTransform: 'uppercase' }}> {bookableDetails.remarks}</p>
                                    <div className='map-image-link'>

                                        {bookableDetails.location ? (
                                            // If a valid link is available, check if it's a Google Maps link
                                            bookableDetails.location.startsWith('https') ? (
                                                // Display the map image as a link that redirects to the location in Google Maps
                                                <a href={bookableDetails.location} target="_blank" rel="noopener noreferrer">
                                                    <img
                                                        src={MapPng}
                                                        alt="Map"
                                                        style={{ width: '400px', height: '180px', cursor: 'pointer', boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} // Style the image link
                                                    />
                                                </a>
                                            ) : (
                                                // Fallback to dynamic Google Maps search link
                                                <a
                                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bookableDetails.location)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src={MapPng}
                                                        alt="Map"
                                                        style={{ width: '400px', height: '180px', cursor: 'pointer', boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} // Style the image link
                                                    />
                                                </a>
                                            )
                                        ) : (
                                            <p>No location available.</p> // Show message if no location is provided
                                        )}
                                    </div>


                                </div>
                            </div>
                            <div className="about-text">
                                <h3>Ground Use Instructions</h3>
                                {formatText(bookableDetails.about)}
                            </div>
                        </div>
                    ) : (
                        <p>Loading details...</p>
                    )}


                </div>
            </div>
            <About />
        </div>
    );
};

export default BookableDashboard;
