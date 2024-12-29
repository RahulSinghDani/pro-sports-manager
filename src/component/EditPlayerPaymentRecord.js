import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditPlayerPaymentRecord = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL  ;
    
    const {academyId, role, id } = useParams(); // Get booking ID from URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        player_id: '',
        player_name:'',
        total_fee:'',
        paid_amount:'',
        due_amount:'',
        remarks :'',
    });

    // Fetch booking details
    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/api/fetch-player-payment-record/${id}`)
            .then((response) => {
                setFormData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching player record details:', error);
            });
    }, [API_BASE_URL,id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`${API_BASE_URL}/api/edit-player-payment-record/${id}`, formData)
            .then(() => {
                alert('Player Payment record updated successfully!');
                navigate(`/AcademyDetails/${role}/${academyId}/ManagePayment`); // Redirect after updating
            })
            .catch((error) => {
                console.error('Error updating Player Payment record:', error);
            });
    };

    return (
        <div>
            <h1>Edit Player Payment Record</h1>
            <form onSubmit={handleSubmit}>
            <label>Player Id: <input type="text" name="player_id" value={formData.player_id} onChange={handleChange} /></label>
            <label>Player Name: <input type="text" name="player_name" value={formData.player_name} onChange={handleChange} /></label>
            <label>Total Fee: <input type="number" name="total_fee" value={formData.total_fee} onChange={handleChange} /></label>
            <label>Paid Amount: <input type="number" name="paid_amount" value={formData.paid_amount} onChange={handleChange} /></label>
            <label>Due Amount: <input type="text" name="due_amount" value={formData.due_amount} onChange={handleChange} /></label>
            {/* <label>Status: <input type="text" name="status" value={formData.status} onChange={handleChange} /></label>
            <label>Remarks: <input type="text" name="remarks" value={formData.remarks} onChange={handleChange} /></label> */}
                <label>Status: 
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                    </select>
                </label>
                <label>Remarks: <textarea name="remarks" value={formData.remarks} onChange={handleChange}></textarea></label>
                <button type="submit">Update Record</button>
                <Link to={`/AcademyDetails/${role}/${academyId}/ManagePayment`}><button >Back</button></Link>
            </form>
        </div>
    );
};

export default EditPlayerPaymentRecord;