import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const DeletePlayer = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL  ;

  const { academyId, role } = useParams(); // Academy ID from URL
  const navigate = useNavigate(); // For redirection

  const [playerId, setPlayerId] = useState(""); // To store the Player ID entered
  const [playerName, setPlayerName] = useState(""); // To store Player's Name fetched from backend
  const [confirmation, setConfirmation] = useState(false); // To confirm deletion
  const [message, setMessage] = useState("");

  // Fetch Player Name by Player ID
  const fetchPlayerDetails = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/getPlayerDetails/${playerId}`
      );
      if (response.data) {
        setPlayerName(response.data.name);
        setConfirmation(true); // Show confirmation prompt
      } else {
        setMessage("Player ID does not exist.");
      }
    } catch (error) {
      console.error("Error fetching player details:", error);
      setMessage("Error fetching player details. Please try again.");
    }
  };

  // Handle Delete Player Request
  const deletePlayer = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/deletePlayer/${playerId}`
      );
      if (response.status === 200) {
        setMessage("Player deleted successfully!");
        setTimeout(() => {
          navigate(`/AcademyDetails/${role}/${academyId}/Player`); // Redirect to Player Page
        }, 2000);
      }
    } catch (error) {
      console.error("Error deleting player:", error);
      setMessage("Failed to delete player. Please try again.");
    }
  };

  return (
    <div className="delete-player-container">
      <h2 className='heading'>Delete Player</h2>
      <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0" }} /> {/*  adjust margin to set into column line */}

      <div className="form-group">
        <label>Enter Player ID:</label>
        <input
          type="text"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
        />
      </div>
      <button onClick={fetchPlayerDetails}>Check Player</button>

      {confirmation && (
        <div className="confirmation">
          <p>
            Are you sure you want to delete <strong>{playerName}</strong>?
          </p>
          <button onClick={deletePlayer}>Yes, Delete</button>
          <button onClick={() => setConfirmation(false)}>Cancel</button>

        </div>
      )}
      <Link to={`/AcademyDetails/${role}/${academyId}/Player`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <button>Back</button>
      </Link>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeletePlayer;
