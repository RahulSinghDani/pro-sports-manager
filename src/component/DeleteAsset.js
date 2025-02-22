import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate,Link } from 'react-router-dom';

const DeleteAsset = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL  ;

  const { academyId,role } = useParams(); // Getting academyId from URL params
  const [assetId, setAssetId] = useState('');
  const [assetName, setAssetName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [assetFound, setAssetFound] = useState(false);
  const navigate = useNavigate();

  // Step 1: Handle the assetId input
  const handleAssetIdSubmit = () => {
    if (!assetId) {
      setMessage('Please enter a valid Asset ID.');
      return;
    }

    // Fetch the asset data using the assetId and academyId
    axios
      .get(`${API_BASE_URL}/api/assets/${academyId}/${assetId}`, { withCredentials: true })
      .then((response) => {
        const { assetName } = response.data;
        setAssetName(assetName);
        setAssetFound(true); // Mark asset found
        setMessage(''); // Clear the message if asset found
      })
      .catch((error) => {
        console.error('Error fetching asset data:', error);
        setMessage('Asset not found.');
      });
  };

  // Step 2: Handle asset deletion
  const handleDelete = async () => {
    if (!assetId || !academyId) {
      setMessage('Asset ID and Academy ID are required.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/deleteAsset/${academyId}/${assetId}` ,{ withCredentials: true }
      );

      if (response.status === 200) {
        setMessage('Asset deleted successfully!');
        setTimeout(() => {
          navigate(`/AcademyDetails/${role}/${academyId}/Asset`); // Redirect to asset list after deletion
        }, 1000);
      }
    } catch (error) {
      console.error('Error deleting asset:', error);
      setMessage('Failed to delete asset. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-asset-container">
      <h2 className='heading'>Delete Asset</h2>
      <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0"}}/> {/*  adjust margin to set into column line */}

    

      {/* Step 1: Input for assetId */}
      {!assetFound ? (
        <div>
          <label>Asset ID:</label>
          <input
            type="text"
            value={assetId}
            onChange={(e) => setAssetId(e.target.value)}
            placeholder="Enter Asset ID"
          />
          <button onClick={handleAssetIdSubmit}>Find Asset</button>
        </div>
      ) : (
        <div>
          {/* Step 2: Display asset details and delete confirmation */}
          <p>Are you sure you want to delete the asset: {assetName} (ID: {assetId})?</p>
          {message && <p>{message}</p>}

          <button onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Asset'}
          </button>
          <Link to={`/AcademyDetails/${role}/${academyId}/Asset`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <button>Back</button>
      </Link>
        </div>
        
      )}
    </div>
  );
};

export default DeleteAsset;
