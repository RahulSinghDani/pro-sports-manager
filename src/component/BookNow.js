import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Import useParams for dynamic routing
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import About from './About';


const BookNow = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');

    const [bookableDetails, setBookableDetails] = useState(null);

    const [selectedDate, setSelectedDate] = useState(null);
    const [bookedDates, setBookedDates] = useState([]);
    const [isDateBooked, setIsDateBooked] = useState(false);

    const [startTime, setStartTime] = useState({ hours: '12', minutes: '00', period: 'AM' });
    const [endTime, setEndTime] = useState({ hours: '12', minutes: '00', period: 'AM' });
    const [numberOfPlayers, setNumberOfPlayers] = useState(1);

    // console.log("Total Players: ", numberOfPlayers);
    const navigate = useNavigate();
    // Fetch parameters from URL using useParams
    const { role, academyId, id } = useParams(); // Use useParams to fetch role, academyId, and id
    // console.log(role, academyId, id);

    // Fetch booked dates
    useEffect(() => {
        // Fetch booked dates
        axios.get(`${API_BASE_URL}/api/bookings/dates/${id}`)
            .then(response => {
                // Format dates to 'YYYY-MM-DD' and convert to Date objects
                const dates = response.data.flat().map(dateString => {
                    const formattedDate = new Date(dateString); // Convert to Date object
                    return new Date(formattedDate.toISOString().split('T')[0]); // Strip time
                });
                setBookedDates(dates);
            })
            .catch(error => {
                console.error('Error fetching booked dates:', error);
            });
    }, [API_BASE_URL, id]);

    const handleDateChange = (date) => {
        const newDate = new Date(date); // Convert input date to a Date object
        newDate.setDate(newDate.getDate()); // Ensure proper date setting (no offset issues)

        setSelectedDate(newDate); // Update the selected date state

        // Check if the selected date is already booked
        const isBooked = bookedDates.some(
            (bookedDate) => bookedDate.toISOString().split('T')[0] === newDate.toISOString().split('T')[0]
        );
        setIsDateBooked(isBooked); // Update isDateBooked state

        if (isBooked) {
            alert('This date is already booked. Please select a different date.');
            setSelectedDate(null); // Clear the selected date if it's booked
            return; // Exit function early
        }

        // Perform additional actions here if needed for a valid, non-booked date
        console.log('Valid selected date:', newDate);
    };


    // Fetch ground details using academyId and id
    useEffect(() => {
        if (id && academyId) {
            axios
                .get(`${API_BASE_URL}/all-bookable-grounds/${academyId}/${id}`)
                .then((response) => {
                    if (response.data && response.data.length > 0) {
                        setBookableDetails(response.data[0]);
                    } else {
                        console.error('No data found for the given ID.');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching ground details:', error);
                });
        }
    }, [API_BASE_URL, academyId, id]);

    // Handle booking form submission
    const handleBooking = (e) => {
        e.preventDefault();  // Prevent default form submission

        if (!/^\d{10}$/.test(contactNumber)) {
            alert('Please enter a valid 10-digit contact number.');
            return;
        }
        if (!name || !contactNumber || !startTime || !endTime) {
            alert('Please fill in all fields.');
            return;
        }
        if (!bookableDetails) {
            alert('No bookable details found!');
            return;
        }


        // Get current date and time 

        const bookingData = {
            academy_id: academyId,  // your academyId here
            item_type: 'Ground',                    // fixed item_type, or you can change it dynamically
            item_id: id,            // item_id from the fetched bookable details
            booking_date: selectedDate,
            start_time: `${startTime.hours}:${startTime.minutes} ${startTime.period}`, // Convert to string
            end_time: `${endTime.hours}:${endTime.minutes} ${endTime.period}`,
            booked_by: name,
            contact_number: contactNumber,
            status: 'Confirmed',

        };

        // Post booking data to backend
        axios.post(`${API_BASE_URL}/api/bookings-book-now`, bookingData)
            .then(response => {
                alert('Booking successful');
                navigate(`/AcademyDetails/${role}/${academyId}/Asset`);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Booking failed');
            });
    };



    const handleTimeChange = (timeSetter, field, value) => {
        timeSetter(prevTime => ({
            ...prevTime,
            [field]: value,
        }));
    };

    return (
        <div>
            <div className='nav'>
                <h2 className='logo'>Pro Sports Manager</h2>
            </div>

            <div className='below-navbar'>
                <div style={{display:'flex'}}>
                    <form onSubmit={handleBooking} style={{ width: "340px", gap: '15px' }}>
                        <h1>Book Now</h1>

                        {/* Render bookable details if available */}
                        {bookableDetails && (
                            <div>
                                <p>Item ID: {bookableDetails.id}</p>
                                <p>Ground Name: {bookableDetails.name}</p>
                                {/* <p>Fee: {bookableDetails.fee}</p> */}
                                {/* Display other details if needed */}
                            </div>
                        )}

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Enter your contact number without +91"
                            value={contactNumber}
                            onChange={e => setContactNumber(e.target.value)}
                        />
                        Enter Booking Date
                        <input
                            type="date"
                            value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                            onChange={(e) => handleDateChange(e.target.value)}
                            className="custom-date-input"
                        />
                        <div>
                            <div style={{ marginBottom: '1em', display: 'flex', flexDirection: 'row', width: '300px' }}>
                                <label>Start Time: </label>
                                <select
                                    value={startTime.hours}
                                    onChange={(e) => handleTimeChange(setStartTime, 'hours', e.target.value)}
                                >
                                    {Array.from({ length: 12 }, (_, i) => {
                                        const hour = (i + 1).toString().padStart(2, '0');
                                        return <option key={hour} value={hour}>{hour}</option>;
                                    })}
                                </select>
                                :
                                <select
                                    value={startTime.minutes}
                                    onChange={(e) => handleTimeChange(setStartTime, 'minutes', e.target.value)}
                                >
                                    {Array.from({ length: 60 }, (_, i) => {
                                        const minute = i.toString().padStart(2, '0');
                                        return <option key={minute} value={minute}>{minute}</option>;
                                    })}
                                </select>
                                <select
                                    value={startTime.period}
                                    onChange={(e) => handleTimeChange(setStartTime, 'period', e.target.value)}
                                >
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', width: '300px' }}>
                                <label>End Time: </label>
                                <select
                                    value={endTime.hours}
                                    onChange={(e) => handleTimeChange(setEndTime, 'hours', e.target.value)}
                                >
                                    {Array.from({ length: 12 }, (_, i) => {
                                        const hour = (i + 1).toString().padStart(2, '0');
                                        return <option key={hour} value={hour}>{hour}</option>;
                                    })}
                                </select>
                                :
                                <select
                                    value={endTime.minutes}
                                    onChange={(e) => handleTimeChange(setEndTime, 'minutes', e.target.value)}
                                >
                                    {Array.from({ length: 60 }, (_, i) => {
                                        const minute = i.toString().padStart(2, '0');
                                        return <option key={minute} value={minute}>{minute}</option>;
                                    })}
                                </select>
                                <select
                                    value={endTime.period}
                                    onChange={(e) => handleTimeChange(setEndTime, 'period', e.target.value)}
                                >
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                                {/* <p>Selected End Time: {formatTime(endTime)}</p> */}
                            </div>
                        </div>
                        <div>
                            <input
                                placeholder="Enter Number of Players"
                                type="number"
                                value={numberOfPlayers}
                                onChange={e => setNumberOfPlayers(e.target.value)} // Update state on change

                            />
                        </div>
                        {/* <p>Pay Rs.{bookableDetails.amount} /player</p>
                    <p>Final amount Pay Rs.{bookableDetails.amount * numberOfPlayers} </p> */}
                        <button className="heading" type="submit" disabled={isDateBooked} // Disable if date is booked
                        >
                            BOOK NOW
                        </button>
                    </form>
                    <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '20px auto'
}}>
    <h3 style={{
        fontSize: '1.5rem',
        color: '#333',
        marginBottom: '10px',
        textAlign: 'center',
        borderBottom: '2px solid #007bff',
        paddingBottom: '5px',
        width: '100%'
    }}>
        Booked Dates
    </h3>
    {bookedDates.length > 0 ? (
        <ul style={{
            listStyle: 'none',
            padding: '0',
            width: '100%',
            textAlign: 'center',
            margin: '0',
        }}>
            {bookedDates.map((date, index) => (
                <li key={index} style={{ padding: '10px 0', fontSize: '1rem', color: '#555',borderBottom: index < bookedDates.length - 1 ? '1px solid #ddd' : 'none',
                }}>
                    {date.toISOString().split('T')[0]}
                </li>
            ))}
        </ul>
    ) : (
        <p style={{fontSize: '1rem', color: '#666', textAlign: 'center', marginTop: '10px' }}> No booked dates available.</p>
    )}
</div>


                </div>
            </div>
            <About />
        </div>
    );
};

export default BookNow;
