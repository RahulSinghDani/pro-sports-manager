import React, { useState, useEffect } from "react";
import axios from "axios";

const TotalPlayerCount = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL  ;

  const [totalPlayers, setTotalPlayers] = useState(0);

  useEffect(() => {
    const fetchTotalPlayers = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/totalPlayers`
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
      <h3>Total Players: {totalPlayers}</h3>
    </div>
  );
};

export default TotalPlayerCount;
