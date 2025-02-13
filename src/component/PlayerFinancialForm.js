
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import About from "./About";

const PlayerFinancialForm = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const { role, academyId, id, name, fee } = useParams();
    // console.log("fee: ",fee);
    // State for form data
    const [formData, setFormData] = useState({
        player_id: id || "",
        player_name: name || "",
        total_fee: fee,
        paid_amount: "",
        due_amount: "0",
        due_date: "",
        status: "",
        remarks: "",
        academy_id: academyId || "",
    });

    // State for submission message
    const [message, setMessage] = useState("");


    // Automatically update the due amount based on the total fee and paid amount
    useEffect(() => {
        const dueAmount = parseFloat(formData.total_fee || 0) - parseFloat(formData.paid_amount || 0);
        setFormData(prevData => ({
            ...prevData,
            due_amount: dueAmount.toFixed(2),
            status: dueAmount === 0 ? "paid" : "pending", // Update status based on due amount
            remarks: dueAmount === 0 ? "Fully paid" : "Pending payment",
        }));
    }, [formData.total_fee, formData.paid_amount]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.total_fee || !formData.paid_amount || !formData.status || !formData.due_date) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/api/playerFinancial`, formData, { withCredentials: true });
            if (response.status === 200) {
                alert("Data added successfully!"); // Alert comes first
                setMessage("Player financial details added successfully.");
                navigate(`/AcademyDetails/${role}/${academyId}/Player`);
            }
        } catch (error) {
            setMessage("Failed to add player financial details. Please try again.");
            console.error("Error adding data:", error.response || error);
            alert("An error occurred while submitting the form. Please try again.");
        }
    };


    return (
        <div>
            <div className="nav">
                <p className="logo">Pro Sports Manager</p>
            </div>
            <div className="below-navbar">
                <h2>Player Financial Form</h2>
                <form onSubmit={handleSubmit}>
                    {/* Player ID (read-only) */}
                    <div>
                        <label>Player ID:</label>
                        <input type="text" value={formData.player_id} readOnly />
                    </div>

                    {/* Player Name (read-only) */}
                    <div>
                        <label>Player Name:</label>
                        <input type="text" value={formData.player_name} readOnly />
                    </div>

                    {/* Total Fee */}
                    <div>
                        <label>Total Fee:</label>
                        <input
                            type="number"
                            name="total_fee"
                            value={formData.total_fee}
                            onChange={handleChange}
                            disabled
                        />
                    </div>

                    {/* Paid Amount */}
                    <div>
                        <label>Paid Amount:</label>
                        <input
                            type="number"
                            name="paid_amount"
                            value={formData.paid_amount}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Due Amount */}
                    <div>
                        <label>Due Amount:</label>
                        <input
                            type="number"
                            name="due_amount"
                            value={formData.due_amount}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Due Date */}
                    <div>
                        <label>Due Date:</label>
                        <input
                            type="date"
                            name="due_date"
                            value={formData.due_date}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label>Status:</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option>select status</option>
                            <option value="paid">paid</option>
                            <option value="pending">pending</option>
                        </select>
                    </div>

                    {/* Remarks */}
                    <div>
                        <label>Remarks:</label>
                        <textarea
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <button type="submit">Submit</button>
                </form>
                {message && <p>{message}</p>}
            </div>
            <About />
        </div>
    );
};

export default PlayerFinancialForm;