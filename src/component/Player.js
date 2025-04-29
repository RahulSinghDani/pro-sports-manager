import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AcademyNavbar from './AcademyNavbar.js';
import { Link, useParams } from 'react-router-dom';
import About from './About.js';
import searchpng from './Images/search.png';
import defaultImage from "./Images/playerpng.png";

const Player = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { academyId, role } = useParams(); // Get the academy_id from the URL
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [newPlayerCount, setNewPlayerCount] = useState(0);
  const [filterStatus, setFilterStatus] = useState("all");

  const [players, setPlayers] = useState([]);
  const [records, setRecords] = useState([]);
  const [originalPlayers, setOriginalPlayers] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [searchParams, setSearchParams] = useState({
    playerId: "",
    playerName: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };
  // const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add a loading state
  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const fetchAllRecords = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/financial-records/filter-paid/${academyId}`, { withCredentials: true });
      // console.log("All Payment Records:", response.data);
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching all records:", error);
    }
  };
  // const isPaymentComplete = (playerId) => {
  //   // console.log(`Checking payment for player ID: ${playerId}`);

  //   if (!records || records.length === 0) {
  //     // console.log("Records not loaded yet.");
  //     return false;
  //   }

  //   const playerRecord = records.find(record => record.player_id === playerId);

  //   if (!playerRecord) {
  //     // console.log(`No payment record found for ${playerId}`);
  //     return false;
  //   }

  //   // console.log(`Paid: ${playerRecord.paid_amount}, Total Fee: ${playerRecord.total_fee}`);

  //   return playerRecord.paid_amount >= playerRecord.total_fee;
  // };
  const isPaymentComplete = (playerId) => {
    console.log("Records:", records); // Debugging step

    if (!records || records.length === 0) {
      console.log("Records not loaded yet.");
      return false;
    }

    const playerRecord = records.find(record => record.player_id === playerId);

    if (!playerRecord) {
      console.log(`No payment record found for ${playerId}`);
      return false;
    }

    return playerRecord.paid_amount >= playerRecord.total_fee || playerRecord.status === "paid";
  };

  useEffect(() => {
    fetchAllRecords();
  }, [API_BASE_URL, academyId]);
  useEffect(() => {
    setPlayers(prevPlayers => [...prevPlayers]); // Force re-render
  }, [records]);

    const fetchNewPlayersCount = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/count-new-players-this-month/${academyId}`, {
          withCredentials: true
        });
        console.log("New players this month:", response.data.countNewPlayersThisMonth);
        setNewPlayerCount(response.data.countNewPlayersThisMonth);
      } catch (error) {
        console.error("Error fetching new players count:", error);
      }
    };

  //fetch acdemy total player
  useEffect(() => {
    const fetchTotalPlayers = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/totalPlayers/${academyId}`, { withCredentials: true }
        );
        setTotalPlayers(response.data.total);
      } catch (error) {
        console.error("Error fetching total players count:", error);
      }
    };

    fetchTotalPlayers();
    fetchNewPlayersCount();
  }, [API_BASE_URL, academyId]);
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/revenue/${academyId}`, { withCredentials: true })
      .then(response => {
        setRevenue(response.data.YTD_Revenue || 0);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to load revenue details.');
      });
  },[API_BASE_URL, academyId]);

  useEffect(() => {
    // Fetch player data from the backend
    axios
      .get(`${API_BASE_URL}/api/players/${academyId}`, { withCredentials: true })
      .then(response => {
        setPlayers(response.data); // Set the fetched player data
        setOriginalPlayers(response.data);
        setLoading(false); // Stop loading
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to load player details.');
        setLoading(false); // Stop loading even on error
      });
  }, [API_BASE_URL, academyId]);

  const [status, setStatus] = useState(players.status);

  useEffect(() => {
    setStatus(players.status); // Set initial status when component mounts
  }, [players.status]);

  //toggle button for active and deactive player
  const toggleStatus = async (playerId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    try {
      const response = await fetch(`${API_BASE_URL}/updatePlayerStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ playerId, status: newStatus }),
      });

      if (response.ok) {
        // Update players array to reflect the status change
        setPlayers(prevPlayers =>
          prevPlayers.map(player =>
            player.id === playerId ? { ...player, status: newStatus } : player
          )
        );
        alert(`Player Status updated successfully!`);
      } else {
        console.error("Failed to update status");
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the status");
    }
  };

  const handlePlayerSearch = () => {
    const { playerId, playerName } = searchParams;

    if (!playerId && !playerName) {
      setPlayers(originalPlayers); // Reset the list
      return;
    }

    const filteredPlayers = originalPlayers.filter(player =>
      (playerId && player.id.toLowerCase().includes(playerId.toLowerCase())) ||
      (playerName && player.name.toLowerCase().includes(playerName.toLowerCase()))
    );

    setPlayers(filteredPlayers);
  };

  const handleRefresh = () => {
    setPlayers(originalPlayers); // Reset players list
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterStatus(value);
    if (value === "all") {
      setPlayers(originalPlayers);
    } else {
      setPlayers(originalPlayers.filter(player => player.status === value));
    }
  };
  // Show loading spinner or message while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if there was an issue fetching data
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <AcademyNavbar role={role} academyId={academyId} /> {/* Pass the academyId correctly */}

      <div className='below-navbar'>
        <h2 className='heading'>Player Information</h2>
        <div id="dashboard-boxes" style={{ display: "flex", gap: "20px", justifyContent: 'center', alignItems: 'center', marginBottom: "20px" }}>
          {/* Total Players Box */}
          <div className='box-style'>
            <h3>Total Players</h3>
            <p>{totalPlayers}</p>
          </div>
          <div className='box-style'>
            <h3>New Players MTD</h3>
            <p>{newPlayerCount}</p>
          </div>
          <div className='box-style'>
            <h3>YTD Revenue</h3>
            <p>₹ {revenue}</p>
          </div>
        </div>
        <div className='player-functionality-btns'>
          <div>
            {players.length > 0 ? (
              <Link to={`/edit-player/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <button>Edit Player</button>
              </Link>) : null}

            <Link to={`/add-player/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <button>Add Player</button>
            </Link>
          </div>
          <div>
            {/* search player by id or name  */}
            <div className="search-box-managepayment" id="search-by-player">
              <div className="date-filter-style">
                <label style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                  Search Player: {" "} </label>
                <input
                  type="text"
                  name="playerName"
                  value={searchParams.searchQuery}
                  onChange={handleInputChange}
                  placeholder="Search by Player ID or Name"
                />

                <button onClick={handlePlayerSearch} className="search-btn">
                  <img src={searchpng} alt="Search" className="search-icon" />
                </button>

                <p onClick={handleRefresh} className="refresh-btn tooltip" >
                  🔄<span className="tooltip-text">Reset</span>
                </p>
                <select onChange={handleFilterChange} value={filterStatus}>
                  <option value="all">All Players</option>
                  <option value="active">Active Players</option>
                  <option value="inactive">Inactive Players</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {error && <p>{error}</p>}
        {players.length === 0 ? (
          <p>No Players found for this academy. <p style={{}} className='tooltip'>ℹ️ <span className="tooltip-text">Player not found!</span></p></p>
        ) : (
          <div className="table-wrapper">
            <table border="1" width="800px">
              <thead>
                <tr>
                  <th style={{ width: '50px' }}></th>
                  <th style={{ width: '50px' }}>Status</th>
                  <th style={{ width: '70px' }}>Manage</th>
                  <th>Name</th>
                  <th>Batch & Fee</th>
                  <th>Phone Number</th>
                  <th>School Name</th>

                </tr>
              </thead>
              <tbody>
                {players.map(player => (
                  <tr key={player.id} className='player-row-data'>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                      <img src={player.profile_pic ? `${API_BASE_URL}/uploads/${player.profile_pic}` : defaultImage}
                        alt="Player"
                        style={{ width: "50px", height: '50px', margin: '8px 8px', borderRadius: "50%", pointerEvents: "none", userSelect: "none", cursor: 'not-allowed' }}
                        onDoubleClick={(e) => e.preventDefault()} // Prevents double-click
                        onContextMenu={(e) => e.preventDefault()} // Disables right-click (prevents download)
                        draggable="false" // Prevents drag & drop
                      />
                    </div>
                    {/* Toggle Button */}
                    <td style={{ width: '50px' }}>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={player.status === "active"}
                          onChange={() => {
                            if (!isPaymentComplete(player.id)) {
                              alert("Payment is not done. Please complete the payment first.");
                              return;
                            }
                            toggleStatus(player.id, player.status);
                          }}
                          disabled={!isPaymentComplete(player.id)} // Disable if payment is incomplete
                        />
                        <span className="slider"></span>
                      </label>
                    </td>

                    {/* <td><Link to={`/financialform/${role}/${academyId}/${player.id}/${player.name}/${player.fee}`}>Payment <br /><b> {player.id.toUpperCase()}</b></Link></td> */}
                    <td style={{ width: '70px' }}>
                      {isPaymentComplete(player.id) ? (
                        <button style={{backgroundColor:'rgb(100, 200, 100)', color: "green",  padding: '3px 3px' }}><Link to={`/AcademyDetails/${role}/${academyId}/ManagePayment`} style={{ color: "white" }}>Paid <br /> {player.id.toUpperCase()}</Link></button>
                      ) : (
                        <Link to={`/financialform/${role}/${academyId}/${player.id}/${player.name}/${player.fee}`}>
                          Payment <br /><b> {player.id.toUpperCase()}</b>
                        </Link>
                      )}
                    </td>

                    <td><Link to={`/AcademyDetails/${role}/${academyId}/${player.id}/${player.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <b> {player.name.toUpperCase()}</b>
                    </Link></td>
                    <td className="parent-address-style"> <b>Batch:</b> {player.batch} <br /> {player.fee_type}<br /><b>Fee</b> Rs. <span style={{ color: "blue", fontSize: "1rem" }}> {player.fee}</span></td>
                    {/* <td className="parent-address-style"><i>{player.gender}</i> <br /><b>DOB:</b>{formatDate(player.dob)} <br /><b>Sorts Expertise: </b>{player.sports_expertise}</td> */}
                    <td ><b>Player Ph.: </b>{player.phone_number} <br /> <b>Father Ph.: </b>{player.f_ph_num} <br /> <b>Mother Ph.: </b>{player.m_ph_num}</td>
                    <td className="parent-address-style"><b> Sch. Name:</b> {player.school_name} <br /><b> Pre Aca:</b> {player.previous_academy}</td>

                    {/* <td className="parent-address-style"><b>Father:</b> {player.father_name} <br /><b>Mother:</b> {player.mother_name} <br /> <b>Address: </b>{player.address}</td> */}
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <About />
    </div>
  );
};
export default Player;