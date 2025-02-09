import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AcademyNavbar from './AcademyNavbar.js';
import { Link, useParams } from 'react-router-dom';
import About from './About.js';


const Player = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { academyId, role } = useParams(); // Get the academy_id from the URL
  const [totalPlayers, setTotalPlayers] = useState(0);

  const [players, setPlayers] = useState([]);
  const [revenue, setRevenue] = useState(0);
  // const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add a loading state

  //fetch acdemy total player
  useEffect(() => {
    const fetchTotalPlayers = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/totalPlayers/${academyId}`
        );
        setTotalPlayers(response.data.total);
      } catch (error) {
        console.error("Error fetching total players count:", error);
      }
    };

    fetchTotalPlayers();
  }, [API_BASE_URL, academyId]);
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/revenue/${academyId}`)
      .then(response => {
        setRevenue(response.data.YTD_Revenue || 0);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to load revenue details.');
      });
  })

  useEffect(() => {
    // Fetch player data from the backend
    axios
      .get(`${API_BASE_URL}/api/players/${academyId}`)
      .then(response => {
        setPlayers(response.data); // Set the fetched player data
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





  // useEffect(() => {
  //   // Fetch course data from the backend
  //   axios
  //     .get(`${API_BASE_URL}/api/courses/${academyId}`)
  //     .then(response => {
  //       setCourses(response.data); // Set the fetched courses data
  //       setLoading(false); // Set loading to false after data is fetched
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //       setError('Failed to load course details.');
  //       setLoading(false); // Set loading to false even on error
  //     });
  // }, [API_BASE_URL, academyId]);

  // Show loading spinner or message while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if there was an issue fetching data
  if (error) {
    return <div>{error}</div>;
  }

  // Show message if no players exist for the academy
  // if (!players.length) {
  //   return <div>No players found for this academy.</div>;
  // }

  return (
    <div>
      <AcademyNavbar role={role} academyId={academyId} /> {/* Pass the academyId correctly */}

      <div className='below-navbar'>
        <h2>Player Information</h2>
        <div id="dashboard-boxes" style={{ display: "flex", gap: "20px", justifyContent: 'center', alignItems: 'center', marginBottom: "20px" }}>
          {/* Total Players Box */}
          <div style={boxStyle}>
            <h3>Total Players</h3>
            <p>{totalPlayers}</p>
          </div>
          <div style={boxStyle}>
            <h3>New Players MTD</h3>
            <p>{totalPlayers}</p>
          </div>
          <div style={boxStyle}>
            <h3>YTD Revenue</h3>
            <p>₹ {revenue}</p>
          </div>
        </div>
        <Link to={`/edit-player/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <button>Edit Player</button>
        </Link>
        {/* <Link to={`/delete-player/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <button>Delete Player</button>
        </Link> */}
        {/* <Link to={`/search-player/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <button>Search Player</button>
      </Link> */}

        <Link to={`/add-player/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>

          <button>Add Player</button>
        </Link>


        {error && <p>{error}</p>}
        {players.length === 0 ? (
          <p>No Players found for this academy.</p>
        ) : (
          <div className="table-wrapper">
            <table border="1" width="800px">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Manage</th>
                  {/* <th>Player ID</th> */}
                  <th>Name</th>
                  <th>Batch & Fee</th>
                  <th>Gender &<br /> DOB (D-M-Y)</th>
                  <th>Phone Number</th>
                  <th>School Name</th>
                  <th>Sports Expertise</th>
                  <th>Parent & Address</th>
                  <th>Add Score</th>
                  {/* <th>Profile Picture</th> */}
                </tr>
              </thead>
              <tbody>
                {players.map(player => (
                  <tr key={player.id}>
                    {/* Toggle Button */}
                    <td>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={player.status === "active"}
                          onChange={() => toggleStatus(player.id, player.status)}
                        />
                        <span className="slider"></span>
                      </label>
                    </td>
                    <td><Link to={`/financialform/${role}/${academyId}/${player.id}/${player.name}/${player.fee}`}>Payment <br /><b> {player.id}</b></Link></td>

                    <td><Link to={`/AcademyDetails/${role}/${academyId}/${player.id}/${player.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <b> {player.name}</b>
                    </Link></td>
                    <td> <b>Batch:</b> {player.batch} <br /> {player.fee_type}<br />Rs. <span style={{ color: "blue", fontSize: "1rem" }}> {player.fee}</span></td>
                    <td>{player.gender} <br /><b>DOB:</b> {player.dob} </td>
                    <td>{player.phone_number}</td>
                    <td><b> School Name:</b> {player.school_name} <br /><b> Previous Academy:</b> {player.previous_academy}</td>
                    <td>{player.sports_expertise}</td>
                    {/* <td>{player.address}</td> */}
                    {/* <td>{player.previous_academy}</td> */}
                    <td><b>Father:</b> {player.father_name} <br /><b>Mother:</b> {player.mother_name} <br /> <b>Address: </b>{player.address}</td>
                    <td>
                      <Link to={`/player-cricket-data/${role}/${academyId}/${player.id}/${player.name}`}> Score </Link>
                    </td>


                    {/* <td> */}
                    {/* Uncomment and replace the placeholder with the real profile image URL */}
                    {/* <img
                  src={`${API_BASE_URL}/uploads/${player.profile_pic}`}
                  alt={player.name}
                  width="50"
                  height="50"
                /> */}
                    {/* Profile Picture Placeholder */}
                    {/*    </td> */}
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

const boxStyle = {
  border: "1px solid #ddd",
  padding: "20px",
  borderRadius: "8px",
  width: "200px",
  height: "100px",
  alignItems: "center",
  textAlign: "center",
  background: "#f9f9f9",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

export default Player;
