import React, { useEffect, useState } from 'react';
import { styles } from './Style';

import axios from 'axios';
import { Link } from 'react-router-dom';


import './Style.css';
import defaultprofile from "./Images/playerpng.png"; // Import the background image



const HomeAllPlayerDashboard = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
    const [players, setPlayers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Add a loading state

    // const calculateAge = (dob) => {
    //     const birthDate = new Date(dob);
    //     const today = new Date();
    //     const years = today.getFullYear() - birthDate.getFullYear();
    //     const months = today.getMonth() - birthDate.getMonth();
    //     const ageYears = years - (months < 0 ? 1 : 0);
    //     const ageMonths = (months < 0 ? 12 + months : months);
    //     return `${ageYears} years ${ageMonths} months`;
    // };
    

    useEffect(() => {
        // Fetch player data from the backend
        axios
            .get(`${API_BASE_URL}/api/allplayer`)
            .then(response => {
                setPlayers(response.data); // Set the fetched player data
                setLoading(false); // Stop loading
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to load player details.');
                setLoading(false); // Stop loading even on error
            });
    }, [API_BASE_URL]);

    // Show loading spinner or message while fetching data
    if (loading) {
        return <div>Loading...</div>;
    }

    // Show error message if there was an issue fetching data
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div >
            <nav className='nav'>
                <Link to={`/`}><h1 className='logo'>Pro Sports Manager</h1></Link>
                <Link to={`/`}>
                    <button style={{ background: "rgb(35, 38, 41)", float: "right",fontWeight:'bold' }}>Home</button>
                </Link>
            </nav>
            <p className="heading" style={{ fontWeight: 'bold', textAlign: "center", color: "black" }}>  Player Dashboard </p>

            <div className="container" style={{ display: "flex", justifyContent: "center" }}>

                {/* all player */}

                {players.length === 0 ? (
                    <p>No Players found for this academy.</p>
                ) : (
                    <div className='sports-container'>
                        {players.map((player) => (
                            <div key={player.id} className="sports-box" style={styles.playerBoxStyle}>
                                <p ><img src={defaultprofile} alt='Loading...' style={{ width: '50px', height: 'auto', borderRadius: '50%' }}></img></p>


                                <h3>{player.name}</h3>
                                {/* <p><strong>Age:</strong> {calculateAge(player.dob)}</p> */}
                                <p><strong>Sports Expertise</strong> {player.sports_expertise}</p>
                                <p>ID: {player.id}</p>
                                {/* <p>DOB: {player.dob}</p> */}
                                <p>Gender: {player.gender}</p>
                                <p>Batch: {player.batch}</p>

                                <Link>
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
                {/* ------------------------- */}

            </div>
        </div>
    );
}

export default HomeAllPlayerDashboard;