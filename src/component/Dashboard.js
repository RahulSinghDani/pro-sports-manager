import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './Style.css';
import { styles } from './Style';
import academyIcon from "./Images/academy_png.png"; // Import the academy image
import About from './About';

const Dashboard = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const { role } = useParams();
    const [academicData, setAcademicData] = useState([]);
    const [totalPlayers, setTotalPlayers] = useState(0);

    // console.log(role);
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
        // Fetch academic data from the backend
        axios.get(`${API_BASE_URL}/api/dasboard`)
            .then(response => {
                setAcademicData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the academic data!', error);
            });
    }, [API_BASE_URL]);

    return (
        <div className='body'>
            {/* <div className='body' style={{ backgroundImage: `url(${dashboardBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}> */}
            {/* style={{background:"rgb(72,72,72)", color:'white'}} */}
            < Navbar role={role} />
            {/* <h1 style={{background:"blue" , color:"white"}}>Pro Sports Academy</h1> */}


            <div>

                <div className='below-navbar-home'>
                    <h2>Welcome to the Academic Dashboard</h2>
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
                            <p style={{ background: "rgb(199,204,206)", borderRadius: '14px', padding: '4px 4px' }}>60000</p>
                        </div>
                    </div>
                    <h2>Academy Information</h2>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                        <Link to={`/add-academy/${role}`} >
                            <button>Add a New Academy</button>
                        </Link>
                        <Link to={`/delete-academy/${role}`}>
                            <button>Delete Academy</button>
                        </Link>
                        <Link to={`/edit-academy/${role}`}>
                            <button>Edit Academy</button>
                        </Link>

                    </div>


                </div>
                <div className="container" style={{ background: 'rgb(255, 255, 255)', display: "flex", flexDirection: 'row', justifyContent: "center" }}>
                    {/* all player */}

                    {academicData.length === 0 ? (
                        <p>No Academy found.</p>
                    ) : (
                        <div style={styles.playersContainerStyle}>
                            {academicData.map((item, index) => (
                                <div key={item.academy_id} className='playerBoxStyle'>
                                    <Link to={`/AcademyDetails/${role}/${item.academy_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <p > <img src={academyIcon} alt='Loading...' style={{ width: '100px', height: '50px', borderRadius: '50%' }}></img></p>


                                        <h3>{item.academy_name}</h3>
                                        <p><strong>Academy ID:</strong> {item.academy_id}</p>
                                        <p>Owner: {item.academy_owner}</p>
                                        <p>Contact: <a href={`tel:${item.academy_phone}`}>
                                            {item.academy_phone}
                                        </a></p>
                                        <p>Email: <a href={`mailto:${item.academy_email}`}>
                                            {item.academy_email}
                                        </a></p>

                                        <p
                                        // to={`/LoginPlayerDashboard/${role}/${academy_id}/${player.id}`} state={{ coachId: coachId }} // State is passed here
                                        // style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}
                                        >
                                            View Details
                                        </p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div style={styles.tableDiv}></div>
                <div className="table-wrapper">
                <p style={{ textAlign: 'center', color: 'blue' }}>Click on <span style={{ color: 'red' }}>(Academy Id or Academy Name)</span> to view the information.</p>

                    <table border="1" className='table-main'>
                        <thead>
                            <tr>
                                <th>Academy ID</th>
                                <th>Academy Name</th>
                                <th>Owner</th>
                                <th>Phone</th>
                                <th>Email</th>
                                {/* <th>Location</th> */}
                                {/* <th>Website</th> */}

                            </tr>
                        </thead>
                        <tbody className='table-main' style={{ background: 'white' }}>
                            {academicData.map((item, index) => (
                                <tr key={item.academy_id || index}>
                                    <td>
                                        <Link to={`/AcademyDetails/${role}/${item.academy_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <b> {item.academy_id}</b>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/AcademyDetails/${role}/${item.academy_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <b>{item.academy_name}</b>
                                        </Link>
                                    </td>
                                    <td>{item.academy_owner}</td>
                                    {/* for call */}
                                    <td>
                                        <a href={`tel:${item.academy_phone}`}>
                                            {item.academy_phone}
                                        </a>
                                    </td>
                                    {/* for mail */}
                                    <td>
                                        <a href={`mailto:${item.academy_email}`}>
                                            {item.academy_email}
                                        </a>
                                    </td>
                                    {/* used for link , open in browser */}
                                    {/* <td>
                                    <a href={item.academy_website} target="_blank" rel="noopener noreferrer">
                                        {item.academy_website}
                                    </a>
                                </td> */}

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
            <About />
        </div>
    )
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
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"

};

export default Dashboard;