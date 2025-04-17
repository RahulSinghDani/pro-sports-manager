import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import cricketBg from "./Images/cricketBg.jpg"; // Import the background image
import { useParams, Link } from 'react-router-dom';
import defaultImage from "./Images/playerpng.png"; // Import the default image
import About from './About';
import logo from "./Images/logo.png";

const PlayerDetails = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const { academyId, id, role, name } = useParams();
    // console.log("player id: ", id);
    // const [totalPlayers, setTotalPlayers] = useState(0);
    const [playerData, setPlayerData] = useState({});
    const [outstandingFee, setOutstandingFee] = useState(0);
    const [players, setPlayers] = useState({});

    //fetch cricket data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/cricket-data/player/${academyId}/${id}`, { withCredentials: true });
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
                const response = await axios.get(`${API_BASE_URL}/api/outstanding-fee/${academyId}/${id}`, { withCredentials: true });
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
                const response = await axios.get(`${API_BASE_URL}/api/allPlayers/${academyId}/${id}`, { withCredentials: true });
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
                <Link to={`/AcademyDetails/${role}/${academyId}/Player`}><button id="playerDashboard" style={{ background: "rgb(30, 30, 30)", float: "right" }}>Back</button></Link>
            </h2>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                    
                    {/* Player Details Section */}
                    {(
                        <div style={playerDetailsContainerStyle}>
                            <div style={{ background: "rgb(0,0,0)", borderRadius: "10px", paddingTop: "4px", paddingBottom: "4px", color: "white" }}>
                                <h3 style={{ color: 'white' }}>Player: {playerData.name}</h3>
                                <h5>Sports Expertise: {playerData.sports_expertise}</h5>
                            </div>
                            <div style={playerInfoStyle}>
                                {/* Second Column */}
                                <div className='player-details-img-part' style={{ textAlign: "center", margin: "5px" }}>
                                    <img
                                        src={playerData.profile_pic ? `${API_BASE_URL}/uploads/${playerData.profile_pic}` : defaultImage}
                                        alt="Player"
                                        style={{ width: "160px",height:'200px', borderRadius: "10px", marginBottom: "60px", pointerEvents: "none", userSelect: "none", cursor: 'not-allowed' }}
                                        onDoubleClick={(e) => e.preventDefault()} // Prevents double-click
                                        onContextMenu={(e) => e.preventDefault()} // Disables right-click (prevents download)
                                        draggable="false" // Prevents drag & drop
                                    />
                                    <p><strong>School:</strong> {playerData.school_name}</p>
                                    <p><strong>Outstanding Fee:</strong> {outstandingFee.playerOutstandingFee || 0}</p>
                                </div>

                                {/* Third Column */}
                                <div className='player-details-cricket-score-card'>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <strong>Matches: </strong>
                                                <td>{players.matches_played || 0}</td>
                                            </tr>
                                            <tr><strong>Runs: </strong>
                                                <td>{players.runs || 0}</td></tr>
                                            <tr><strong>Wickets: </strong>
                                                <td>{players.wickets || 0}</td></tr>
                                        </tbody>
                                    </table>
                                    <Link to={`/player-cricket-data/${role}/${academyId}/${id}/${name}`} style={buttonStyle}> Add Sports Details</Link>
                                </div>

                                {/* First Column */}
                                <div style={{ background: 'rgb(224, 224, 224)', borderRadius: '40px', padding: '12px' }}>
                                    <h3>Player Details</h3>
                                    <div className='player-details-seperate-style' >

                                        <div className='details-of-player-v1' >
                                            <p><strong>Player ID:</strong> {playerData.id}</p>
                                            <p><strong>Name:</strong> {playerData.name || "N/A"}</p>
                                            <p><strong>Joined On:</strong> 20 Jan 2023</p>
                                            <p><strong>Batch:</strong> {playerData.batch}</p>

                                            <p><strong>Fee Mode:</strong> Monthly</p>
                                            <p><strong>Fee :</strong> 10000</p>
                                            <p><strong>Age:</strong> {calculateAge(playerData.dob)}</p>
                                        </div>
                                        <div className='details-of-player-v1' >
                                            <p><strong>Father :</strong> {playerData.father_name}</p>
                                            <p><strong>Mother :</strong> {playerData.mother_name}</p>
                                            <p><strong>Player Ph No:</strong> {playerData.phone_number}</p>
                                            <p><strong>Father's Ph No:</strong> {playerData.f_ph_num}</p>
                                            <p><strong>Mother's Ph No:</strong> {playerData.m_ph_num}</p>
                                        </div>
                                    </div>
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
    gap: '20px'
};

export default PlayerDetails