import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import About from './About';
const PublicBookings = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL  ;

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch booking data
        axios
            .get(`${API_BASE_URL}/public-bookings`, { withCredentials: true }) // Replace with your API endpoint
            .then((response) => {
                setBookings(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching booking data:', error);
                setError('Failed to load booking data.');
                setLoading(false);
            });
    }, [API_BASE_URL]);

    // Show loading message while data is being fetched
    if (loading) {
        return <p>Loading bookings...</p>;
    }

    // Show error message if there's an issue fetching the data
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <nav className='nav'>
                <Link to={`/`}><h1 className='logo'>Pro Sports Manager</h1></Link>
                <Link to={`/`}>
                    <button style={{ background: "rgb(35, 38, 41)", float: "right",fontWeight:'bold' }}>Home</button>
                </Link>
            </nav>
            <h2 style={{marginTop:"12px"}}>VENUE</h2>
            {bookings.length === 0 ? (
                <p>No bookings available.</p>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                padding: '16px',
                                width: '300px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            }}
                        >
                            <img src={booking.image_url} alt={`${booking.name}`} className="sports-image" />

                            {/* <h3>Booking ID: {booking.id}</h3> */}
                            {/* <p><strong>Name:</strong> {booking.customer_name}</p> */}
                            {/* <p><strong>Date Of Booking:</strong>{' '}
                                {new Date(booking.date_of_booking).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </p> */}
                            {/* <p><strong>Time:</strong> {booking.time}</p> */}
                            <p><strong>Status:</strong> {booking.status}</p>
                            <p>{booking.remarks || 'None'}</p>
                            <p className="sports-description"><strong>Location:</strong> <a href={booking.location} target='_blank' rel="noopener noreferrer"><button style={{background:'grey'}}>Go to Location</button></a></p>

                        </div>
                    ))}
                </div>
            )}
            <About />
        </div>
    );
};

export default PublicBookings;
