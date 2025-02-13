import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import {useLocation} from 'react-router-dom';
import axios from "axios";
// import FinancialSummary from "./FinancialSummary";
import './Style.css';
import { styles } from "./Style";
import About from "./About";
// import { Button, Card, CardContent, Input, Label, Select, SelectItem } from "@/components/ui";

const ManagePayment = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const navigate = useNavigate();

    // const location = useLocation();
    // const { coachId } = location.state || {};
    // console.log(coachId);

    const { role, academyId } = useParams();

    const [searchParams, setSearchParams] = useState({
        fromDate: "",
        toDate: "",
        playerId: "",
        playerName: "",
    });
    const [records, setRecords] = useState([]);
    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // Fetch all records on component mount
    useEffect(() => {
        const fetchAllRecords = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/financial-records/${academyId}`,{ withCredentials: true });
                setRecords(response.data);
            } catch (error) {
                console.error("Error fetching all records:", error);
            }
        };

        fetchAllRecords();
    }, [API_BASE_URL, academyId]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/financial-records`, {
                params: {
                    from: searchParams.fromDate,
                    to: searchParams.toDate,
                },
            }, { withCredentials: true } );
            setRecords(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleQuickSearch = async (filter) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/financial-records/${filter}/${academyId}`,{ withCredentials: true });
            setRecords(response.data);
        } catch (error) {
            console.error("Error fetching quick search data:", error);
        }
    };

    const handlePlayerSearch = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/financial-records/player/${academyId}`, {
                params: {
                    playerId: searchParams.playerId,
                    playerName: searchParams.playerName,
                },
            },
                { withCredentials: true }
            );
            setRecords(response.data);
        } catch (error) {
            console.error("Error searching by player:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({ ...prev, [name]: value }));
    };
    const handleRefresh = () => {
        window.location.reload(); // Reloads the page
    };

    const handleEditPayment = (role, academyId, id) => {
        navigate(`/edit-player-record/${role}/${academyId}/${id}`); // Adjust path as needed
    };

    // Delete Player payment info handler with confirmation
    const deletePaymentData = (id) => {
        const firstConfirm = window.confirm('Are you sure you want to delete this player Payment info..?');
        if (firstConfirm) {
            const secondConfirm = window.confirm('Do you really want to delete?');
            if (secondConfirm) {
                axios
                    .delete(`${API_BASE_URL}/api/delete-player-payment-info/${id}`, { withCredentials: true })
                    .then(() => {
                        // Update the bookings list after successful deletion
                        setRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));
                        alert('Player payment Record deleted successfully!');
                    })
                    .catch((error) => {
                        console.error('Error deleting player payment record:', error);
                        alert('Failed to delete player payment record.');
                    });
            }
        }
    };
    return (
        <div className="body">

            <nav className='nav'>
                <h1 className='logo'>Pro Sports Manager</h1>
                {/* {(role === "admin" || role === "academy") &&
                    <Link to={`/AcademyDetails/${role}/${academyId}`}>
                        <button style={{ background: "rgb(14, 56, 27)", float: "right" }}>Back</button>
                    </Link>
                } */}
            </nav>
            <div className="below-navbar">
                {/* {
                    (role === 'academy' || role === 'admin') && (
                        <div>
                            <div style={{ background: 'white' }}>
                                <h2 className="heading" style={{ display: "inline" }}>Manage Payment</h2>



                            </div>
                            <div style={{ background: 'blue', height: '2px', marginTop: "12px", marginBottom: '12px' }}></div>
                            <FinancialSummary academyId={academyId} role={role} />
                            <div style={{ marginTop: "12px", marginBottom: '12px', height: "2px", background: "black" }}></div>
                        </div>
                    )
                } */}




                <h2>Player Payment Record</h2>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', gap: '10px' }}>


                    {/* search ways  */}
                    <div className="managepayment-search-main">
                        {/* <div> */}
                        {/* Date Filters */}
                        <div className="search-box-managepayment" id="search-by-date">
                            <label style={{ display: 'flex', flexDirection: 'row' }}>
                                From: {" "}
                                <input
                                    type="date"
                                    name="fromDate"
                                    value={searchParams.fromDate}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label style={{ marginLeft: "10px", display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
                                To: {" "}
                                <input
                                    type="date"
                                    name="toDate"
                                    value={searchParams.toDate}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
                                Search
                            </button>
                        </div>

                        {/* <div style={{ width: '4px', height: '100%', background: 'black' }}></div> */}

                        {/* Search by Player */}
                        <div className="search-box-managepayment" id="search-by-player-id-name">
                            <label style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                Player ID: {" "}
                                <input
                                    type="text"
                                    name="playerId"
                                    value={searchParams.playerId}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label style={{ marginLeft: "10px", display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                Player Name: {" "}
                                <input
                                    type="text"
                                    name="playerName"
                                    value={searchParams.playerName}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <button onClick={handlePlayerSearch} style={{ marginLeft: "10px", alignSelf: 'center' }}>
                                Search Player
                            </button>
                        </div>
                        {/* </div> */}
                        {/* Quick Filters */}
                        <div className="search-by-year-month">
                            <button style={styles.quickSearch} onClick={() => handleQuickSearch("week")}>This Week</button>
                            <button style={styles.quickSearch} onClick={() => handleQuickSearch("month")} >
                                This Month
                            </button>
                            <button style={styles.quickSearch} onClick={() => handleQuickSearch("year")} >
                                This Year
                            </button>
                            <button style={styles.quickSearch} onClick={handleRefresh}>All Payments</button>
                            <button style={styles.quickSearch} onClick={() => handleQuickSearch("pending")}>Pending Records</button>

                        </div>
                    </div>
                    {/* Results Table */}
                    <div className="table-wrapper">
                        <table
                            className="table-main"
                        >
                            <thead>
                                <tr style={{ background: "#f4f4f4", textAlign: "left" }}>
                                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>Actions</th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>Player ID</th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>Player Name</th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>Total Fee</th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>Paid Amount</th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>Due Amount</th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>Due Date</th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>Status</th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>Remarks</th>

                                </tr>
                            </thead>
                            <tbody>
                                {records.length > 0 ? (
                                    records.map((record) => (
                                        <tr key={record.id}>
                                            <td>
                                                <button onClick={() => handleEditPayment(role, academyId, record.id)}><b>Edit </b> {record.player_id}</button>
                                                {/* <button onClick={() => deletePaymentData(record.id)}>Delete</button> */}
                                            </td>
                                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{record.player_id}</td>
                                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{record.player_name}</td>
                                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{record.total_fee}</td>
                                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{record.paid_amount}</td>
                                            <td style={{
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                color: record.due_amount === 0 ? "green" : "orange",
                                                // Ensure text is visible
                                                fontWeight: "bold", // Make text stand out
                                                textAlign: "center" // Center text
                                            }}>{record.due_amount}</td>
                                            {/* <td style={{ padding: "8px", border: "1px solid #ddd" }}>{record.due_date}</td> */}
                                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                                                {new Date(record.due_date).toLocaleDateString()}
                                            </td>

                                            <td
                                                style={{
                                                    padding: "8px",
                                                    border: "1px solid #ddd",
                                                    backgroundColor: record.status === "paid" ? "green" : "orange",
                                                    color: "white", // Ensure text is visible
                                                    fontWeight: "bold", // Make text stand out
                                                    textAlign: "center" // Center text
                                                }}
                                            >
                                                {record.status}
                                            </td>

                                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{record.remarks}</td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" style={{ padding: "8px", border: "1px solid #ddd", textAlign: "center" }}>
                                            No Records Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <About />
        </div>
    );
};

export default ManagePayment;
