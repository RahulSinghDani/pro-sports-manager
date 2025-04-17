import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PlayerPaymentsHistory = () => {
  const [payments, setPayments] = useState([]);
  const { academyId, playerId } = useLocation().state; // Get academyId and playerId from state

  useEffect(() => {
    if (academyId && playerId) {
      // Fetch player payments history from the API
      axios.get(`/api/financial-records/payments-history/${academyId}/${playerId}`,{withCredentials: true})
        .then(response => {
          setPayments(response.data); // Set the payments data to state
        })
        .catch(error => {
          console.error("Error fetching payments:", error);
        });
    }
  }, [academyId, playerId]); // Re-run the effect when academyId or playerId changes

  return (
    <div>
      <h1>Payments History for Player {playerId}</h1>
      <table>
        <thead>
          <tr>
            <th>Player ID</th>
            <th>Amount Paid</th>
            <th>Due Amount</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id}>
              <td>{payment.player_id}</td>
              <td>{payment.paid_amount}</td>
              <td>{payment.due_amount}</td>
              <td>{payment.due_date}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerPaymentsHistory;
