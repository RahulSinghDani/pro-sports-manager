import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
import About from './About';
const Asset = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const navigate = useNavigate();

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
    };


    const { academyId, role } = useParams(); // to get the academy id from URL
    const [asset, setAsset] = useState([]); // Change "Asset" to "asset" (lowercase first letter for consistency)
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Add a loading state
    const [bookings, setBookings] = useState([]);
    const [allAcademyGround, setAllAcademyGround] = useState([]);
    const [bookedData, setBookedData] = useState([]);

    const [assetBookings, setAssetBookings] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('sports'); // State to track selected category

    const [showModal, setShowModal] = useState(false);
    const [selectedAssetId, setSelectedAssetId] = useState(null);
    const [message, setMessage] = useState('');


    useEffect(() => {
        // Fetch asset data from the backend
        axios
            .get(`${API_BASE_URL}/api/assets/${academyId}`, { withCredentials: true })
            .then(response => {
                // console.log("Fetched News Data:", response.data); 

                setAsset(response.data); // Set assets data from the response
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to load asset details.');
                setLoading(false); // Set loading to false if there's an error
            });
    }, [API_BASE_URL, academyId]);

    const handleDelete = (assetId) => {
        console.log(`Clicked delete for assetId: ${assetId}`);
        setSelectedAssetId(assetId);
        setShowModal(true);
    };

    const confirmDelete = () => {
        console.log(`Confirming delete for assetId: ${selectedAssetId}`); // Debugging line
        axios.delete(`${API_BASE_URL}/api/deleteAsset/${academyId}/${selectedAssetId}`, { withCredentials: true })
            .then((response) => {
                console.log(`Deleted assetId: ${selectedAssetId}`); // Debugging line to verify deletion
                if (response.status === 200) {
                    // Remove the deleted asset from the UI
                    setAsset(prevAssets => prevAssets.filter(item => item.id !== selectedAssetId));
                    setMessage('Asset deleted successfully!');
                    setShowModal(false);
                    setSelectedAssetId(null);
                }
            })
            .catch((error) => {
                console.error('Error deleting asset:', error);
                setMessage('Asset deletion failed.');
            });
    };
    
    // Fetch bookings from the backend
    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/bookings/${academyId}`, { withCredentials: true }) // Replace with your backend API
            .then((response) => {
                setBookings(response.data);
            })
            .catch((error) => {
                console.error('Error fetching bookings:', error);
            });
    }, [API_BASE_URL, academyId]);

    useEffect(() => {
        // Fetch booked data
        axios
            .get(`${API_BASE_URL}/api/booked/${academyId}`, { withCredentials: true })
            .then((response) => {
                setBookedData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching booked data:', err);
                setError('Failed to fetch booked data.');
                setLoading(false);
            });
    }, [API_BASE_URL, academyId]);
    // Fetch bookings from the backend
    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/all-grounds/${academyId}`, { withCredentials: true }) // Replace with your backend API
            .then((response) => {
                setAllAcademyGround(response.data);
            })
            .catch((error) => {
                console.error('Error fetching grounds:', error);
            });
    }, [API_BASE_URL, academyId]);

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/assets-bookings/${academyId}`, { withCredentials: true }) // Replace with your backend API
            .then((response) => {
                setAssetBookings(response.data);
            })
            .catch((error) => {
                console.error('Error fetching assetBookings:', error);
            });
    }, [API_BASE_URL, academyId]);

    const handleNewBooking = () => {
        navigate(`/new-booking/${role}/${academyId}`); // Adjust path as needed
    };

    const handleEditBooking = (id) => {
        navigate(`/edit-booking/${role}/${academyId}/${id}`); // Adjust path as needed
    };
    // Delete booking handler
    const deleteBooking = (id) => {
        const firstConfirm = window.confirm('Are you sure you want to delete this booking?');
        if (firstConfirm) {
            const secondConfirm = window.confirm('This action is irreversible. Do you really want to delete?');
            if (secondConfirm) {
                axios
                    .delete(`${API_BASE_URL}/bookings/${id}`, { withCredentials: true })
                    .then(() => {
                        setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
                        alert('Booking deleted successfully!');
                    })
                    .catch((error) => {
                        console.error('Error deleting booking:', error);
                        alert('Failed to delete booking.');
                    });
            }
        }
    };


    if (loading) {
        return <div>Loading...</div>; // Show loading text while fetching
    }

    if (error) {
        return <div>{error}</div>; // Show error message if something goes wrong
    }

    // if (asset.length === 0) {
    //     return <div>No assets found for this academy.</div>; // If no assets are found
    // }

    // Helper function to format the date
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options); // DD-MM-YYYY format
    };


    return (
        <div>
            <AcademyNavbar role={role} academyId={academyId} />
            <div className='below-navbar'>
                <div >
                    <h2 className='heading'>Academy Assets</h2>
                    <div style={{ display: 'flex' }}>
                        <div className="category-buttons-switch" >
                            <button className="switches" style={{ background: 'rgb(32, 32, 32)' }} onClick={() => setSelectedCategory('booked')}>Booking Details</button>
                            <button className="switches" style={{ background: 'rgb(32, 32, 32)' }} onClick={() => setSelectedCategory('sports')}>Sports Kits/Equipment</button>
                            <button className="switches" style={{ background: 'rgb(32, 32, 32)' }} onClick={() => setSelectedCategory('grounds')}>Grounds & Courts</button>
                        </div>
                    </div>
                    {error && <p>{error}</p>}

                    {selectedCategory === 'booked' ? (
                        bookedData.length === 0 ? (
                            <p className='switches-p'>No bookings found for this academy.</p>
                        ) : (
                            <div className="switches">
                                <h3>Booked Items</h3>
                                <div className="table-wrapper">
                                    <table className='table-main'>
                                        <thead>
                                            <tr>
                                                <th>Booking ID</th>
                                                <th>Item Type</th>
                                                <th>Item ID</th>
                                                <th>Booking Date</th>
                                                <th>Start Time</th>
                                                <th>End Time</th>
                                                <th>Booked By</th>
                                                <th>Contact Number</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookedData.map((booking) => (
                                                <tr key={booking.booking_id}>
                                                    <td>{booking.booking_id}</td>
                                                    <td>{booking.item_type}</td>
                                                    <td>{booking.item_id}</td>
                                                    <td>{formatDate(booking.booking_date)}</td>
                                                    <td>{booking.start_time}</td>
                                                    <td>{booking.end_time}</td>
                                                    <td>{booking.booked_by}</td>
                                                    <td>{booking.contact_number}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    ) :
                        selectedCategory === 'sports' ? (
                            <div>
                                <div style={{ display: 'flex' }}>
                                    {/* <Link to={`/academy-asset/${role}/${academyId}`} >Academy Asset</Link> */}

                                    <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', paddingRight: '4px' }}>
                                        <Link to={`/add-asset/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <button>Add Asset</button>
                                        </Link>
                                    </div>

                                </div>
                                {asset.length === 0 ? (
                                    <p className='switches-p'>No Sports Kits & Equipment found for this academy.</p>
                                ) : (
                                    <div className="switches">

                                        <div className="table-wrapper">
                                            <table className='table-main'>

                                                <thead>
                                                    <tr>
                                                        <th style={{ width: '80px' }}>Asset ID</th>
                                                        <th>Asset Name</th>
                                                        <th style={{ width: '100px' }}>Quantity</th>
                                                        <th>Cost</th>
                                                        <th>Asset Type</th>
                                                        <th style={{ width: '124px' }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {asset.map((assetItem) => (
                                                        <tr key={assetItem.id}>
                                                            <td style={{ width: '80px' }}>{assetItem.id}</td>
                                                            <td>{assetItem.name}</td>
                                                            <td style={{ width: '100px' }}>{assetItem.quantity}</td>
                                                            <td>{assetItem.cost} / hr</td>
                                                            <td>{assetItem.assetType}</td>
                                                            {/* <td style={{ width: '120px' }}>
                                                                <div style={{ display: 'flex', gap: '6px' }}>
                                                                    <Link to={`/edit-asset/${role}/${academyId}`} state={{ assetId: assetItem.id }} style={{ backgroundColor: '#007BFF', color: '#fff', padding: '5px 10px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>Edit</Link>
                                                                    <Link to={`/delete-asset/${role}/${academyId}`} state={{ assetId: assetItem.id }} style={{ backgroundColor: '#DC3545', color: '#fff', padding: '5px 10px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>Delete</Link>
                                                                </div>
                                                            </td> */}
                                                            <td style={{ width: '120px' }}>
                                                                <div style={{ display: 'flex', gap: '6px' }}>
                                                                    <Link to={`/edit-asset/${role}/${academyId}`} state={{ assetId: assetItem.id }} style={{ backgroundColor: '#007BFF', color: '#fff', padding: '6px 8px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>Edit</Link>
                                                                    <button onClick={() => handleDelete(assetItem.id)} style={{ backgroundColor: '#DC3545', color: '#fff', padding: '6px 8px', borderRadius: '6px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Delete</button>
                                                                </div>
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Confirmation Modal */}
                                {showModal && (
                                    <div style={{
                                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                                        backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
                                        justifyContent: 'center', alignItems: 'center', zIndex: 1000
                                    }}>
                                        <div style={{
                                            background: 'white', padding: '20px', borderRadius: '10px',
                                            minWidth: '300px', textAlign: 'center'
                                        }}>
                                            <h3>Are you sure you want to delete this asset?</h3>
                                            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around' }}>
                                                <button onClick={confirmDelete} style={{ backgroundColor: '#DC3545', color: '#fff', padding: '8px 16px', borderRadius: '6px', border: 'none' }}>Yes, Delete</button>
                                                <button onClick={() => setShowModal(false)} style={{ backgroundColor: '#6c757d', color: '#fff', padding: '8px 16px', borderRadius: '6px', border: 'none' }}>Cancel</button>
                                            </div>
                                            {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : selectedCategory === 'grounds' ? (
                            <div>
                                <h1 style={{ paddingBottom: '12px', width: '100%' }}>Academy Grounds <span style={{ float: 'right', paddingRight: '34px' }}><button className='available-ground-btn' onClick={handleNewBooking}>Add New Ground</button></span></h1>

                                {assetBookings.length === 0 ? (
                                    <p className='switches-p'>No Grounds & Courts found for this academy.</p>
                                ) : (
                                    <div className="switches-main">

                                        <div className="sports-container">
                                            {bookings.length === 0 ? (
                                                <p className='switches-p'>No grounds found.</p>
                                            ) : (
                                                bookings.map((booking) => (
                                                    <div key={booking.id} className="booking-box-asset">
                                                        {/* <img src={booking.image_url} alt={`${booking.name}`} className="sports-image-asset" /> */}
                                                        <div>
                                                            <img
                                                                src={
                                                                    booking.image_url?.startsWith('http') // Check if the URL is a valid link
                                                                        ? booking.image_url // Use the provided link if valid
                                                                        : `${API_BASE_URL}/uploads/${booking.image_url}` // Otherwise, construct the file path
                                                                }
                                                                alt={booking.name || 'Image not available'}
                                                                className="sports-image"
                                                                onError={(e) => { e.target.src = defaultImage; }} // Fallback if the image fails to load
                                                            />
                                                        </div>
                                                        <h3>{booking.name}</h3>
                                                        <p>
                                                            <strong>Date:</strong>{' '}
                                                            {new Date(booking.date_of_booking).toLocaleDateString('en-GB', {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            })}
                                                            <br />
                                                            <strong>Time:</strong> {booking.time}
                                                            <br />
                                                            <strong>Contact Name:</strong> {booking.customer_name} | <strong>Contact:</strong> {booking.contact}
                                                            <br />
                                                            <strong>Amount:</strong> {booking.amount} /hr
                                                            <br />
                                                            <strong>Status:</strong> <span style={{ color: booking.status === 'confirmed' ? 'green' : 'blue' }}>
                                                                {booking.status}
                                                            </span>
                                                        </p>
                                                        <p><strong>Remarks:</strong> {booking.remarks}</p>
                                                        {/* <p className="sports-description"><a href={booking.location} target='_blank' rel="noopener noreferrer"><button style={{ background: 'grey' }}>Go to Location</button></a></p> */}
                                                        <p className="sports-description">
                                                            <a
                                                                href={
                                                                    booking.location?.startsWith("http")
                                                                        ? booking.location // Use the provided link if it's a complete URL
                                                                        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.location)}` // Generate Google Maps search link for plain names
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <button style={{ background: 'grey' }}>Go to Location</button>
                                                            </a>
                                                        </p>

                                                        <div className="booking-actions">
                                                            <button onClick={() => handleEditBooking(booking.id)}>Edit</button>
                                                            <button onClick={() => deleteBooking(booking.id)}>Delete</button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p>No items found for this category.</p>
                        )}


                    {/* Display the whole booking assets / items / hall / ground etc  */}
                    <div className='gap-between-div'>
                        <h2 >Available Assets for Booking</h2>
                        <div>

                            <div className="container">
                                {/* <h2 style={{padding:'12px'}}>Available Grounds</h2> */}

                                <div className="sports-container">
                                    {allAcademyGround.length === 0 ? (
                                        <p>No ground found.</p>
                                    ) : (
                                        allAcademyGround.map((booking) => (
                                            <div key={booking.id} className="booking-box-asset">
                                                {/* <img src={booking.image_url} alt={`${booking.name}`} className="sports-image-asset" /> */}
                                                <div>
                                                    <img
                                                        src={
                                                            booking.image_url?.startsWith('http') // Check if the URL is a valid link
                                                                ? booking.image_url // Use the provided link if valid
                                                                : `${API_BASE_URL}/uploads/${booking.image_url}` // Otherwise, construct the file path
                                                        }
                                                        alt={booking.name || 'Image not available'}
                                                        className="sports-image"
                                                        onError={(e) => { e.target.src = defaultImage; }} // Fallback if the image fails to load
                                                    />
                                                </div>
                                                <h3>{booking.name}</h3>
                                                <p>
                                                    <strong>Time:</strong> {booking.time}
                                                    <br />
                                                    <strong>Contact Name:</strong> {booking.customer_name} <br />
                                                    <strong>Contact:</strong> {booking.contact}
                                                    <br />
                                                    <strong>Charges: </strong>Rs. {booking.amount} / hr for per person
                                                </p>
                                                <p className="sports-description">
                                                    <a
                                                        href={
                                                            booking.location?.startsWith("http")
                                                                ? booking.location // Use the provided link if it's a complete URL
                                                                : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.location)}` // Generate Google Maps search link for plain names
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <button style={{ background: 'grey' }}>Go to Location</button>
                                                    </a>
                                                </p>
                                                <div className="booking-actions">
                                                    <Link to={`/bookable-dashboard/${role}/${academyId}/${booking.id}`}>
                                                        <button>Bookable</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
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
                                    <p className="sports-description"><button onClick={() => alert("Under Maintenance For Asset... only grounds are available for booking.")}><strong>Bookable</strong> </button></p>
                                    {/* <p className="sports-description"><strong>Location:</strong> <a href={booking.location} target='_blank' rel="noopener noreferrer"><button style={{background:'grey'}}>Go to Location</button></a></p> */}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <About />
        </div>
    );
};

export default Asset;
