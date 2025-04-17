import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import {useLocation} from 'react-router-dom';
import axios from "axios";
// import FinancialSummary from "./FinancialSummary";
import './Style.css';
import About from "./About";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "./Images/logo.png";
import searchpng from "./Images/search.png";
import AcademyNavbar from './AcademyNavbar.js';

// import { Button, Card, CardContent, Input, Label, Select, SelectItem } from "@/components/ui";

const ManagePayment = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const navigate = useNavigate();

    // const location = useLocation();
    // const { coachId } = location.state || {};
    // console.log(coachId);

    const { role, academyId } = useParams();
    // console.log(role, academyId);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const [searchParams, setSearchParams] = useState({
        fromDate: "",
        toDate: "",
        playerId: "",
        playerName: "",
    });
    const [records, setRecords] = useState([]);
    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // Fetch all records on component mount
    const fetchAllRecords = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/financial-records/${academyId}`, { withCredentials: true });
            setRecords(response.data);
        } catch (error) {
            console.error("Error fetching all records:", error);
        }
    };
    useEffect(() => {
        fetchAllRecords();
    }, [API_BASE_URL, academyId]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/financial-records/date-filter/${academyId}`, {
                params: {
                    from: searchParams.fromDate,
                    to: searchParams.toDate,
                }, withCredentials: true
            });
            setRecords(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleQuickSearch = async (filter) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/financial-records/${filter}/${academyId}`, { withCredentials: true });
            setRecords(response.data);
        } catch (error) {
            console.error("Error fetching quick search data:", error);
        }
    };

    const handlePlayerSearch = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/financial-records/player/${academyId}`, {
                params: { query: searchParams.searchQuery },
                withCredentials: true // Send single query param
            });

            setRecords(response.data);
        } catch (error) {
            console.error("Error searching by player:", error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({ ...prev, [name]: value.toLowerCase() }));
    };

    const handleRefresh = () => {
        fetchAllRecords();
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

    // Function to download payment details as CSV
    const downloadCSV = () => {
        if (records.length === 0) {
            alert("No records available to download.");
            return;
        }

        const headers = [
            "Player ID,Player Name,Total Fee,Paid Amount,Due Amount,Due Date,Status,Remarks"
        ];

        const rows = records.map(record =>
            `${record.player_id},${record.player_name},${record.total_fee},${record.paid_amount},${record.due_amount},${new Date(record.due_date).toLocaleDateString()},${record.status},${record.remarks}`
        );

        const csvContent = [headers, ...rows].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "Payment_Report.csv");
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Add logo
        const imgWidth = 30;
        const imgHeight = 30;
        doc.addImage(logo, "PNG", 10, 10, imgWidth, imgHeight);

        // Add title
        doc.setFontSize(16);
        doc.text("Pro Sports Manager - Payment Report", 60, 20);

        // Define table headers and data
        const headers = [
            ["Player ID", "Player Name", "Total Fee", "Paid Amount", "Due Amount", "Due Date", "Status", "Remarks"]
        ];
        const data = records.map(record => [
            record.player_id,
            record.player_name,
            record.total_fee,
            record.paid_amount,
            record.due_amount,
            new Date(record.due_date).toLocaleDateString(),
            record.status,
            record.remarks
        ]);

        // Add table using autoTable
        autoTable(doc, {
            head: headers,
            body: data,
            startY: 30,
            theme: "grid",
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: [0, 122, 204], textColor: [255, 255, 255] }, // Blue header with white text
            alternateRowStyles: { fillColor: [240, 240, 240] } // Light gray alternate rows
        });

        doc.save("payment_report.pdf");
    };

    const handleSort = (column) => {
        let order = "asc";
        if (sortColumn === column && sortOrder === "asc") {
            order = "desc"; // Toggle order
        }
        setSortColumn(column);
        setSortOrder(order);

        // Sorting logic
        const sortedRecords = [...records].sort((a, b) => {
            let aValue = a[column];
            let bValue = b[column];

            // Handle case where values might be strings (like player_name)
            if (typeof aValue === "string" && typeof bValue === "string") {
                return order === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }

            // Handle case where values are numbers
            return order === "asc" ? aValue - bValue : bValue - aValue;
        });

        setRecords(sortedRecords);
    };
    const handleRowClick = (academyId, playerId) => {
        // Navigate to the player payment history page with the academy_id and player_id as state
        navigate('/player-payments-history', {
            state: { academyId, playerId }
        });
    };
    return (
        <div >

            <AcademyNavbar role={role} academyId={academyId} /> {/* Pass academyId to the Navbar */}
            <div className="below-navbar">

                <h2>Player Payment Record</h2>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', gap: '10px' }}>

                    {/* search ways  */}
                    <div className="managepayment-search-main">
                        {/* <div> */}
                        {/* Date Filters */}
                        <div className="search-box-managepayment" id="search-by-date">
                            <div className="date-filter-style">
                                <label style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
                                    From: {" "}

                                </label><input
                                    type="date"
                                    name="fromDate"
                                    value={searchParams.fromDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="date-filter-style">
                                <label style={{ marginLeft: "10px", display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
                                    To: {" "} </label>
                                <input
                                    type="date"
                                    name="toDate"
                                    value={searchParams.toDate}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <button onClick={handleSearch} className="search-btn">
                                <img src={searchpng} alt="Search" className="search-icon" />
                            </button>
                        </div>


                        {/* search player by id or name  */}
                        <div className="search-box-managepayment" id="search-by-player">
                            <div className="date-filter-style">
                                <label style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                    Search Player: {" "} </label>

                                <input type="text" name="searchQuery"
                                    value={searchParams.searchQuery}
                                    onChange={handleInputChange}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handlePlayerSearch(); // Trigger search on Enter key
                                        }
                                    }}
                                    placeholder="Enter Player ID or Name"
                                />

                                <button onClick={handlePlayerSearch} className="search-btn">
                                    <img src={searchpng} alt="Search" className="search-icon" />
                                </button>

                            </div>
                        </div>

                        {/* </div> */}
                        {/* Quick Filters */}

                    </div>
                    {/* Results Table */}
                    <div className="table-wrapper">
                        {/* Download Button */}
                        <div className="payment-quick-filter-main">
                            <div className="download-btn-main">
                                <button onClick={handleDownloadPDF} className="download-btn">Download as PDF</button>
                                <button
                                    onClick={downloadCSV}
                                    className="download-btn"
                                >
                                    Download as CSV
                                </button>
                            </div>
                            <div className="search-by-year-month">
                                <button className="quick-search-btn" onClick={() => handleQuickSearch("month")}>Month</button>
                                <button className="quick-search-btn" onClick={() => handleQuickSearch("quarter")}>Quarter</button>
                                <button className="quick-search-btn" onClick={() => handleQuickSearch("year")}>Year</button>
                                <button className="quick-search-btn" onClick={() => handleQuickSearch("pending")}>Pending Records</button>
                                <p className="quick-search-btn tooltip" onClick={handleRefresh}>🔄<span className="tooltip-text">Reset</span></p>
                            </div>

                        </div>


                        {/* <table>
                            <thead>
                                <tr style={{ background: "#f4f4f4", textAlign: "left" }}>
                                    <th style={{ padding: "8px", border: "1px solid #ddd", cursor: "pointer" }} onClick={() => handleSort("player_id")}>
                                        Player ID {sortColumn === "player_id" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                    </th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd", cursor: "pointer" }} onClick={() => handleSort("player_name")}>
                                        Player Name {sortColumn === "player_name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                    </th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd", cursor: "pointer" }} onClick={() => handleSort("total_fee")}>
                                        Total Fee {sortColumn === "total_fee" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                    </th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd", cursor: "pointer" }} onClick={() => handleSort("paid_amount")}>
                                        Paid Amount {sortColumn === "paid_amount" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                    </th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd", cursor: "pointer" }} onClick={() => handleSort("due_amount")}>
                                        Due Amount {sortColumn === "due_amount" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                    </th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd", cursor: "pointer" }} onClick={() => handleSort("due_date")}>
                                        Due Date {sortColumn === "due_date" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                    </th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd", cursor: "pointer" }} onClick={() => handleSort("status")}>
                                        Status {sortColumn === "status" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                    </th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>Remarks</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {records.length > 0 ? (
                                    records.map((record) => (
                                        <tr key={record.id}>
                                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{record.player_id.toUpperCase()}</td>
                                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{record.player_name}</td>
                                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{record.total_fee}</td>
                                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{record.paid_amount}</td>
                                            <td style={{
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                color: record.due_amount === 0 ? "green" : "orange",
                                                fontWeight: "bold",
                                                textAlign: "center"
                                            }}>{record.due_amount}</td>
                                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                                                {new Date(record.due_date).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric"
                                                })}
                                            </td>
                                            <td
                                                style={{
                                                    padding: "8px",
                                                    border: "1px solid #ddd",
                                                    backgroundColor: record.status === "paid" ? "green" : "orange",
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    textAlign: "center"
                                                }}
                                            >
                                                {record.status}
                                            </td>
                                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{record.remarks}</td>
                                           
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" style={{ padding: "8px", border: "1px solid #ddd", textAlign: "center" }}>
                                            No Records Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table> */}
                        <table>
                            <thead>
                                <tr style={{ background: "#f4f4f4", textAlign: "left" }}>
                                    <th style={{ padding: "8px", border: "1px solid #ddd", cursor: "pointer" }} onClick={() => handleSort("player_id")}>
                                        Player ID {sortColumn === "player_id" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                    </th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd", cursor: "pointer" }} onClick={() => handleSort("player_name")}>
                                        Player Name {sortColumn === "player_name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                    </th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd", cursor: "pointer" }} onClick={() => handleSort("total_fee")}>
                                        Total Fee {sortColumn === "total_fee" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                    </th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd", cursor: "pointer" }} onClick={() => handleSort("paid_amount")}>
                                        Paid Amount {sortColumn === "paid_amount" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                    </th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd", cursor: "pointer" }} onClick={() => handleSort("due_amount")}>
                                        Due Amount {sortColumn === "due_amount" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                    </th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd", cursor: "pointer" }} onClick={() => handleSort("due_date")}>
                                        Due Date {sortColumn === "due_date" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                    </th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd", cursor: "pointer" }} onClick={() => handleSort("status")}>
                                        Status {sortColumn === "status" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                    </th>
                                    <th style={{ padding: "8px", border: "1px solid #ddd" }}>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.length > 0 ? (
                                    records.map((record) => (
                                        <tr
                                            key={record.id}
                                            onClick={() => handleRowClick(record.academy_id, record.player_id)} // Add onClick event to the row
                                            style={{ cursor: "pointer" }} // Make the row clickable
                                        >
                                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{record.player_id.toUpperCase()}</td>
                                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{record.player_name}</td>
                                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{record.total_fee}</td>
                                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{record.paid_amount}</td>
                                            <td
                                                style={{
                                                    padding: "8px",
                                                    border: "1px solid #ddd",
                                                    color: record.due_amount === 0 ? "green" : "orange",
                                                    fontWeight: "bold",
                                                    textAlign: "center"
                                                }}
                                            >
                                                {record.due_amount}
                                            </td>
                                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                                                {new Date(record.due_date).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric"
                                                })}
                                            </td>
                                            <td
                                                style={{
                                                    padding: "8px",
                                                    border: "1px solid #ddd",
                                                    backgroundColor: record.status === "paid" ? "green" : "orange",
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    textAlign: "center"
                                                }}
                                            >
                                                {record.status}
                                            </td>
                                            <td style={{ padding: "8px", border: "1px solid #ddd" }}>{record.remarks}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" style={{ padding: "8px", border: "1px solid #ddd", textAlign: "center" }}>
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
