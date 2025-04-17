import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AcademyNavbar.css';
import AcademyNavbar from './AcademyNavbar.js';
import { styles } from './Style.js';
import DefaultImage from './Images/cricket-players.jpg';
import InstagramPng from './Images/instapng.png';
import YoutubePng from './Images/ytpng.png';
import FacebookPng from './Images/fbpng.png';
import LocationImg from './Images/locationIcon.jpg';
import DilarImg from './Images/phone-call.png';
import About from './About.js';
import CricketGraph from './CricketGraph.js';
import NewsForm from './NewsForm.js';
import MapPng from './Images/map-png.png';

const AcademyDetails = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { role, academyId } = useParams(); // Get the academy_id from the URL

  const [academyData, setAcademy] = useState(null);
  const [error, setError] = useState();
  const [revenue, setRevenue] = useState(0);
  const [playerCount, setPlayerCount] = useState({});
  const [coachCount, setCoachCount] = useState(0);
  const [totalPlayer, setTotalPlayer] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);

  const [newPlayerCount, setNewPlayerCount] = useState(0);
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/revenue/${academyId}`, { withCredentials: true })
      .then(response => {
        setRevenue(response.data.YTD_Revenue || 0);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to load revenue details.');
      });
  })

  useEffect(() => {
    const fetchPlayerCount = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/player-count/${academyId}`, { withCredentials: true });
        setPlayerCount(response.data);
      } catch (error) {
        console.error("Error fetching player count:", error);
      }
    };
    fetchPlayerCount();
  }, [API_BASE_URL, academyId]);

  // Fetch courses count
  useEffect(() => {
    const fetchCoursesCount = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/total-courses/${academyId}`, { withCredentials: true });
        setTotalCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses count:", error);
      }
    };
    fetchCoursesCount();
  }, [API_BASE_URL, academyId]);

  // Fetching coach count
  useEffect(() => {
    const fetchCoachCount = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/coach-count/${academyId}`, { withCredentials: true });
        setCoachCount(response.data);
      } catch (error) {
        console.error("Error fetching coach count:", error);
      }
    };
    fetchCoachCount();
  }, [API_BASE_URL, academyId]);

  const fetchNewPlayersCount = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/count-new-players-this-month/${academyId}`, {
        withCredentials: true
      });
      console.log("New players this month:", response.data.countNewPlayersThisMonth);
      setNewPlayerCount(response.data.countNewPlayersThisMonth);
    } catch (error) {
      console.error("Error fetching new players count:", error);
    }
  };
  // Fetch total player count
  useEffect(() => {
    const fetchTotalPlayer = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/count-total-player/${academyId}`, { withCredentials: true });
        setTotalPlayer(response.data);
      } catch (error) {
        console.error("Error fetching total player count:", error);
      }
    };
    fetchTotalPlayer();
    fetchNewPlayersCount();
  }, [API_BASE_URL, academyId]);

  
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/academicy/${academyId}`, { withCredentials: true })
      .then(response => {
        setAcademy(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error); // Log the error object
        setError('Failed to load academy details.');
      });
  }, [API_BASE_URL, academyId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!academyData) {
    return <div>Loading...</div>;
  }

  return (
    <div >
      <div className="fade-page">
        <AcademyNavbar role={role} academyId={academyId} />
      </div>

      <div className='below-navbar'>
        <div id="dashboard-boxes">
          <div className="dashboard-box">
            <h3>Total Players</h3>
            <p className='countdown-numbers'>{totalPlayer.countTotalPlayer}</p>
          </div>
          <div className="dashboard-box">
            <h3>New Players MTD</h3>
            <p className='countdown-numbers'>{newPlayerCount}</p>
          </div>
          <div className="dashboard-box">
            <h3>YTD Revenue</h3>
            <p className='countdown-numbers'>₹ {revenue}</p>
          </div>
        </div>

        <div className='academy-img' alt="Ground" >
          <img
            src={
              academyData.images?.startsWith('http') // Check if it's a valid URL
                ? academyData.images // Use the provided link if valid
                : `${API_BASE_URL}/uploads/${academyData.images}` // Construct the file path
            }
            className='academy-img-main'
            alt="Loading..."
            onError={(e) => { e.target.src = DefaultImage; }} // Fallback image
          />

          <div className='news-form-div'>
            <NewsForm role={role} academyId={academyId} />
          </div>
        </div>
        <h2 style={styles.heading}>{academyData.name}</h2>


        <div >
          <div className="academy-details">
            <div className='graph-container-academy-page'>
              <CricketGraph academyId={academyId} />
            </div>
            <div className="dashboard-container">
              <div className="category-card">
                <h3 className="category-title">Players Category</h3>
                <div className="category-list">
                  <div className="category-item"><span>Under 10: </span>  {playerCount.Under_10 || 0}</div>
                  <div className="category-item"><span>Under 12: </span>  {playerCount.Under_12 || 0}</div>
                  <div className="category-item"><span>Under 14: </span>  {playerCount.Under_14 || 0}</div>
                  <div className="category-item"><span>Under 16: </span>  {playerCount.Under_16 || 0}</div>
                  <div className="category-item"><span>Above 16: </span>  {playerCount.Above_16 || 0}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                <div className="info-card">
                  <h3 className="info-title">Total Coaches</h3>
                  <p className="info-count">{coachCount.totalCoach}</p>
                </div>

                <div className="info-card">
                  <h3 className="info-title">Total Players</h3>
                  <p className="info-count">{totalPlayer.countTotalPlayer}</p>
                </div>
                <div className="info-card">
                  <h3 className="info-title">Total Courses</h3>
                  <p className="info-count">{totalCourses.countTotalCourses}</p>
                </div>
              </div>
            </div>
          </div>
          <div style={styles.outerDiv}>
            <div style={styles.logoDiv}>
              <img src={FacebookPng} alt="Facebook" style={styles.logoPng} />
              <img src={InstagramPng} alt="Instagram" style={styles.logoPng} />
              <img src={YoutubePng} alt="YouTube" style={styles.logoPng} />
            </div>
          </div>
          <div className='academy-details-home'>
            <div className="detail-box">
              <h3>Address</h3>
              <p>{academyData.address}</p>
              <h3>Owner Name</h3>
              <p>{academyData.owner_name}</p>
              <h3>Phone Number</h3>
              <p>
                <a href={`tel:${academyData.phone_num}`}>{academyData.phone_num}</a>
              </p>
              <h3>Email</h3>
              <p>
                <a href={`mailto:${academyData.email}`}>{academyData.email}</a>
              </p>
              <h3>Website</h3>
              <p>
                <a href={academyData.website} target="_blank" rel="noopener noreferrer">{academyData.website}</a>
              </p>
              {/* <h3>Location</h3>
              <p>
                Latitude: {academyData.latitude} <br></br>
                Longitude: {academyData.longitude}
              </p> */}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              {/* <div style={styles.logoDiv}>
                <img src={FacebookPng} alt='Loading...' style={styles.logoPng} />
                <img src={InstagramPng} alt='Loading...' style={styles.logoPng} />
                <img src={YoutubePng} alt='Loading...' style={styles.logoPng} />
              </div> */}

              {/* map  */}

              {/* <h3 style={styles.heading}>VENUE LOCATION</h3> */}
              <div style={styles.map}>

                <div style={{ gap: "12px" }}>

                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <img src={LocationImg} alt='academy icon' style={{ marginLeft: '10px', width: '20px', borderRadius: '50%' }} />

                    <p>{academyData.address}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <img src={DilarImg} alt='academy icon' style={{ marginLeft: '10px', width: '20px', borderRadius: '50%' }} />
                    <p style={{ textAlign: 'center' }}>Phone Number: {academyData.phone_num}</p>
                  </div>
                </div>

                <div className='map-image-link'>
                  {academyData.address ? (
                    // If a valid link is available, check if it's a Google Maps link
                    academyData.address.startsWith('https') ? (
                      // Display the map image as a link that redirects to the location in Google Maps
                      <a href={academyData.address} target="_blank" rel="noopener noreferrer">
                        <img
                          src={MapPng}
                          alt="Map"
                          style={{ width: '400px', height: '180px', cursor: 'pointer', boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} // Style the image link
                        />
                      </a>
                    ) : (
                      // Fallback to dynamic Google Maps search link
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(academyData.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={MapPng}
                          alt="Map"
                          style={{ width: '400px', height: '180px', cursor: 'pointer', boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} // Style the image link
                        />
                      </a>
                    )
                  ) : (
                    <p>No location available.</p> // Show message if no location is provided
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <About />
    </div >

  );
};

export default AcademyDetails;
