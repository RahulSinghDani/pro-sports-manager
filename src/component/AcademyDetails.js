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
import About from './About.js';

// import { Map, GoogleApiWrapper } from '@react-google-maps/api';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';



// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import Home from './Home.js';


const AcademyDetails = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL  ;

  const { role, academyId } = useParams(); // Get the academy_id from the URL

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



  //-----------------------------------------

  // Map code Here

  //--------------------------------------------
  return (
    <div >
      <AcademyNavbar role={role} academyId={academyId} />
      <div className='below-navbar'>

        <div className='academy-img' alt="Ground"
          style={{
            marginTop:'50px',
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
          <img src={GroundImage} style={{ width: '800px' }} alt='Loading...'></img>
          
        </div>
        <h2 style={styles.heading}>{academyData.name}</h2>
        {/* Dashboard Boxes */}
        <div id="dashboard-boxes">
          <div className="dashboard-box">
            <h3>Total Players</h3>
            <p>{totalPlayers}</p>
          </div>
          <div className="dashboard-box">
            <h3>New Players MTD</h3>
            <p>{totalPlayers}</p>
          </div>
          <div className="dashboard-box">
            <h3>Total Fees Outstanding</h3>
            <p>--</p>
          </div>
        </div>




        {/* Academy Details */}
        <div className="academy-details">
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
            <h3>Location</h3>
            <p>
              Latitude: {academyData.latitude} <br></br>
              Longitude: {academyData.longitude}
            </p>
          </div>
          <div style={styles.logoDiv}>
            <img src={FacebookPng} alt='Loading...' style={styles.logoPng} />
            <img src={InstagramPng} alt='Loading...' style={styles.logoPng} />
            <img src={YoutubePng} alt='Loading...' style={styles.logoPng} />
          </div>

          {/* map  */}
          <h3 style={styles.heading}>VENUE LOCATION</h3>
          <div style={styles.map}>

            <div style={{ gap: "12px" }}>

              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <img src={LocationImg} alt='academy icon' style={{ marginLeft: '10px', width: '12px', borderRadius: '50%' }} />

                <p>{academyData.address}</p>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <p style={{textAlign:'center'}}>phone Number: {academyData.phone_num}</p>
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
      <About />
    </div >

  );
};

export default AcademyDetails;
