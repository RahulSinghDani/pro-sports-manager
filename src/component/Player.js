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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add a loading state

  //fetch acdemy total player
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

      <div className='container'>
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
            <h3>Total Fees Outstanding</h3>
            <p>--</p>
          </div>
        </div>
        <Link to={`/edit-player/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <button>Edit Player</button>
        </Link>
        <Link to={`/delete-player/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <button>Delete Player</button>
        </Link>
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
                  <th>Player ID</th>
                  <th>Name</th>
                  <th>DOB</th>
                  <th>Gender</th>
                  <th>School Name</th>
                  <th>Sports Expertise</th>
                  <th>Address</th>
                  <th>Previous Academy</th>
                  <th>Father's Name</th>
                  <th>Mother's Name</th>
                  <th>Phone Number</th>
                  <th>Batch</th>
                  {/* <th>Profile Picture</th> */}
                </tr>
              </thead>
              <tbody>
                {players.map(player => (
                  <tr key={player.id}>
                    <td>
                      <Link to={`/AcademyDetails/${role}/${academyId}/${player.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <b> {player.id}</b>
                      </Link></td>
                    <td><Link to={`/AcademyDetails/${role}/${academyId}/${player.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <b> {player.name}</b>
                    </Link></td>
                    <td>{player.dob}</td>
                    <td>{player.gender}</td>
                    <td>{player.school_name}</td>
                    <td>{player.sports_expertise}</td>
                    <td>{player.address}</td>
                    <td>{player.previous_academy}</td>
                    <td>{player.father_name}</td>
                    <td>{player.mother_name}</td>
                    <td>{player.phone_number}</td>
                    <td>{player.batch}</td>
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
