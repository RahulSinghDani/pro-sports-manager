import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Style.css'; // Ensure your styles are imported
import About from './About';

const Bookings = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL  ;

    const { academyId, role } = useParams();
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    // Fetch bookings from the backend
    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/bookings/${academyId}`,{ withCredentials: true }) // Replace with your backend API
            .then((response) => {
                setBookings(response.data);
            })
            .catch((error) => {
                console.error('Error fetching bookings:', error);
            });
    }, [API_BASE_URL ,academyId]);

    // Delete booking handler
    const deleteBooking = (id) => {
        const firstConfirm = window.confirm('Are you sure you want to delete this booking?');
        if (firstConfirm) {
            const secondConfirm = window.confirm('This action is irreversible. Do you really want to delete?');
            if (secondConfirm) {
                axios
                    .delete(`${API_BASE_URL}/bookings/${id}`,{ withCredentials: true })
                    .then(() => {
                        setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
                        alert('Booking deleted successfully!');
                    })
                    .catch((error) => {
                        console.error('Error deleting booking:', error);
                        alert('Failed to delete booking.');
                    });
            }
        }
    };

    // Navigation handlers
    const handleBack = () => {
        navigate(`/AcademyDetails/${role}/${academyId}/ManagePayment`);
    };

    const handleNewBooking = () => {
        navigate(`/new-booking/${role}/${academyId}`); // Adjust path as needed
    };

    const handleEditBooking = (id) => {
        navigate(`/edit-booking/${role}/${academyId}/${id}`); // Adjust path as needed
    };
    // const date = new Date(bookings.date_of_booking );
    // // Format the date (e.g., "30-Nov-2024")
    // const formattedDate = `${date.getDate()}-${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`;
    return (
        <div>
            <nav className='nav'>
                <Link to={`/LoginHome/${role}/${academyId}`} className='logo'>Pro Sports Manager</Link>
                <button onClick={handleBack} style={{ background: "rgb(56, 56, 56)", float: "right" }}>Back</button>
            </nav>

            <div className="container">
                <h1>Bookings</h1>
                <div className="bottom-buttons" style={{float:'right'}}>
                    <button onClick={handleNewBooking}>New Booking</button>
                </div>

                <div className="sports-container">
                    {bookings.length === 0 ? (
                        <p>No bookings found.</p>
                    ) : (
                        bookings.map((booking) => (
                            <div key={booking.id} className="booking-box">
                                <img src={booking.image_url} alt={`${booking.name}`} className="sports-image" />
                                <h3>{booking.name}</h3>
                                {/* <p><strong>Date of Booking:</strong> {booking.date_of_booking}</p> */}
                                <p>
                                    <strong>Date of Booking:</strong>{' '}
                                    {new Date(booking.date_of_booking).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </p>

                                <p><strong>Time:</strong> {booking.time}</p>
                                <p><strong>Amount:</strong> {booking.amount}</p>
                                <p><strong>Customer Name:</strong> {booking.customer_name}</p>
                                <p><strong>Contact:</strong> {booking.contact}</p>
                                <p><strong>Status:</strong> {booking.status}</p>
                                <p><strong>Remarks:</strong> {booking.remarks}</p>
                                <p className="sports-description"><strong>Location:</strong> <a href={booking.location} target='_blank' rel="noopener noreferrer"><button style={{background:'grey'}}>Go to Location</button></a></p>

                                <div className="booking-actions">
                                    <button onClick={() => handleEditBooking(booking.id)}>Edit</button>
                                    <button onClick={() => deleteBooking(booking.id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                
            </div>
            <About />
        </div>
    );
};

export default Bookings;
