import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import AcademyNavbar from './AcademyNavbar';

import cricket_kit from './Images/cricket-gear.jpg';
import football_kit from './Images/footballImage.jpg';
import basketball_kit from './Images/basketballImage.jpg';
// import archery_kit from './Images/archery-gear.jpg';
import gym_equipment from './Images/fitnessimg.jpg';
import badminton_kit from './Images/tennisImage.jpg';
// import skating_gear from './Images/skating-gear.jpg';
import swimming_pool_gear from './Images/swimmingImg.jpg';
import bowling_machine from './Images/bowling-machine.jpg';
import defaultImage from './Images/ground2.jpg';
const Asset = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

    const assetImageMap = {
        cricket_kit: cricket_kit,
        football_kit: football_kit,
        basketball_kit: basketball_kit,
        // archery_kit: archery_kit,
        gym_equipment: gym_equipment,
        badminton_kit: badminton_kit,
        // skating_gear: skating_gear,
        swimming_pool_gear: swimming_pool_gear,
        bowling_machine: bowling_machine,
        
      };
      
      const mapping = {
        "Football Kit": "football_kit",
        "Basketball Kit": "basketball_kit",
        "Cricket Kit": "cricket_kit",
        "Ball Throwing Machine": "bowling_machine",
        "Badminton Kit": "badminton_kit",
        "Shuttlecock Machine": "shuttlecock_machine",
        "Gym Equipment": "gym_equipment",
        "Swimming Pool Gear": "swimming_pool_gear",
        "Skating Gear": "skating_gear",
        "Rowing Machine": "rowing_machine",
        // Add more mappings as needed
    };
 

    const { academyId, role } = useParams(); // to get the academy id from URL
    const [asset, setAsset] = useState([]); // Change "Asset" to "asset" (lowercase first letter for consistency)
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Add a loading state

    const [assetBookings, setAssetBookings] = useState([]);


    useEffect(() => {
        // Fetch asset data from the backend
        axios
            .get(`${API_BASE_URL}/api/assets/${academyId}`)
            .then(response => {
                setAsset(response.data); // Set assets data from the response
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to load asset details.');
                setLoading(false); // Set loading to false if there's an error
            });
    }, [API_BASE_URL, academyId]);


    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/assets-bookings/${academyId}`) // Replace with your backend API
            .then((response) => {
                setAssetBookings(response.data);
            })
            .catch((error) => {
                console.error('Error fetching assetBookings:', error);
            });
    }, [API_BASE_URL, academyId]);

    if (loading) {
        return <div>Loading...</div>; // Show loading text while fetching
    }

    if (error) {
        return <div>{error}</div>; // Show error message if something goes wrong
    }

    // if (asset.length === 0) {
    //     return <div>No assets found for this academy.</div>; // If no assets are found
    // }




    return (
        <div>
            <AcademyNavbar role={role} academyId={academyId} />

            <div className='container'>
                <Link to={`/academy-asset/${role}/${academyId}`} >Academy Asset</Link>
                <h2>Asset Information</h2>
                <Link to={`/add-asset/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>

                    <button>Add Asset</button>
                </Link>
                <Link to={`/edit-asset/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>

                    <button>Edit Asset</button>
                </Link>
                <Link to={`/delete-asset/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>

                    <button>Delete Asset</button>
                </Link>
                {error && <p>{error}</p>}
                {asset.length === 0 ? (
                    <p>No Asset found for this academy.</p>
                ) : (
                    <table border="1" width="700px">
                        <thead>
                            <tr>
                                <th>Asset ID</th>
                                <th>Asset Name</th>
                                <th>Quantity</th>
                                <th>Cost</th>
                                <th>Asset Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {asset.map((assetItem) => (
                                <tr key={assetItem.id}>
                                    <td>{assetItem.id}</td>
                                    <td>{assetItem.name}</td>
                                    <td>{assetItem.quantity}</td>
                                    <td>{assetItem.cost} / hr</td>
                                    <td>{assetItem.assetType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Display the whole booking assets / items / hall / ground etc  */}
            <div className="sports-container">
                {assetBookings.length === 0 ? (
                    <p>No assetBookings found.</p>
                ) : (
                    assetBookings.map((booking) => (
                        <div key={booking.id} className="booking-box">
                            {/* <h3>{booking.assetType}</h3> */}
                            <div>
                                <img
                                    src={booking.image_url || assetImageMap[mapping[booking.assetType]] || defaultImage}
                                    alt={booking.name}
                                    className="sports-image"
                                />
                            </div>
                            
                            <h3>{booking.name}</h3>


                            <p><strong>Quantity:</strong> {booking.quantity}</p>
                            <p><strong>Amount :</strong> {booking.cost} /hr</p>
                            <p className="sports-description"><button><strong>Bookable</strong> </button></p>
                            {/* <p className="sports-description"><strong>Location:</strong> <a href={booking.location} target='_blank' rel="noopener noreferrer"><button style={{background:'grey'}}>Go to Location</button></a></p> */}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Asset;
