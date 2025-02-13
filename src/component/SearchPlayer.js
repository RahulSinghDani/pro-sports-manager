import React, { useState } from "react";
import axios from "axios";

const SearchPlayer = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL  ;

  const [searchTerm, setSearchTerm] = useState(""); // To store the search term
  const [searchBy, setSearchBy] = useState("id"); // To determine search type (id or name)
  const [playerDetails, setPlayerDetails] = useState(null); // To store fetched player details
  const [message, setMessage] = useState(""); // For error or status messages

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/searchPlayer`,
        {
          params: {
            searchTerm,
            searchBy,
          },
        }, { withCredentials: true }
      );
      if (response.data) {
        setPlayerDetails(response.data); // Update state with player details
        setMessage("");
      } else {
        setMessage("No player found with the provided details.");
      }
    } catch (error) {
      console.error("Error searching player:", error);
      setMessage("Error searching player. Please try again.");
    }
  };

  return (
    <div className="search-player-container">
      <h2>Search Player</h2>
      <div className="form-group">
        <label>Search By:</label>
        <select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <option value="id">Player ID</option>
          <option value="name">Player Name</option>
        </select>
      </div>
      <div className="form-group">
        <label>Enter {searchBy === "id" ? "Player ID" : "Player Name"}:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button onClick={handleSearch}>Search</button>
      {message && <p>{message}</p>}
      {playerDetails && (
        <div className="player-details">
          <h3>Player Details</h3>
          <p><strong>ID:</strong> {playerDetails.id}</p>
          <p><strong>Name:</strong> {playerDetails.name}</p>
          <p><strong>Academy ID:</strong> {playerDetails.academy_id}</p>
          <p><strong>Gender:</strong> {playerDetails.gender}</p>
          <p><strong>Phone Number:</strong> {playerDetails.phone_number}</p>
          <p><strong>Batch:</strong> {playerDetails.batch}</p>
        </div>
      )}
    </div>
  );
};

export default SearchPlayer;
