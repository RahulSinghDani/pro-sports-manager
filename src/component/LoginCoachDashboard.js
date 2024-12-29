import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Style.css';
import defaultprofile from "./Images/playerpng.png"; // Import the background image
// import { styles } from './Style';

const LoginCoachDashboard = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL  ;

  const { role, academy_id: academyId, coachId } = useParams(); // Get the academy_id from the URL
  const [totalPlayers, setTotalPlayers] = useState(0);
  // console.log("role:  ",role ,"  Aca id: ", academyId, " coachId: ",id);

  // console.log("coach id: ",coachId );

  const [players, setPlayers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add a loading state


  const [coach, setCoach] = useState(null);
  const [isCoachVisible, setIsCoachVisible] = useState(false); // State to control visibility

  //fetch coach data 
  useEffect(() => {
    // Fetch data for a specific coach using the id
    axios.get(`${API_BASE_URL}/api/coaches/${academyId}/${coachId}`)
      .then(response => {
        setCoach(response.data); // Set the specific coach's data
      })
      .catch(error => {
        setError('Failed to load coach details.');
        console.error('Error fetching coach data:', error);
      });
  }, [API_BASE_URL ,academyId, coachId]);

  // Handler to toggle coach visibility
  const toggleCoachVisibility = () => {
    setIsCoachVisible(!isCoachVisible);
  };
  //------------------

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
  }, [API_BASE_URL,academyId]);

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
      <nav className='nav'>
      <h1 className='logo'>Pro Sports Manager</h1>

      <div className='navLinks'>
          <Link to={`/AcademyDetails/${role}/${academyId}/ManagePayment`} style={buttonStyle}>
            Payment Info
          </Link>
          <Link to={`/edit-player/${role}/${academyId}`} style={buttonStyle}>
            Edit Player
          </Link>
          <Link to={`/delete-player/${role}/${academyId}`} style={buttonStyle}>
            Delete Player
          </Link>
          <Link to={`/add-player/${role}/${academyId}`} style={buttonStyle}>
            Add Player
          </Link>
          <Link to={`/Login`} style={{ background: 'rgb(0, 52, 111)', color: 'white', padding: '8px 10px', fontWeight: 'bold', borderRadius: '14px', textAlign: 'center', textDecoration: 'none' }} id='Logout'>
            Log Out
          </Link>
        </div>
      </nav>
    <div style={{ background: "#f5f5f5", minHeight: '100vh' }}>

        <h2 style={{fontWeight:'bold',marginTop:'20PX', textAlign: "center", color: "black" }}>Player Information</h2>
     
      <div className='container' >


        <div className='coachDetails'>
          {/* Circle to toggle Coach Details */}
          <div
            onClick={toggleCoachVisibility}
            style={{
              width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#007bff',
              display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer',
              color: '#fff', fontWeight: 'bold', position: 'fixed', top: '20px', left: '20px', marginTop: '60px',
            }}
          >
            Coach
          </div>


          {/* Sidebar for Coach Details */}
          {isCoachVisible && (
            <div >
              
              {coach ? (
                <div style={sidebarStyle}>
                  <h2>Coach Details</h2>
                  <p ><img src={defaultprofile} alt='Loading...' style={{width:'50px',height:'auto',borderRadius:'50%'}}></img></p>
                  <p><strong>ID:</strong> {coach.id}</p>
                  <p><strong>Name:</strong> {coach.name}</p>
                  <p><strong>Designation:</strong> {coach.designation}</p>
                  <p><strong>Experience:</strong> {coach.experience} years</p>
                  <p><strong>Phone:</strong> {coach.phone_num}</p>
                  <p><strong>Email:</strong> {coach.email}</p>
                  <p><strong>Salary:</strong> ₹{coach.salary}</p>
                  <p><strong>Batch Name:</strong> {coach.batch_name}</p>
                </div>
              ) : (
                <p>{error || 'Loading coach details...'}</p>
              )}
            </div>
          )}
        </div>




        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '10px' }}>
          <div
            id="dashboard-boxes"
            style={{ marginTop: '8px', display: "flex", gap: "20px", justifyContent: 'center', alignItems: 'center', marginBottom: "20px" }}
          >
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
          {/* ------------------------------------ */}




          {error && <p>{error}</p>}
          {players.length === 0 ? (
            <p>No Players found for this academy.</p>
          ) : (
            <div style={playersContainerStyle}>
              {players.map((player) => (
                <div key={player.id} style={playerBoxStyle}>
                  <p ><img src={defaultprofile} alt='Loading...' style={{width:'50px',height:'auto',borderRadius:'50%'}}></img></p>


                {/* image fetch from db if available */}
                  {/* {player.profile_pic ? (
                            <img src={player.profile_pic} alt='Player' style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }} />
                        ) : (
                            <p>
                                <img src={defaultprofile} alt='Loading...' style={{ width: '50px', height: 'auto', borderRadius: '50%' }} />
                            </p>
                        )} */}

                  <h3>{player.name}</h3>
                  <p>ID: {player.id}</p>
                  <p>DOB: {player.dob}</p>
                  <p>Gender: {player.gender}</p>
                  <p>Batch: {player.batch}</p>

                  <Link
                    to={`/LoginPlayerDashboard/${role}/${academyId}/${player.id}`} state={{ coachId: coachId }} // State is passed here
                    style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* ---------------- */}
      </div>
    </div>
    </div>

  );
};



const buttonStyle = {
  padding: "10px 15px",
  fontSize: "14px",
  color: "#fff",
  backgroundColor: "rgb(35, 94, 173)",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  textDecoration: "none",
};


//----------------------

const boxStyle = {
  border: "1px solid #ddd",
  padding: "20px",
  borderRadius: "8px",
  width: "30%",
  fontSize: '1rem',
  height: "100px",
  alignItems: "center",
  textAlign: "center",
  background: "#f9f9f9",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};
//-----------------------------
const playersContainerStyle = {
  width: '80%',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',

};

const playerBoxStyle = {
  border: "1px solid #ddd",
  padding: "20px",
  borderRadius: "8px",
  width: "250px",
  background: "#fff",
  boxShadow: "0 6px 10px rgba(0, 0, 0, 0.5)",
  textAlign: "center",
};

//-----------------------------
//coach 
const sidebarStyle = {
  borderRadius: '40px',
  // marginTop: '8px',
  width: "300px%", // Fixed width for sidebar
  height: "75vh", // Full viewport height
  position: "fixed", // Keeps it fixed to the viewport
  backgroundColor: "rgb(6, 141, 171)", // Light gray background
  padding: "0px 20px", // Inner spacing
  boxShadow: "2px 0 5px rgba(103, 103, 103, 0.6)", // Subtle shadow for depth
  overflowY: "auto", // Scrollable sidebar if content exceeds viewport
};



export default LoginCoachDashboard;
