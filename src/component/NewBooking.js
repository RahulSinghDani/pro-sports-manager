import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import About from './About';
const NewBooking = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const { academyId, role } = useParams();
    const [bookingDetails, setBookingDetails] = useState({
        name: '',
        date_of_booking: '',
        time: ' - ', // Default value to ensure proper splitting
        amount: '',
        customer_name: '',
        contact: '',
        status: '',
        remarks: '',
        location: '',
        image_url: '',
        academy_id: academyId,
        about:'Available on time',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image_url' && files && files[0]) {
            setBookingDetails((prevState) => ({
                ...prevState,
                [name]: files[0], // Set file object
            }));
        } else {
            setBookingDetails((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    const handleTimeChange = (e, type) => {
        const value = e.target.value;
        setBookingDetails((prevDetails) => {
            const times = prevDetails.time ? prevDetails.time.split(' - ') : ['', ''];
            if (type === 'start') {
                times[0] = value;
            } else if (type === 'end') {
                times[1] = value;
            }
            return { ...prevDetails, time: times.join(' - ') };
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const requiredFields = ['name', 'date_of_booking', 'time', 'amount', 'customer_name', 'contact', 'status', 'remarks', 'location','about'];
        for (const field of requiredFields) {
            if (!bookingDetails[field]) {
                setError(`Please fill in the ${field.replace('_', ' ')} field.`);
                return;
            }
        }

        const formData = new FormData();
        Object.entries(bookingDetails).forEach(([key, value]) => {
            formData.append(key, value);
        });

        axios
            .post(`${API_BASE_URL}/bookings/${role}/${academyId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((response) => {
                alert('Booking created successfully!');
                navigate(`/AcademyDetails/${role}/${academyId}/Asset`);
            })
            .catch((error) => {
                console.error('Error creating booking:', error);
                setError('Failed to create booking.');
            });
    };




    return (
        <div>
            <div className='nav'>
                <nav className='nav'>
                    <h1 className='logo'>Pro Sports Manager</h1>
                </nav>
            </div>
            <div className='below-navbar'>
                <div className="new-booking-container">
                    <h1 className='heading'>New Booking</h1>
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
                            
                            <div style={{ display: 'flex',flexDirection:'row', alignItems: 'center' }}>
                            <label>Time:</label>
                                <input
                                    type="time"
                                    value={bookingDetails.time.split(' - ')[0]} // Extract start time
                                    onChange={(e) => handleTimeChange(e, 'start')}
                                    style={{ marginRight: '5px' ,width:'20%'}}
                                />
                                <span>-</span>
                                <input
                                    type="time"
                                    value={bookingDetails.time.split(' - ')[1]} // Extract end time
                                    onChange={(e) => handleTimeChange(e, 'end')}
                                    style={{ marginLeft: '5px',width:'20%' }}
                                />
                            </div>
                        </div>
                        <div>
                            <label>Amount (per person):</label>
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
                            <label>Address :</label>
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
                                type="file"
                                accept="image/*"
                                onChange={(e) => setBookingDetails((prevState) => ({
                                    ...prevState,
                                    image: e.target.files[0], // Store the selected file
                                }))}
                            />
                        </div>
                        <div>
                            <label>About this Ground:</label>
                            <input
                                type="text"
                                name="about"
                                value={bookingDetails.about}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit">Create Booking</button>
                    </form>
                    {/* <button onClick={() => navigate(`/ManagePayment/${role}/${academyId}/Bookings`)}>Back to Bookings</button> */}
                </div>
            </div>
            <About />
        </div>
    );
};

export default NewBooking;
