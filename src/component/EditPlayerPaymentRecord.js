import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import About from './About';

const EditPlayerPaymentRecord = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const {role, academyId,  id } = useParams(); // Fetch params from URL
    const navigate = useNavigate();

    // Initial state for form data
    const [formData, setFormData] = useState({
        player_id: '',
        player_name: '',
        total_fee: '',
        paid_amount: '',
        due_amount: '',
        due_date:'',
        status: '',
        remarks: '',
    });

    const [loading, setLoading] = useState(true); // For conditional rendering
    const [error, setError] = useState(null); // For error handling


    // fetch financial data from id 
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${API_BASE_URL}/api/edit-financial-records/${id}`,{ withCredentials: true })
            .then((response) => {
                // console.log("Fetched data:", response.data);
                if (response.data && response.data.length > 0) {
                    setFormData(response.data[0]); // Set the first item directly as an object
                } else {
                    setError('No data found for the given player financial ID.');
                }
                setLoading(false); // Stop loading when data is fetched
            })
            .catch((err) => {
                console.error('Error fetching player payment record:', err);
                setError('Failed to fetch player financial data. Please try again.');
                setLoading(false);
            });
    }, [API_BASE_URL , id]);    

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (!id) {
            alert("Please correct a payment id.");
            return;
          }
        // Update `due_amount` dynamically if total_fee or paid_amount changes
        if (name === 'total_fee' || name === 'paid_amount') {
            const updatedFormData = {
                ...formData,
                [name]: value,
            };
            updatedFormData.due_amount =
                parseFloat(updatedFormData.total_fee || 0) -
                parseFloat(updatedFormData.paid_amount || 0);
            setFormData(updatedFormData);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

      // Format the date before rendering in the input field
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     // Manually format the date in the local format (YYYY-MM-DD)
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     // Return the formatted date as 'YYYY-MM-DD'
//     return `${year}-${month}-${day}`;
//   };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`${API_BASE_URL}/api/edit-player-payment-record/${id}`, formData ,{ withCredentials: true })
            .then(() => {
                alert('Player payment record updated successfully!');
                navigate(`/AcademyDetails/${role}/${academyId}/ManagePayment`); // Redirect on success
            })
            .catch((err) => {
                console.error('Error updating player payment record:', err);
                alert('Failed to update the record. Please try again.');
            });
    };

    if (loading) {
        return <div>Loading...</div>; // Display a loading indicator while data is fetched
    }

    if (error) {
        return <div>{error}</div>; // Display error message if data fetch fails
    }

    return (
        <div>
            <div className='nav'>
                <p className='logo'>Pro Sports Manager</p>
            </div>
        <div className='below-navbar'>
            <h1 className='heading'>Edit Player Payment Record</h1>
            <form  onSubmit={handleSubmit}>
                <label>
                    Player ID:
                    <input
                        type="text"
                        value={formData.player_id}
                        readOnly
                    />
                </label>
                <label>
                    Player Name:
                    <input
                        type="text"
                        name="player_name"
                        value={formData.player_name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Total Fee:
                    <input
                        type="number"
                        name="total_fee"
                        value={formData.total_fee}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Paid Amount:
                    <input
                        type="number"
                        name="paid_amount"
                        value={formData.paid_amount}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Due Amount:
                    <input
                        type="number"
                        name="due_amount"
                        value={formData.due_amount}
                        readOnly
                    />
                </label>
                <label>
                    Due Date:
                    <input
                        type="date"
                        name="due_date"
                        value={formData.due_date}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Status:
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="paid">Paid</option>
                        <option value="not paid">Not Paid</option>
                        <option value="pending">Pending</option>
                    </select>
                </label>
                <label>
                    Remarks:
                    <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                    ></textarea>
                </label>
                <button type="submit">Update Record</button>
                <Link to={`/AcademyDetails/${role}/${academyId}/ManagePayment`}>
                    <button type="button">Back</button>
                </Link>
            </form>
        </div>
        <About />
        </div>
    );
};

export default EditPlayerPaymentRecord;
