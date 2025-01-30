import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditBooking = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const { academyId, role, id } = useParams(); // Get booking ID from URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        date_of_booking: '',
        time: '',
        amount: '',
        customer_name: '',
        contact: '',
        status: '',
        remarks: '',
    });

    // Fetch booking details
    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/bookings/${id}`)
            .then((response) => {
                setFormData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching booking details:', error);
            });
    }, [API_BASE_URL, id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`${API_BASE_URL}/bookings/${id}`, formData)
            .then(() => {
                alert('Booking updated successfully!');
                navigate(`/ManagePayment/${role}/${academyId}/Bookings`); // Redirect after updating
            })
            .catch((error) => {
                console.error('Error updating booking:', error);
            });
    };

    return (
        <div>
            <div className='nav'>
                <p className='logo'>Pro Sports Manager</p>
            </div>
            <div className='below-navbar'>
                <h2>Edit Booking</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <label>Name: </label><input type="text" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Date of Booking: </label><input type="date" name="date_of_booking" value={formData.date_of_booking} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Time: </label><input type="time" name="time" value={formData.time} onChange={handleChange} />
                        </div><div>
                            <label>Amount: </label><input type="number" step="0.01" name="amount" value={formData.amount} onChange={handleChange} /></div>
                        <div>
                            <label>Customer Name: </label><input type="text" name="customer_name" value={formData.customer_name} onChange={handleChange} /></div>
                        <div>
                            <label>Contact:</label> <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
                        </div>
                        <div id="radio-edit-booking" onChange={handleChange} style={{ display: "flex", flexWrap: 'nowrap', gap: "10px", alignItems: "center" }}>
                            <label>Status:</label>
                            <input type="radio" name="status" value="confirmed" checked={formData.status === "confirmed"} style={{ transform: "scale(0.8)" }} />
                            Confirmed
                            <input type="radio" name="status" value="pending" checked={formData.status === "pending"} style={{ transform: "scale(0.8)" }} />
                            Pending
                        </div>
                        <div>
                            <label>Remarks: </label><textarea name="remarks" value={formData.remarks} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <button type="submit">Update Booking</button>
                    <Link to={`/ManagePayment/${role}/${academyId}/Bookings`}><button >Back</button></Link>

                </form>
            </div>
        </div>
    );
};

export default EditBooking;
