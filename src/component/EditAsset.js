import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditAsset = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { academyId, role } = useParams(); // Getting academyId from URL params
  const [assetId, setAssetId] = useState('');
  const [assetName, setAssetName] = useState('');  // Corrected from 'setAsssetName'
  const [quantity, setQuantity] = useState('');
  const [cost, setCost] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [assetFound, setAssetFound] = useState(false);
  const navigate = useNavigate();

  // Step 1: Handle the courseId input
  const handleAssetIdSubmit = () => {
    if (!assetId) {
      setMessage('Please enter a valid asset ID.');
      return;
    }

    // Fetch the asset data using the assetId and academyId
    axios
      .get(`${API_BASE_URL}/api/assets/${academyId}/${assetId}`, { withCredentials: true })
      .then((response) => {
        const { name, quantity, cost } = response.data;
        setAssetName(name);  // Corrected from 'setAsssetName'
        setQuantity(quantity);
        setCost(cost);
        setAssetFound(true); // Mark asset found
        setMessage(''); // Clear the message if asset found
      })
      .catch((error) => {
        console.error('Error fetching asset data:', error);
        setMessage('Asset not found.');
      });
  };

  // Step 2: Handle form submission to update asset
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!academyId || !assetId || !assetName || !quantity || !cost) {
      setMessage('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/editAsset/${academyId}/${assetId}`,
        {
          assetName: assetName,  // Corrected from 'assetName'
          quantity: quantity,
          cost: parseFloat(cost),
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setMessage('Asset updated successfully!');
        setTimeout(() => {
          navigate(`/AcademyDetails/${role}/${academyId}/Asset`); // Redirect to assets list after successful update
        }, 2000);
      }
    } catch (error) {
      console.error('Error updating asset:', error);
      setMessage('Failed to update asset. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='nav'>
        <Link to={`/AcademyDetails/${role}/${academyId}`} className='logo'>Pro Sports Manager</Link>
      </div>
      <div className="edit-asset-container">
        <h2 className='heading'>Edit Asset</h2>
        <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0" }} /> {/*  adjust margin to set into column line */}

        {/* Step 1: Input for courseId */}
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
            <Link to={`/AcademyDetails/${role}/${academyId}/Asset`}>
              <button type="button">Back</button>
            </Link>
          </div>
        ) : (
          <div>
            {/* Step 2: Display course edit form if courseId is found */}
            <p>Editing Asset ID: {assetId}</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Asset Name:</label>
                <input
                  type="text"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}  // Corrected from 'setAsssetName'
                  required
                />
              </div>
              <div className="form-group">
                <label>Quantity:</label>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Cost:</label>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  required
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Asset'}
              </button>
              <Link to={`/AcademyDetails/${role}/${academyId}/Asset`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <button>Back</button>
              </Link>
            </form>
            {message && <p>{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditAsset;
