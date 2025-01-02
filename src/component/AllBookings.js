import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Style.css'; // Ensure your styles are imported
import About from './About';

const AllBookings = () => {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // Fetch bookings from the backend

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { role, academyId, id } = useParams(); // Extract academyId from the route parameters

    console.log("ROle : ", role, "ac id: ", academyId, "ground id : ", id);
    // Fetch bookings from API
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/all-bookings/${academyId}`);
                setBookings(response.data);
            } catch (err) {
                setError('Failed to load bookings');
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [API_BASE_URL, academyId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className='nav'>
                <h1 className='logo'>Pro Sports Manager</h1>
            </div>
            <div className='below-navbar'>
                <h2 className='heading'>All Bookings</h2>
                {bookings.length > 0 ? (
                    <div className="table-wrapper">
                        <table className='bookings-table'>
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Item Type</th>
                                    <th>Item ID</th>
                                    <th>Booking Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Booked By</th>
                                    <th>Contact</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking.booking_id}>
                                        <td>{booking.booking_id}</td>
                                        <td>{booking.item_type}</td>
                                        <td>{booking.item_id}</td>
                                        <td>{booking.booking_date}</td>
                                        <td>{booking.start_time || 'Full Day'}</td>
                                        <td>{booking.end_time || 'Full Day'}</td>
                                        <td>{booking.booked_by}</td>
                                        <td>{booking.contact_number}</td>
                                        <td>{booking.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>
            <About />
        </div>
    );
};

export default AllBookings;
