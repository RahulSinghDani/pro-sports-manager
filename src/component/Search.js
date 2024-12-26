import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Search = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

    const [searchTerm, setSearchTerm] = useState('');
    const [playerDetails, setPlayerDetails] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Handle input change
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Handle search
    const handleSearch = async (event) => {
        event.preventDefault();
        setPlayerDetails([]);
        setErrorMessage('');

        if (searchTerm.trim() === '') {
            setErrorMessage('Please enter a name or receipt number.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/search?playerName=${searchTerm}`);
            const data = await response.json();

            if (data.length > 0) {
                setPlayerDetails(data); // Expecting an array of results
            } else {
                setErrorMessage('No player found with that name or receipt number.');
            }
        } catch (error) {
            setErrorMessage('Error fetching data from the server.');
        }
    };

    // Navigate to the home page (RegistrationForm)
    // const goHome = () => {
    //     navigate('/');
    // };

    return (
        <div>
            <h1>Search Player</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search by Name or Receipt Number"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button type="submit">Search</button>
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {playerDetails.length > 0 && (
                <table border="1" style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Player Name</th>
                            <th>Parent Name</th>
                            <th>DOB</th>
                            <th>Gender</th>
                            <th>School</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Contact Person</th>
                            <th>Relation</th>
                            <th>Receipt Number</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Scheme</th>
                            <th>Time</th>
                            <th>Batch</th>
                            <th>Remarks</th>
                            <th>Amount Paid</th>
                            <th>Operator</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerDetails.map((player, index) => (
                            <tr key={index}>
                                <td>{player.playerName}</td>
                                <td>{player.parentName}</td>
                                <td>{player.dob}</td>
                                <td>{player.gender}</td>
                                <td>{player.school}</td>
                                <td>{player.mailId}</td>
                                <td>{player.mobileNumber}</td>
                                <td>{player.address}</td>
                                <td>{player.contactPerson}</td>
                                <td>{player.relation}</td>
                                <td>{player.receiptNumber}</td>
                                <td>{player.fromDate}</td>
                                <td>{player.toDate}</td>
                                <td>{player.scheme}</td>
                                <td>{player.time}</td>
                                <td>{player.batch}</td>
                                <td>{player.remarks}</td>
                                <td>{player.amountPaid}</td>
                                <td>{player.operator}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Home Button */}
            <Link
                to="#"
                type="button"
                id="homebtn"
                onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                }}
            >
                Home
            </Link>
        </div>
    );
};

export default Search;
