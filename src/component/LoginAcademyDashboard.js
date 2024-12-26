import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import './Style.css';
import './AcademyNavbar.css';
import AcademyNavbar from './AcademyNavbar.js';

const LoginAcademyDashboard = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

    const { id: academyId ,role} = useParams();
    const [academyData, setAcademy] = useState(null); // Use an object for a single academy
    const [error, setError] = useState();
    const [totalPlayers, setTotalPlayers] = useState(0);


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
        // Fetch specific academic data from the backend
        axios
            .get(`${API_BASE_URL}/api/academicy/${academyId}`)
            .then(response => {
                setAcademy(response.data); // Save the academy object
            })
            .catch(error => {
                console.error('Error fetching data:', error); // Log the error object
                setError('Failed to load academy details.');
            });
    }, [API_BASE_URL ,academyId]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!academyData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            < AcademyNavbar academyId={academyId} role={role}/>
            <div className='container'>
                <h2>{academyData.name}</h2>
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
                <table border="1" width="700px">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Owner Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Website</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{academyData.id}</td>
                            <td>{academyData.name}</td>
                            <td>{academyData.address}</td>
                            <td>{academyData.owner_name}</td>
                            <td>
                                <a href={`tel:${academyData.phone_num}`}>
                                    {academyData.phone_num}
                                </a>
                            </td>
                            <td>
                                <a href={`mailto:${academyData.email}`}>
                                    {academyData.email}
                                </a>
                            </td>
                            <td>
                                <a href={academyData.website} target="_blank" rel="noopener noreferrer">
                                    {academyData.website}
                                </a>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
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
export default LoginAcademyDashboard