import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultImage from "./Images/playerpng.png"; // Import the default image
import { Link, useParams } from "react-router-dom";
import cricketBg from "./Images/cricketBg.jpg"; // Import the background image

const AllPlayers = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL  ;

    const { role } = useParams();
    // console.log(role);

    const [totalPlayers, setTotalPlayers] = useState(0);

    const [searchId, setSearchId] = useState("");
    const [searchName, setSearchName] = useState("");
    const [playerDetails, setPlayerDetails] = useState(null);
    const [error, setError] = useState("");
    // const[playerData , setPlayerData] = useState([]);


    // const [playerData, setPlayerData] = useState([]);
    // useEffect(() => {
    //     setPlayerData1([
    //         { id: 1, name: "John Doe", phone_number: "1234567890", batch: "A" },
    //         { id: 2, name: "Jane Smith", phone_number: "9876543210", batch: "B" }
    //     ]);
    // }, []);

    // useEffect(() => {
    //     const fetchAllPlayers = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:5000/api/allPlayers");
    //             console.log("API Response:", response.data);
    //             setPlayerData(response.data.players || []);
    //         } catch (error) {
    //             console.error("Error fetching players data:", error);
    //         }
    //     };

    //     fetchAllPlayers();
    // }, []);


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

    const fetchPlayerById = async () => {
        if (!searchId) {
            setError("Please enter a Player ID to search.");
            return;
        }

        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/playerDetailsById/${searchId}`
            );
            setPlayerDetails(response.data);
            setError("");
        } catch (error) {
            console.error("Error fetching player details by ID:", error);
            setError("Player not found or error fetching details.");
            setPlayerDetails(null);
        }
    };

    const fetchPlayerByName = async () => {
        if (!searchName) {
            setError("Please enter a Player Name to search.");
            return;
        }

        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/playerDetailsByName/${searchName}`
            );
            setPlayerDetails(response.data);
            setError("");
        } catch (error) {
            console.error("Error fetching player details by name:", error);
            setError("Player not found or error fetching details.");
            setPlayerDetails(null);
        }
    };

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

            <h2 className="heading" style={{ textAlign: "center", background: "black", color: "white", padding: "8px 8px", width: "100%" }}>
                Players Dashboard
                <Link to={`/Dashboard/${role}`}><button id="playerDashboard" style={{ background: "black", float: "right" }}>Go to Dashboard</button></Link>
            </h2>
            {/* <Link to={`/Dashboard`}><button id="playerDashboard" style={{background:"black", float:"right"}}>Go to Dashboard</button></Link> */}

            <div className="container" style={{ display: "flex", justifyContent: "center" }}>
                <div>
                    <div id="dashboard-boxes" style={{ display: "flex", gap: "20px", justifyContent: 'center', alignItems: 'center', marginBottom: "20px" }}>
                        {/* Total Players Box */}
                        <div style={boxStyle}>
                            <h3 style={{ padding: '5px 5px', borderRadius: '12px', height: '50px' }}>Total Players</h3>
                            <p style={{ background: "rgb(199,204,206)", borderRadius: '14px', padding: '4px 4px' }}>{totalPlayers}</p>
                        </div>
                        <div style={boxStyle}>
                            <h3 style={{ padding: '5px 5px', borderRadius: '12px', height: '50px' }}>New Players MTD</h3>
                            <p style={{ background: "rgb(199,204,206)", borderRadius: '14px', padding: '4px 4px' }}>{totalPlayers}</p>
                        </div>
                        <div style={boxStyle}>
                            <h3 style={{ padding: '5px 5px', borderRadius: '12px', height: '50px' }}>Total Fees Outstanding</h3>
                            <p style={{ background: "rgb(199,204,206)", borderRadius: '14px', padding: '4px 4px' }}>--</p>
                        </div>
                    </div>
                    {/* Search Player */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {/* Search by ID */}
                        <input
                            type="text"
                            placeholder="Enter Player ID"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            style={inputStyle}
                        />
                        <button onClick={fetchPlayerById} style={buttonStyle}>
                            Search by ID
                        </button>
                        {/* Search by Name */}
                        <input
                            type="text"
                            placeholder="Enter Player Name"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            style={inputStyle}
                        />
                        <button onClick={fetchPlayerByName} style={buttonStyle}>
                            Search by Name
                        </button>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>

                    {/* Player Details Section */}
                    {playerDetails && (
                        <div style={playerDetailsContainerStyle}>
                            <div style={{ background: "rgb(0,0,0)", borderRadius: "10px", paddingTop: "4px", paddingBottom: "4px", color: "white" }}>
                                <h2>Player: {playerDetails.name}</h2>
                                <h4>Sports Expertise: {playerDetails.sports_expertise}</h4>
                            </div>
                            <div style={playerInfoStyle}>
                                {/* First Column */}
                                <div style={{ textAlign: "left", padding: "8px 12px", background: "rgb(232,232,232)", borderRadius: "14px" }}>
                                    <p><strong>Player ID:</strong> {playerDetails.id}</p>
                                    <p><strong>Name:</strong> {playerDetails.name}</p>
                                    <p><strong>Joined On:</strong> 20 Jan 2023</p>
                                    <p><strong>Batch:</strong> {playerDetails.batch}</p>

                                    <p><strong>Fee Mode:</strong> Monthly</p>
                                    <p><strong>Fee Amount:</strong> 10000</p>
                                    <p><strong>Age:</strong> {calculateAge(playerDetails.dob)}</p>

                                    <br></br>
                                    <br></br>
                                    {/* Parent Details */}
                                    <h3>Player Parents Details</h3>
                                    <p><strong>Father's Name:</strong> {playerDetails.father_name}</p>
                                    <p><strong>Mother's Name:</strong> {playerDetails.mother_name}</p>
                                    <p><strong>Phone Number:</strong> {playerDetails.phone_number}</p>
                                </div>

                                {/* Second Column */}
                                <div style={{ textAlign: "center" }}>
                                    <img
                                        // src={playerDetails.profile_pic || defaultImage}
                                        src={defaultImage}
                                        alt="Player"
                                        style={{ width: "150px", borderRadius: "10px", marginBottom: "60px" }}
                                    />

                                    <p><strong>School:</strong> {playerDetails.school_name}</p>
                                    <p><strong>Outstanding Fee:</strong> 10000</p>
                                </div>

                                {/* Third Column */}
                                <div>
                                    {/* <table style={tableStyle}>
                                        <tbody>
                                            <tr>
                                                <td><strong>Matches:</strong> 10</td>
                                                <td><strong>Runs:</strong> 120</td>
                                                <td><strong>Wickets:</strong> 12</td>
                                            </tr>
                                        </tbody>
                                    </table> */}
                                    <button style={buttonStyle}>Collect Fee</button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
                {/* <div className="allPlayers"> */}
                {/* <table style={{ width: "100%", borderCollapse: "collapse", opacity: 0.5 }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Batch</th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(playerData) && playerData.length > 0 ? (
                        playerData.map((player) => (
                            <tr key={player}>
                                <td>{player.id}</td>
                                <td>{player.name}</td>
                                <td>{player.phone_number}</td>
                                <td>{player.batch}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No player data available</td>
                        </tr>
                    )}
                </tbody>
            </table> */}

                {/* </div> */}
            </div>
        </div>
    );
};

// Other styles as per your original code...

// const centerStyle = {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh", // Full viewport height
//     width: "100vw",  // Full viewport width
//     margin: "0",     // Remove default margins
//     textAlign: "center", // Center text if needed
//     flexDirection: "column", // Stack items vertically
//     backgroundColor: "#f5f5f5" // Optional background color
// };

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

const inputStyle = {
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "300px",
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
    padding: "20px",
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

export default AllPlayers;
