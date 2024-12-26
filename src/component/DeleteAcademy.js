import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link, useParams } from 'react-router-dom';

const DeleteAcademy = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://165.232.183.58:5000';

  const {role} = useParams();
  const [academyId, setAcademyId] = useState('');
  const [academyName, setAcademyName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    
    if (!academyId) {
      setMessage('Please enter an Academy ID.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Send DELETE request to backend
      const response = await axios.delete(`${API_BASE_URL}/api/academies/${academyId}`);

      if (response.data.success) {
        setAcademyName(response.data.academyName); // Get the academy name from response
        setMessage(`Academy '${response.data.academyName}' deleted successfully!`);

        // Wait for 4-5 seconds before redirecting
        setTimeout(() => {
          navigate(`/Dashboard/${role}`); // Redirect to dashboard
        }, 4000);
      } else {
        setMessage('Academy not found or could not be deleted.');
      }
    } catch (error) {
      console.error('Error deleting academy:', error);
      if (error.response) {
        setMessage(error.response.data.message); // Display error message from server
      } else {
        setMessage('Failed to delete the academy. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className='heading'>Delete Academy</h2>
      <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0"}}/> {/*  adjust margin to set into column line */}

      <form onSubmit={handleDelete}>
        <div>
          <label htmlFor="academyId">Academy ID:</label>
          <input
            type="text"
            id="academyId"
            value={academyId}
            onChange={(e) => setAcademyId(e.target.value)}
            placeholder="Enter Academy ID"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Deleting...' : 'Delete Academy'}
        </button>
      </form>

      {message && <p>{message}</p>}
      {academyName && (
        <div>
          <h3>Academy Deleted:</h3>
          <p>{academyName}</p>
        </div>
      )}
      <Link to={`/Dashboard/${role}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <button>Back</button>
      </Link>
    </div>
  );
};

export default DeleteAcademy;
