
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const PlayerFinancialForm = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const { role, academyId, id, name , fee } = useParams();
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
            const response = await axios.post(`${API_BASE_URL}/api/playerFinancial`, formData);
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
    );
};

export default PlayerFinancialForm;



// import React, { useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import About from "./About";

// const PlayerFinancialForm = () => {
//     // API Base URL from environment variable
//     const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
//     const navigate = useNavigate();
//     const { role, academyId, id, name } = useParams();

//     // State to manage form data
//     const [formData, setFormData] = useState({
//         player_id: id,
//         player_name: name,
//         total_fee: "",
//         paid_amount: "",
//         due_amount: "0.00",
//         due_date: "",
//         status: "pending",
//         remarks: "",
//         academy_id: academyId,
//     });

//     // Handle input change and dynamically update form data
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         let updatedValue = value;

//         // Format fee fields to 2 decimal places
//         if (["total_fee", "paid_amount"].includes(name)) {
//             updatedValue = parseFloat(value || 0).toFixed(2);
//         }

//         setFormData((prevState) => {
//             const totalFee = parseFloat(name === "total_fee" ? updatedValue : prevState.total_fee || 0);
//             const paidAmount = parseFloat(name === "paid_amount" ? updatedValue : prevState.paid_amount || 0);

//             return {
//                 ...prevState,
//                 [name]: updatedValue,
//                 due_amount: (totalFee - paidAmount).toFixed(2), // Dynamically update due_amount
//             };
//         });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Check for required fields
//         if (!formData.total_fee || !formData.paid_amount || !formData.due_date) {
//             alert("Please fill in all required fields.");
//             return;
//         }

//         const updatedFormData = {
//             ...formData,
//             due_amount: (parseFloat(formData.total_fee) - parseFloat(formData.paid_amount)).toFixed(2),
//         };

//         console.log("Submitting Form Data:", updatedFormData);

//         try {
//             // Send POST request to API
//             await axios.post(`${API_BASE_URL}/api/player-financial`, updatedFormData);
//             alert("Data added successfully!");
//             navigate(`/AcademyDetails/${role}/${academyId}/ManagePayment`);
//         } catch (error) {
//             console.error("Error adding data:", error.response || error);
//             alert("An error occurred while submitting the form. Please try again.");
//         }
//     };

//     return (
//         <div>
//             {/* Navbar */}
//             <div className="nav">
//                 <p className="logo">Pro Sports Manager</p>
//             </div>

//             {/* Main Content */}
//             <div className="below-navbar">
//                 <h2>Player Financial Form</h2>
//                 <form onSubmit={handleSubmit}>
//                     <label>Player Id: {id}</label>
//                     <br />
//                     <label>Player Name: {name}</label>
//                     <br />
//                     <label>
//                         Total Fee:
//                         <input type="number" name="total_fee" value={formData.total_fee} onChange={handleChange} required />
//                     </label>
//                     <br />
//                     <label>
//                         Paid Amount:
//                         <input type="number" name="paid_amount" value={formData.paid_amount} onChange={handleChange} required />
//                     </label>
//                     <br />
//                     <label>Due Amount: {formData.due_amount}</label>
//                     <br />
//                     <label>
//                         Due Date:
//                         <input type="date" name="due_date"  value={formData.due_date} onChange={handleChange} required />
//                     </label>
//                     <br />
//                     <label>
//                         Status:
//                         <select name="status" value={formData.status}  onChange={handleChange} >
//                             <option value="paid">paid</option>
//                             <option value="not_paid">not_paid</option>
//                             <option value="pending">pending</option>
//                         </select>
//                     </label>
//                     <br />
//                     <label>
//                         Remarks:
//                         <textarea
//                             name="remarks"
//                             value={formData.remarks}
//                             onChange={handleChange}
//                         />
//                     </label>
//                     <br />
//                     <button type="submit">Submit</button>
//                 </form>
//             </div>

//             {/* Footer or Additional Component */}
//             <About />
//         </div>
//     );
// };

// export default PlayerFinancialForm;
