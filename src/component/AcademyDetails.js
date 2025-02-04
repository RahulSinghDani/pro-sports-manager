import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import './Style.css';
import './AcademyNavbar.css';
import AcademyNavbar from './AcademyNavbar.js';
import { styles } from './Style.js';
import GroundImage from './Images/ground2.jpg';
import InstagramPng from './Images/instapng.png';
import YoutubePng from './Images/ytpng.png';
import FacebookPng from './Images/fbpng.png';
import LocationImg from './Images/locationIcon.jpg';
import DilarImg from './Images/phone-call.png';
import About from './About.js';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { motion } from "framer-motion";
import CricketGraph from './CricketGraph.js';
import NewsForm from './NewsForm.js';

const useIncrementalCount = (targetValue, duration = 1000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = targetValue / (duration / 10);
    const interval = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setCount(targetValue);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 10);
    return () => clearInterval(interval);
  }, [targetValue, duration]);

  return count;
};
const AcademyDetails = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { role, academyId } = useParams(); // Get the academy_id from the URL

  const [academyData, setAcademy] = useState(null);
  const [error, setError] = useState();
  // const [totalPlayers, setTotalPlayers] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [playerCount, setPlayerCount] = useState({});
  const [coachCount, setCoachCount] = useState(0);
  const [totalPlayer, setTotalPlayer] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);

  const animatedRevenue = useIncrementalCount(revenue);
  const animatedCoachCount = useIncrementalCount(coachCount.totalCoach);
  const animatedTotalPlayer = useIncrementalCount(totalPlayer.countTotalPlayer);
  const animatedTotalCourses = useIncrementalCount(totalCourses.countTotalCourses);
  // console.log("total : ",totalCourses.countTotalCourses);
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/revenue/${academyId}`)
      .then(response => {
        setRevenue(response.data.YTD_Revenue || 0);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to load revenue details.');
      });
  })

  // player display according to under 10 ,12 , 14, 16
  useEffect(() => {
    const fetchPlayerCount = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/player-count/${academyId}`);
        const data = await response.json();
        setPlayerCount(data);
      } catch (error) {
        console.error("Error fetching player count:", error);
      }
    };

    fetchPlayerCount();
  }, [API_BASE_URL, academyId]);

  //fetch courses count 
  useEffect(() => {
    const fetchCoursesCount = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/total-courses/${academyId}`);
        const data = await response.json();
        setTotalCourses(data);
      } catch (error) {
        console.error("Error fetching courses count:", error);
      }
    };

    fetchCoursesCount();
  }, [API_BASE_URL, academyId]);

  //fetching coach count 
  useEffect(() => {
    const fetchCoachCount = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/coach-count/${academyId}`);
        const data = await response.json();
        setCoachCount(data);
      } catch (error) {
        console.error("Error fetching coach count:", error);
      }
    };

    fetchCoachCount();
  }, [API_BASE_URL, academyId]);

  //fetch total player count 
  useEffect(() => {
    const fetchTotalPlayer = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/count-total-player/${academyId}`);
        const data = await response.json();
        setTotalPlayer(data);
      } catch (error) {
        console.error("Error fetching coach count:", error);
      }
    }
    fetchTotalPlayer();
  })


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
  }, [API_BASE_URL, academyId]);

  const pageVariants = {
    initial: { x: "-100vw", opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
    exit: { x: "100vw", opacity: 0, transition: { ease: "easeInOut", duration: 0.5 } }
  };
  if (error) {
    return <div>{error}</div>;
  }

  if (!academyData) {
    return <div>Loading...</div>;
  }



  //-----------------------------------------

  // Map code Here

  //--------------------------------------------
  return (
    <div >
      {/* <aside className="w-64 bg-gray-900 text-white h-screen p-5 sticky top-0 md:block hidden"> */}
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants} >
          <AcademyNavbar role={role} academyId={academyId} />
        </motion.div>
      <div className='below-navbar'>
        {/* Dashboard Boxes */}
        <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} >

          <div id="dashboard-boxes">
            <div className="dashboard-box">
              <h3>Total Players</h3>
              <p className='countdown-numbers'>{animatedTotalPlayer}</p>
            </div>
            <div className="dashboard-box">
              <h3>New Players MTD</h3>
              <p className='countdown-numbers'>{animatedTotalPlayer}</p>
            </div>
            <div className="dashboard-box">
              <h3>YTD Revenue</h3>
              <p className='countdown-numbers'>₹ {animatedRevenue}</p>
            </div>
          </div>
        </motion.div>
        <div className='academy-img' alt="Ground"
          style={{
            marginTop: '10px',
            width: '100%', // Makes the image responsive and fills the width of its container
            height: 'auto', // Maintains aspect ratio
            borderRadius: '10px', // Optional: Adds rounded corners to the image
            // boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Optional: Adds a subtle shadow
            objectFit: 'cover', // Optional: Ensures the image covers the container area without stretching
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // padding:'12px 12px',
          }}>
          {/* <img src={academyData.images || GroundImage} style={{ width: '800px' }} alt='Loading...'></img> */}
          <img
            src={
              academyData.images?.startsWith('http') // Check if it's a valid URL
                ? academyData.images // Use the provided link if valid
                : `${API_BASE_URL}/uploads/${academyData.images}` // Construct the file path
            }
            style={{ width: '50%',borderRadius:'20px' }}
            alt="Loading..."
            onError={(e) => { e.target.src = GroundImage; }} // Fallback image
          />

          <div className='news-form-div'>
            <NewsForm role={role} academyId={academyId} />
          </div>
        </div>
        <h2 style={styles.heading}>{academyData.name}</h2>


        <div >

          {/* Academy Details */}
          <div className="academy-details">
            <div className='graph-container-academy-page'>
              <CricketGraph academyId={academyId} />
            </div>
            {/* display under 10 ,12, 14, and 16 players  */}
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
                  <h3 className="info-title">Total Coach</h3>
                  <p className="info-count">{animatedCoachCount}</p>
                </div>

                <div className="info-card">
                  <h3 className="info-title">Total Player</h3>
                  <p className="info-count">{animatedTotalPlayer}</p>
                </div>
                <div className="info-card">
                  <h3 className="info-title">Total Courses</h3>
                  <p className="info-count">{animatedTotalCourses}</p>
                </div>
              </div>

            </div>

          </div>

          <div className='academy-details-home'>
            <div className="detail-box">
              <h3>Academy ID</h3>
              <p>{academyData.id}</p>
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
              <div style={styles.logoDiv}>
                <img src={FacebookPng} alt='Loading...' style={styles.logoPng} />
                <img src={InstagramPng} alt='Loading...' style={styles.logoPng} />
                <img src={YoutubePng} alt='Loading...' style={styles.logoPng} />
              </div>

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

                {/* <div className="iframe-container" >
              <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3462.366048682458!2d-90.82593452445572!3d29.795967475049693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjnCsDQ3JzQ1LjUiTiA5MMKwNDknMjQuMSJX!5e0!3m2!1sen!2sin!4v1734450765738!5m2!1sen!2sin"
                style={{ width: "600px", height: "400px", border: "0px" }} loading="lazy" frameBorder="0" allowFullScreen></iframe>

            </div> */}
                <div className="iframe-container">
                  <h3 className='heading'>ACADEMY LOCATION</h3>
                  <LoadScript googleMapsApiKey="AIzaSyB0bx0i1japWV7bxcN5tVXXGuo7EVqLyDA">
                    <GoogleMap
                      mapContainerStyle={{
                        width: '600px',
                        height: '300px',
                      }}
                      zoom={10}
                      center={{
                        lat: parseFloat(academyData.latitude), // Convert latitude to a float
                        lng: parseFloat(academyData.longitude), // Convert longitude to a float
                      }}
                    >
                      <Marker
                        position={{
                          lat: parseFloat(academyData.latitude), // Marker latitude
                          lng: parseFloat(academyData.longitude), // Marker longitude
                        }}
                      />
                    </GoogleMap>
                  </LoadScript>
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
