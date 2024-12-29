import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate,Link } from 'react-router-dom';

const DeleteCoach = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL  ;

  const { academyId ,role} = useParams(); // Getting academyId from URL params
  const [coachId, setCoachId] = useState('');
  const [coachName, setCoachName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [coachFound, setCoachFound] = useState(false);
  const navigate = useNavigate();
  // Step 1: Handle the courseId input
  const handleCoachIdSubmit = () => {
    if (!coachId) {
      setMessage('Please enter a valid coach ID.');
      return;
    }

    // Fetch the coch data using the coachId and academyId
    axios
      .get(`${API_BASE_URL}/api/getCoach/${academyId}/${coachId}`)
      .then((response) => {
        const { coachName } = response.data;
        setCoachName(coachName);
        setCoachFound(true); // Mark coach found
        setMessage(''); // Clear the message if coach found
      })
      .catch((error) => {
        console.error('Error fetching coach data:', error);
        setMessage('Coach not found.');
      });
  };

  // Step 2: Handle coach deletion
  const handleDelete = async () => {
    if (!coachId || !academyId) {
      setMessage('Coach ID and Academy ID are required.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/deleteCoach/${academyId}/${coachId}`
      );

      if (response.status === 200) {
        setMessage('Coach deleted successfully!');
        setTimeout(() => {
          navigate(`/AcademyDetails/${role}/${academyId}/Coach`); // Redirect to coach list after deletion
        }, 2000);
      }
    } catch (error) {
      console.error('Error deleting coach:', error);
      setMessage('Failed to delete coach. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-coach-container">
      <h2 className='heading'>Delete Coach</h2>
      <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0"}}/> {/*  adjust margin to set into column line */}

      <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0"}}/> {/*  adjust margin to set into column line */}

      <p style={{textAlign:"center"}}>{academyId ? `Academy ID: ${academyId}` : 'Academy ID not available'}</p>

      {/* Step 1: Input for coachId */}
      {!coachFound ? (
        <div style={{ display:"flex",justifyContent:"center", alignItems:"center",flexDirection:"column"}}>
          <label style={{margin:"8px"}}>Coach ID:</label>
          <input
            type="text"
            value={coachId}
            onChange={(e) => setCoachId(e.target.value)}
            placeholder="Enter Coach ID"
          />
          <button onClick={handleCoachIdSubmit}>Find Coach</button>
          <Link to={`/AcademyDetails/${role}/${academyId}/Coach`}>
            <button type="button">Back</button>
          </Link>
        </div>
      ) : (
        <div>
          {/* Step 2: Display coach details and delete confirmation */}
          <p>Are you sure you want to delete the coach: {coachName} (ID: {coachId})?</p>
          {message && <p>{message}</p>}

          <button onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Coach'}
          </button>
          <Link to={`/AcademyDetails/${role}/${academyId}/Coach`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <button>Back</button>
      </Link>
        </div>
        
      )}
    </div>
  );
};

export default DeleteCoach;
