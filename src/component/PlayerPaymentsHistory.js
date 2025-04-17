import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
// import logo from "./Images/logo.png";
import logo from "./Images/PSM.jpg";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import autoTable from "jspdf-autotable";
import LogoIcon from './Images/PSM-logo1.ico';

const PlayerPaymentsHistory = () => {

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [payments, setPayments] = useState([]);
    const { role, academyId, playerId } = useLocation().state; // Get academyId and playerId from state

// console.log(role);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    //   console.log(academyId  , playerId);
    useEffect(() => {
        if (academyId && playerId) {
            axios.get(`${API_BASE_URL}/api/financial-records/payments-history/${academyId}/${playerId}`, {
                withCredentials: true
            })
                .then(response => {
                    setPayments(response.data);
                })
                .catch(error => {
                    console.error("Error fetching payments:", error);
                });
        }
    }, [academyId, playerId]);
    // Re-run the effect when academyId or playerId changes
    const handleSort = (column) => {
        let order = "asc";
        if (sortColumn === column && sortOrder === "asc") {
            order = "desc";
        }
        setSortColumn(column);
        setSortOrder(order);

        const sortedRecords = [...payments].sort((a, b) => {
            let aValue = a[column];
            let bValue = b[column];

            if (typeof aValue === "string" && typeof bValue === "string") {
                return order === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            return order === "asc" ? aValue - bValue : bValue - aValue;
        });

        setPayments(sortedRecords);
    };
    const handleRowClick = (academyId, playerId) => {
        // Optional: navigate or perform action on row click
        console.log(`Row clicked: AcademyID = ${academyId}, PlayerID = ${playerId}`);
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

        // Move cursor below title
        let y = 40;

        // Add player names before table
        doc.setFontSize(12);
        payments.forEach((payment, index) => {
            doc.text(`Player Name: ${payment.player_name}`, 10, y);
            y += 7; // Increase Y position for next name
        });

        // Define table headers and data
        const headers = [
            ["Player ID", "Total Fee", "Paid Amount", "Due Amount", "Due Date", "Paid Date & Time", "Status", "Remarks"]
        ];
        const data = payments.map(payment => [
            payment.player_id,
            payment.total_fee,
            payment.paid_amount,
            payment.due_amount,
            new Date(payment.due_date).toLocaleDateString(),
            new Date(payment.created_at).toLocaleString(),
            payment.status,
            payment.remarks
        ]);

        // Add table using autoTable
        autoTable(doc, {
            head: headers,
            body: data,
            startY: y + 5, // Start the table after the player names
            theme: "grid",
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: [0, 122, 204], textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [240, 240, 240] }
        });

        doc.save("payment_report.pdf");
    };


    const downloadCSV = () => {
        if (payments.length === 0) {
            alert("No records available to download.");
            return;
        }

        const headers = [
            "Player ID,Player Name,Total Fee,Paid Amount,Due Amount,Due Date,Paid Date & Time,Status,Remarks"
        ];

        const rows = payments.map(payments =>
            `${payments.player_id},${payments.player_name},${payments.total_fee},${payments.paid_amount},${payments.due_amount},${payments.created_at},${new Date(payments.due_date).toLocaleDateString()},${payments.status},${payments.remarks}`
        );

        const csvContent = [headers, ...rows].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "Payment_Report.csv");
    };
    return (
        <div >
            <div className="nav">
                <div className='logo-container'>
                    <Link to={`/AcademyDetails/${role}/${academyId}`}><img style={{ width: '50px', borderRadius: '50%' }} src={LogoIcon} alt='logo' /></Link>
                    <Link to={`/AcademyDetails/${role}/${academyId}`} className="logo">Pro Sports Manager</Link>
                </div>
            </div>
            <div className="below-navbar" >
                <h2>Payments History</h2>
                <div className="download-btn-main">
                    <button onClick={handleDownloadPDF} className="download-btn">Download as PDF</button>
                    <button onClick={downloadCSV} className="download-btn" >Download as CSV </button>
                </div>
                <div style={{ padding: '14px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            {payments.length > 0 ? (
                                <div><h3>{payments[0].player_name.toUpperCase()}</h3></div>
                            ) : (
                                <div>No Name Found</div>
                            )}
                        </div>
                        <Link to={`/AcademyDetails/${role}/${academyId}/ManagePayment`} className="back-btn" style={{color:'white',padding:'4px 10px' , borderRadius:'10px'}} >Back</Link>
                    </div>

                    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                        <thead>
                            <tr style={{ background: "#f4f4f4", textAlign: "left" }}>
                                <th style={headerStyle} onClick={() => handleSort("player_id")}>
                                    Player ID {sortColumn === "player_id" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                </th>

                                <th style={headerStyle} onClick={() => handleSort("total_fee")}>
                                    Total Fee {sortColumn === "total_fee" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                </th>
                                <th style={headerStyle} onClick={() => handleSort("paid_amount")}>
                                    Paid Amount {sortColumn === "paid_amount" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                </th>
                                <th style={headerStyle} onClick={() => handleSort("due_amount")}>
                                    Due Amount {sortColumn === "due_amount" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                </th>
                                <th style={headerStyle} onClick={() => handleSort("due_date")}>
                                    Due Date {sortColumn === "due_date" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                </th>
                                <th style={headerStyle} onClick={() => handleSort("paid_date")}>
                                    Paid Date & Time {sortColumn === "paid_date" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                </th>
                                <th style={headerStyle} onClick={() => handleSort("status")}>
                                    Status {sortColumn === "status" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                </th>
                                <th style={headerStyle}>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length > 0 ? (
                                payments.map((record) => (
                                    <tr key={record.id}
                                        onClick={() => handleRowClick(record.academy_id, record.player_id)}
                                        style={{ cursor: "pointer" }} >
                                        <td style={cellStyle}>{record.player_id.toUpperCase()}</td>
                                        {/* <td style={cellStyle}>{record.player_name}</td> */}
                                        <td style={cellStyle}>{record.total_fee}</td>
                                        <td style={cellStyle}>{record.paid_amount}</td>
                                        <td
                                            style={{
                                                ...cellStyle,
                                                color: record.due_amount === 0 ? "green" : "orange",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                            }}
                                        >
                                            {record.due_amount}
                                        </td>
                                        <td style={cellStyle}>
                                            {new Date(record.due_date).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td style={cellStyle}>
                                            {new Date(record.created_at).toLocaleString("en-GB", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </td>

                                        <td
                                            style={{
                                                ...cellStyle,
                                                backgroundColor: record.status === "paid" ? "green" : "orange",
                                                color: "white",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                            }}
                                        >
                                            {record.status}
                                        </td>
                                        <td style={cellStyle}>{record.remarks}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={{ ...cellStyle, textAlign: "center" }}>
                                        No Records Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};
const headerStyle = {
    padding: "8px",
    border: "1px solid #ddd",
    cursor: "pointer",
};

const cellStyle = {
    padding: "8px",
    border: "1px solid #ddd",
};

export default PlayerPaymentsHistory;
