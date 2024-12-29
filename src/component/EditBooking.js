import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditBooking = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL  ;
    
    const { academyId, role,id } = useParams(); // Get booking ID from URL
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
    }, [API_BASE_URL ,id]);

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
            <h1>Edit Booking</h1>
            <form onSubmit={handleSubmit}>
                <label>Name: <input type="text" name="name" value={formData.name} onChange={handleChange} /></label>
                <label>Date of Booking: <input type="date" name="date_of_booking" value={formData.date_of_booking} onChange={handleChange} /></label>
                <label>Time: <input type="time" name="time" value={formData.time} onChange={handleChange} /></label>
                <label>Amount: <input type="number" step="0.01" name="amount" value={formData.amount} onChange={handleChange} /></label>
                <label>Customer Name: <input type="text" name="customer_name" value={formData.customer_name} onChange={handleChange} /></label>
                <label>Contact: <input type="text" name="contact" value={formData.contact} onChange={handleChange} /></label>
                <label>Status: 
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                    </select>
                </label>
                <label>Remarks: <textarea name="remarks" value={formData.remarks} onChange={handleChange}></textarea></label>
                <button type="submit">Update Booking</button>
                <Link to={`/ManagePayment/${role}/${academyId}/Bookings`}><button >Back</button></Link>
            </form>
        </div>
    );
};

export default EditBooking;
