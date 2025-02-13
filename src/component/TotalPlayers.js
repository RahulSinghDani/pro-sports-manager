import React, { useState, useEffect } from "react";
import axios from "axios";
import About from "./About";
const TotalPlayerCount = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [error, setError] = useState('');
  const [totalPlayers, setTotalPlayers] = useState(0);

  useEffect(() => {
    const fetchTotalPlayers = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/totalPlayers`, { withCredentials: true }
        );
        setTotalPlayers(response.data.total);
      } catch (error) {
        console.error("Error fetching total players count:", error);
      }
    };

    fetchTotalPlayers();
  }, [API_BASE_URL]);

  return (
    <div className="total-player-count">
      <div>
        {error ? <p>{error}</p> :
          <h3>Total Players: {totalPlayers}</h3>
        }
      </div>
      <About />
    </div>
  );
};

export default TotalPlayerCount;
