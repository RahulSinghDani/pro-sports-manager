import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import cricketBg from "./Images/cricketBg.jpg"; // Import the background image
import { useParams, Link } from 'react-router-dom';
import defaultImage from "./Images/playerpng.png"; // Import the default image
import About from './About';
const PlayerDetails = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const { academyId, id, role ,name} = useParams();
    console.log("player id: ", id);
    // const [totalPlayers, setTotalPlayers] = useState(0);
    const [playerData, setPlayerData] = useState({});
    const [outstandingFee, setOutstandingFee] = useState(0);
    const [players, setPlayers] = useState({});

//fetch cricket data
useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/cricket-data/player/${academyId}/${id}`);
        // If response is array, take the first element
        setPlayers(response.data[0] || {});
      } catch (error) {
        console.error("Error fetching cricket data:", error);
      }
    };
    fetchData();
  }, [API_BASE_URL, academyId, id]);
  
    // useEffect(() => {
    //     const fetchTotalPlayers = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `${API_BASE_URL}/api/totalPlayers`
    //             );
    //             setTotalPlayers(response.data.total);
    //         } catch (error) {
    //             console.error("Error fetching total players count:", error);
    //         }
    //     };

    //     fetchTotalPlayers();
    // }, [API_BASE_URL]);


    //player outstanding fee 
    useEffect(() => {
        const fetchPlayerOutstandingFee = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/outstanding-fee/${academyId}/${id}`);
                setOutstandingFee(response.data);
            } catch (error) {
                console.error("Error fetching outstanding fee records:", error);
            }
        };

        fetchPlayerOutstandingFee();
    }, [API_BASE_URL, academyId, id]);

    //Player by academy id AND id
    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/allPlayers/${academyId}/${id}`);
                setPlayerData(response.data);
            } catch (error) {
                console.error("Error fetching Data : ", error);
            }
        };
        fetchPlayerData();
    }, [API_BASE_URL, academyId, id]);

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        const years = today.getFullYear() - birthDate.getFullYear();
        const months = today.getMonth() - birthDate.getMonth();
        const ageYears = years - (months < 0 ? 1 : 0);
        const ageMonths = (months < 0 ? 12 + months : months);
        return `${ageYears} years ${ageMonths} months`;
    };

    return (
        <div style={{ backgroundImage: `url(${cricketBg})`, backgroundSize: 'cover', minHeight: '100vh' }}>
            {/* <Link to={`/AcademyDetails/${academyId}/Player`}>Back</Link> */}


            <h2 className="heading" style={{ textAlign: "center", background: "black", color: "white", padding: "8px 8px", width: "100%" }}>
                Player Dashboard
                <Link to={`/AcademyDetails/${role}/${academyId}/Player`}><button id="playerDashboard" style={{ background: "rgb(30, 30, 30)", float: "right" }}>Go Back</button></Link>
            </h2>

            <div className="container" style={{ display: "flex", justifyContent: "center" }}>
                <div>



                    {/* Player Details Section */}
                    {(
                        <div style={playerDetailsContainerStyle}>
                            <div style={{ background: "rgb(0,0,0)", borderRadius: "10px", paddingTop: "4px", paddingBottom: "4px", color: "white" }}>
                                <h2>Player: {playerData.name}</h2>
                                <h4>Sports Expertise: {playerData.sports_expertise}</h4>
                            </div>
                            <div style={playerInfoStyle}>
                                {/* First Column */}
                                <div style={{ textAlign: "left", padding: "8px 12px", background: "rgb(232,232,232)", borderRadius: "14px" }}>
                                    <p><strong>Player ID:</strong> {playerData.id}</p>
                                    <p><strong>Name:</strong> {playerData.name || "N/A"}</p>
                                    <p><strong>Joined On:</strong> 20 Jan 2023</p>
                                    <p><strong>Batch:</strong> {playerData.batch}</p>

                                    <p><strong>Fee Mode:</strong> Monthly</p>
                                    <p><strong>Fee Amount:</strong> 10000</p>
                                    <p><strong>Age:</strong> {calculateAge(playerData.dob)}</p>

                                    <br></br>
                                    <br></br>
                                    {/* Parent Details */}
                                    <h3>Player Parents Details</h3>
                                    <p><strong>Father's Name:</strong> {playerData.father_name}</p>
                                    <p><strong>Mother's Name:</strong> {playerData.mother_name}</p>
                                    <p><strong>Phone Number:</strong> {playerData.phone_number}</p>
                                </div>

                                {/* Second Column */}
                                <div style={{ textAlign: "center", margin: "5px" }}>
                                    <img
                                        src={playerData.profile_pic ? `${API_BASE_URL}/uploads/${playerData.profile_pic}` : defaultImage}
                                        alt="Player"
                                        style={{ width: "150px", borderRadius: "10px", marginBottom: "60px", pointerEvents: "none", userSelect: "none" ,cursor:'not-allowed'}}
                                        onDoubleClick={(e) => e.preventDefault()} // Prevents double-click
                                        onContextMenu={(e) => e.preventDefault()} // Disables right-click (prevents download)
                                        draggable="false" // Prevents drag & drop
                                    />

                                    <p><strong>School:</strong> {playerData.school_name}</p>
                                    <p><strong>Outstanding Fee:</strong> {outstandingFee.playerOutstandingFee || 0}</p>
                                </div>

                                {/* Third Column */}
                                <div>
                                    <div className="table-wrapper">
                                        <table style={tableStyle}>
                                            <tbody>
                                                <tr>
                                                    <td><strong>Matches: </strong> {players.matches_played || 0}</td>
                                                    <td><strong>Runs: </strong> {players.runs || 0}</td>
                                                    <td><strong>Wickets: </strong>{players.wickets || 0}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <Link to={`/player-cricket-data/${role}/${academyId}/${id}/${name}`} style={buttonStyle}> Add Sports Details</Link>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

            </div>
            <About />
        </div>
    );
}

const buttonStyle = {
    margin: "8px",
    padding: "10px 20px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
};

const playerDetailsContainerStyle = {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#f9f9f9",
    textAlign: "center",
};

const playerInfoStyle = {
    background: "rgb(250,250,250)",
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
};

const tableStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "30vh",
    width: "100%",
    borderCollapse: "collapse",
    // border:"2px solid black",
    marginTop: "10px",
};
export default PlayerDetails