import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import AcademyNavbar from './AcademyNavbar.js'; // Assuming you already have this navbar
import About from './About.js';
import './Style.css';

const Coach = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { academyId, role } = useParams(); // Get the academyId from the URL
  const [coaches, setCoaches] = useState([]);
  const [error, setError] = useState('');


  useEffect(() => {
    // Fetch coach data using the academyId
    axios.get(`${API_BASE_URL}/api/coaches/${academyId}`, { withCredentials: true })
      .then(response => {
        setCoaches(response.data); // Set coaches data from the API response
      })
      .catch(error => {
        setError('Failed to load coach details.');
        console.error('Error fetching coach data:', error);
      });
  }, [API_BASE_URL, academyId]);

  //----------------------------------
  //toggle button active or inactive 
  const [status, setStatus] = useState(coaches.status);

  useEffect(() => {
    setStatus(coaches.status); // Set initial status when component mounts
  }, [coaches.status]);
  //toggle button for active and deactive player
  const toggleStatus = async (coachId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    try {
      const response = await fetch(`${API_BASE_URL}/updateCoachStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coachId, status: newStatus }),
        credentials: "include",
      });

      if (response.ok) {
        // Update players array to reflect the status change
        setCoaches(prevCoaches =>
          prevCoaches.map(coaches =>
            coaches.id === coachId ? { ...coaches, status: newStatus } : coaches
          )
        );
        alert(`Employee Status updated successfully!`);
      } else {
        console.error("Failed to update status");
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the status");
    }
  };

  return (
    <div >
      <AcademyNavbar role={role} academyId={academyId} /> {/* Pass academyId to the Navbar */}
      <div className='below-navbar'>

        <h2>Coaches for Academy</h2>
        
        <div>
        {coaches.length > 0 ? (
          <Link to={`/edit-coach/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <button>Edit Employee</button>
          </Link>
        ) : null}
          <Link to={`/add-coach/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>

            <button>Add Employee</button>
          </Link>
          {/* <Link to={`/delete-coach/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>

            <button>Delete Coach</button>
          </Link> */}
        </div>
        {error && <p>{error}</p>}
        {coaches.length === 0 ? (
          <p>No coaches found for this academy.</p>
        ) : (
          <div className="table-wrapper">
            <table className='table-main'>
              <thead>
                <tr>
                  <th>Status</th>
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
                    {/* Toggle Button */}
                    <td>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={coach.status === "active"}
                          onChange={() => toggleStatus(coach.id, coach.status)}
                        />
                        <span className="slider"></span>
                      </label>
                    </td>
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
          </div>
        )}
      </div>
      <About />
    </div>
  );
};

export default Coach;
