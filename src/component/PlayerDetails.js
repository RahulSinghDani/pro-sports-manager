import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import cricketBg from "./Images/cricketBg.jpg"; // Import the background image
import { useParams, Link } from 'react-router-dom';
import defaultImage from "./Images/playerpng.png"; // Import the default image
import About from './About';
const PlayerDetails = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const { academyId, id, role } = useParams();
    const [totalPlayers, setTotalPlayers] = useState(0);
    const [playerData, setPlayerData] = useState({});



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
                                        src={playerData.profile_pic || defaultImage}
                                        // src={defaultImage}
                                        alt="Player"
                                        style={{ width: "150px", borderRadius: "10px", marginBottom: "60px" }}
                                    />

                                    <p><strong>School:</strong> {playerData.school_name}</p>
                                    <p><strong>Outstanding Fee:</strong> 10000</p>
                                </div>

                                {/* Third Column */}
                                <div>
                                    <div className="table-wrapper">
                                        <table style={tableStyle}>
                                            <tbody>
                                                <tr>
                                                    <td><strong>Matches:</strong> 10</td>
                                                    <td><strong>Runs:</strong> 120</td>
                                                    <td><strong>Wickets:</strong> 12</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <button style={buttonStyle}>Collect Fee</button>
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