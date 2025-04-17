import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import searchpng from '../Images/search.png';
import AddNewStudent from './AddNewStudent';

const Student = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { academyId, role } = useParams(); // Get the academy_id from the URL
  // const [totalPlayers, setTotalPlayers] = useState(0);

  const [players, setPlayers] = useState([]);
  const [originalPlayers, setOriginalPlayers] = useState([]);
  // const [revenue, setRevenue] = useState(0);


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

  useEffect(() => {
    // Fetch player data from the backend
    axios
      .get(`${API_BASE_URL}/api/players/active/${academyId}`, { withCredentials: true })
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
      <div >

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'10px'}}>
          <h2 className='heading'>Students</h2>
          <AddNewStudent />
        </div>
        <div className='player-functionality-btns'>

          <div className="total-players">
            <p>Total Players: {players.length}</p>
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
                  placeholder="Enter Player ID or Name"
                />

                <button onClick={handlePlayerSearch} className="search-btn">
                  <img src={searchpng} alt="Search" className="search-icon" />
                </button>

                <p onClick={handleRefresh} className="refresh-btn tooltip" >
                  🔄<span className="tooltip-text">Reset</span>
                </p>
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
                  <th>ID</th>
                  <th>Name</th>
                  <th>Batch</th>
                  <th>Gender & DOB </th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {players.map(player => (
                  <tr key={player.id} className='player-row-data'>
                    <td style={{width:'20px'}}><b> {player.id.toUpperCase()}</b></td>

                    <td className="parent-address-style"><Link to={`/AcademyDetails/${role}/${academyId}/${player.id}/${player.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <b> {player.name}</b>
                    </Link></td>
                    <td className="parent-address-style"> <b>Batch:</b> {player.batch} </td>
                    <td className="parent-address-style"><i>{player.gender}</i> <br /><b>DOB:</b>{formatDate(player.dob)} <br /><b>Sorts Expertise: </b>{player.sports_expertise}</td>
                    <td><b>Player Ph.: </b>{player.phone_number} <br /> <b>Father Ph.: </b>{player.f_ph_num} <br /> <b>Mother Ph.: </b>{player.m_ph_num}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};



export default Student;
