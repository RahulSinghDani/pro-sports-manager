import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const NewBooking = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL  ;

    const { academyId, role } = useParams();
    const [bookingDetails, setBookingDetails] = useState({
        name: '',
        date_of_booking: '',
        time: '',
        amount: '',
        customer_name: '',
        contact: '',
        status: '',
        remarks: '',
        location: '',
        image_url: '',
        academy_id: academyId
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Ensure all fields are filled before submission
        if (Object.values(bookingDetails).includes('')) {
            setError('Please fill all fields.');
            return;
        }

        axios
            .post( `${API_BASE_URL}/bookings/${role}/${academyId}`, bookingDetails) // Replace with your backend API
            .then((response) => {
                alert('Booking created successfully!');
                navigate(`/ManagePayment/${role}/${academyId}/Bookings`); // Navigate to the bookings list after successful creation
            })
            .catch((error) => {
                console.error('Error creating booking:', error);
                setError('Failed to create booking.');
            });
    };

    return (
        <div className="new-booking-container">
            <h1>New Booking</h1>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={bookingDetails.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Date of Booking:</label>
                    <input
                        type="date"
                        name="date_of_booking"
                        value={bookingDetails.date_of_booking}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Time:</label>
                    <input
                        type="time"
                        name="time"
                        value={bookingDetails.time}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={bookingDetails.amount}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Customer Name:</label>
                    <input
                        type="text"
                        name="customer_name"
                        value={bookingDetails.customer_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Contact:</label>
                    <input
                        type="text"
                        name="contact"
                        value={bookingDetails.contact}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select
                        type="text"
                        name="status"
                        value={bookingDetails.status}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Payment Status</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <div>
                    <label>Remarks:</label>
                    <input
                        type="text"
                        name="remarks"
                        value={bookingDetails.remarks}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Location (Copy Location from Google MAP):</label>
                    <input
                        type="text"
                        name="location"
                        value={bookingDetails.location}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="text"
                        name="image_url"
                        value={bookingDetails.image_url}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Create Booking</button>
            </form>
            <button onClick={() => navigate(`/ManagePayment/${role}/${academyId}/Bookings`)}>Back to Bookings</button>
        </div>
    );
};

export default NewBooking;
