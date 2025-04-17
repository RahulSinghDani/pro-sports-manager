import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import About from "./About";
import LogoIcon from './Images/PSM-logo1.ico';

const PlayerFinancialForm = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const { role, academyId, id, name, fee } = useParams();
    const [originalDueAmount, setOriginalDueAmount] = useState(0);

    const [formData, setFormData] = useState({
        player_id: id || "",
        player_name: name || "",
        total_fee: fee,
        paid_amount: "0",
        due_amount: "0",
        due_date: "",
        status: "",
        remarks: "",
        academy_id: academyId || "",
    });

    const [message, setMessage] = useState("");

    const fetchPlayerRecord = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/financial-records/${academyId}/${id}`, { withCredentials: true });

            // Ensure you get an array of records, not just one
            const records = Array.isArray(response.data) ? response.data : [response.data];

            const totalPaidAmount = records.reduce((sum, record) => sum + parseFloat(record.paid_amount || 0), 0);
            const totalFee = parseFloat(fee || "0");
            const calculatedDueAmount = totalFee - totalPaidAmount;

            setOriginalDueAmount(calculatedDueAmount);

            setFormData(prevData => ({
                ...prevData,
                paid_amount: "0",
                due_amount: calculatedDueAmount.toFixed(2),
                due_date: records[0]?.due_date ? new Date(records[0].due_date).toISOString().split("T")[0] : "",
                status: calculatedDueAmount === 0 ? "paid" : "pending",
                remarks: calculatedDueAmount === 0 ? "Fully paid" : "Pending payment"
            }));
        } catch (error) {
            console.error("Error fetching player payment record:", error);
            const totalFee = parseFloat(fee || "0");
            setOriginalDueAmount(totalFee);
            setFormData(prevData => ({
                ...prevData,
                paid_amount: "0",
                due_amount: totalFee.toFixed(2),
                status: "pending",
                remarks: "Pending payment"
            }));
        }
    };

    useEffect(() => {
        if (id) {
            fetchPlayerRecord();
        }
    }, [API_BASE_URL, academyId, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "paid_amount") {
            let inputValue = value.trim() === "" ? 0 : parseFloat(value) || 0; // Handle empty input

            const lastPaidAmount = parseFloat(formData.paid_amount || "0");
            const lastDueAmount = parseFloat(formData.due_amount || 0) + lastPaidAmount; // Restore original due before calculation

            if (inputValue > lastDueAmount) {
                alert("Paid amount cannot be greater than the due amount.");
                return;
            }

            const newDueAmount = lastDueAmount - inputValue;

            setFormData(prevData => ({
                ...prevData,
                paid_amount: value, // Keep original input for UI
                due_amount: newDueAmount.toFixed(2),
                status: newDueAmount === 0 ? "paid" : "pending",
                remarks: newDueAmount === 0 ? "Fully paid" : "Pending payment",
            }));
        }
        else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.total_fee || !formData.paid_amount || !formData.status || !formData.due_date) {
            alert("Please fill in all required fields.");
            return;
        }
        try {
            await axios.post(`${API_BASE_URL}/api/playerFinancial`, formData, { withCredentials: true });
            alert("Data added successfully!");
            navigate(`/AcademyDetails/${role}/${academyId}/Player`);
        } catch (error) {
            console.error("Error adding data:", error.response || error);
            alert("An error occurred while submitting the form. Please try again.");
        }
    };

    return (
        <div>
            <div className='nav'>
                <div className='logo-container'>
                    <Link to={`/AcademyDetails/${role}/${academyId}`}><img style={{ width: '50px', borderRadius: '50%' }} src={LogoIcon} alt='logo' /></Link>
                    <Link to={`/AcademyDetails/${role}/${academyId}`} className="logo" >Pro Sports Manager</Link>
                </div>
            </div>
            <div className="below-navbar" style={{ display: 'flex', margin: 'auto', flexDirection: 'column', alignItems: 'center' }}>
                <h3>Player Financial Form</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Player ID:</label>
                        <input type="text" value={formData.player_id} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Player Name:</label>
                        <input type="text" value={formData.player_name} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Total Fee:</label>
                        <input type="number" value={formData.total_fee} disabled />
                    </div>
                    <div className="form-group">
                        <label>Paid Amount:</label>
                        {/* <input type="number" name="paid_amount" onChange={handleChange} /> */}
                        <input
                            type="number"
                            name="paid_amount"
                            value={formData.paid_amount}
                            onChange={handleChange}
                            min="0"
                            max={originalDueAmount} // Limits input to due amount
                        />
                    </div>
                    <div className="form-group">
                        <label>Due Amount:</label>
                        <input type="number" value={formData.due_amount} disabled />
                    </div>
                    <div className="form-group">
                        <label>Due Date:</label>
                        <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} min={new Date().toISOString().split("T")[0]} />
                    </div>
                    <div className="form-group">
                        <label>Status:</label>
                        <select value={formData.status} disabled>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Remarks:</label>
                        <textarea name="remarks" value={formData.remarks} onChange={handleChange} ></textarea>
                    </div>
                    {/* <button type="submit">Submit</button> */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px' }}>
                        <Link to={`/AcademyDetails/${role}/${academyId}/Player`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <button className="back-btn">Back</button>
                        </Link>
                        <button
                            type="submit"
                            disabled={isNaN(formData.paid_amount) || parseFloat(formData.paid_amount) <= 0}
                            style={{
                                opacity: isNaN(formData.paid_amount) || parseFloat(formData.paid_amount) <= 0 ? 0.5 : 1,
                                cursor: isNaN(formData.paid_amount) || parseFloat(formData.paid_amount) <= 0 ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </form>
                {message && <p>{message}</p>}

            </div>
            <About />
        </div>
    );
};

export default PlayerFinancialForm;
