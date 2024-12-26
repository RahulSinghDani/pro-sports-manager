import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import AcademyNavbar from './AcademyNavbar.js'; // Assuming you already have this navbar

import './Style.css';

const Coach = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://165.232.183.58:5000';

  const { academyId, role } = useParams(); // Get the academyId from the URL
  const [coaches, setCoaches] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch coach data using the academyId
    axios.get(`${API_BASE_URL}/api/coaches/${academyId}`)
      .then(response => {
        setCoaches(response.data); // Set coaches data from the API response
      })
      .catch(error => {
        setError('Failed to load coach details.');
        console.error('Error fetching coach data:', error);
      });
  }, [academyId]);

  return (
    <div>
      <AcademyNavbar role={role} academyId={academyId} /> {/* Pass academyId to the Navbar */}
      <div className='container'>

        <h2>Coaches for Academy {academyId}</h2>
        <Link to={`/edit-coach/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <button>Edit Coach</button>
        </Link>
        <Link to={`/add-coach/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>

          <button>Add Coach</button>
        </Link>
        <Link to={`/delete-coach/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>

          <button>Delete Coach</button>
        </Link>

        {error && <p>{error}</p>}
        {coaches.length === 0 ? (
          <p>No coaches found for this academy.</p>
        ) : (
          <table border="1" width="700px" >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Experience</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Batch Name</th>
              </tr>
            </thead>
            <tbody>
              {coaches.map(coach => (
                <tr key={coach.id}>
                  <td>{coach.id}</td>
                  <td>{coach.name}</td>
                  <td>{coach.designation}</td>
                  <td>{coach.experience}</td>
                  <td>{coach.phone_num}</td>
                  <td>{coach.email}</td>
                  <td>{coach.salary}</td>
                  <td>{coach.batch_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Coach;
