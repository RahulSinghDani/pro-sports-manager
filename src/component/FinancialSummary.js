import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FinancialSummary = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://165.232.183.58:5000';

    const { academyId} = useParams();
    const [financialData, setFinancialData] = useState({
        totalRevenue: 0,
        totalExpenses: 0,
        acReceivable: 0,
    });

    useEffect(() => {
        const fetchFinancialData = async () => {
            try {
                // Fetch total revenue
                const revenueResponse = await axios.get(`${API_BASE_URL}/api/booking/totalrevenue/${academyId}`);
                const totalRevenue = revenueResponse.data.totalRevenue || 0;

                // Fetch total expenses
                const expensesResponse = await axios.get(`${API_BASE_URL}/api/player_financial/totalexpenses/${academyId}`);
                const totalExpenses = expensesResponse.data.totalExpenses || 0;

                // Fetch account receivables
                const receivableResponse = await axios.get(`${API_BASE_URL}/api/player_financial/acreceivable/${academyId}`);
                const acReceivable = receivableResponse.data.acReceivable || 0;

                // Update state with fetched data
                setFinancialData({ totalRevenue, totalExpenses, acReceivable });
            } catch (error) {
                console.error("Error fetching financial data:", error);
            }
        };

        fetchFinancialData();
    }, [academyId]);

    return (
        <div
            className="financial-summary"
            style={{
                display: "flex",
                margin: "20px",
                justifyContent: "space-evenly",
                textAlign: "center",
            }}
        >
            <div
                className="summary-item"
                style={{
                    background: "#DBE9FA",
                    padding: "24px",
                    borderRadius: "20px",
                }}
            >
                <h3>Total Revenue</h3>
                <p>{financialData.totalRevenue}</p>
            </div>
            <div
                className="summary-item"
                style={{
                    background: "#DBE9FA",
                    padding: "24px",
                    borderRadius: "20px",
                }}
            >
                <h3>Total Expenses</h3>
                <p>{financialData.totalExpenses}</p>
            </div>
            <div
                className="summary-item"
                style={{
                    background: "#DBE9FA",
                    padding: "24px",
                    borderRadius: "20px",
                }}
            >
                <h3>AC Receivable</h3>
                <p>{financialData.acReceivable}</p>
            </div>
        </div>
    );
};

export default FinancialSummary;
