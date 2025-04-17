import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import LogoIcon from './Images/PSM-logo1.ico';

const EditAsset = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { academyId, role } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const initialAssetId = location.state?.assetId || '';

  const [assetId, setAssetId] = useState(initialAssetId);
  const [assetName, setAssetName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cost, setCost] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [assetFound, setAssetFound] = useState(false);

  useEffect(() => {
    if (assetId) {
      fetchAssetDetails(assetId);
    }
  }, [assetId]);

  const fetchAssetDetails = (id) => {
    axios
      .get(`${API_BASE_URL}/api/assets/${academyId}/${id}`, { withCredentials: true })
      .then((response) => {
        const { name, quantity, cost } = response.data;
        setAssetName(name);
        setQuantity(quantity);
        setCost(cost);
        setAssetFound(true);
        setMessage('');
      })
      .catch((error) => {
        console.error('Error fetching asset data:', error);
        setMessage('Asset not found.');
      });
  };

  const handleAssetIdSubmit = () => {
    if (!assetId) {
      setMessage('Please enter a valid asset ID.');
      return;
    }
    fetchAssetDetails(assetId);
  };

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
          assetName: assetName,
          quantity: quantity,
          cost: parseFloat(cost),
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setMessage('Asset updated successfully!');
        setTimeout(() => {
          navigate(`/AcademyDetails/${role}/${academyId}/Asset`);
        }, 10);
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
        <div className='logo-container'>
          <Link to={`/AcademyDetails/${role}/${academyId}`}><img style={{ width: '50px', borderRadius: '50%' }} src={LogoIcon} alt='logo' /></Link>
          <Link to={`/AcademyDetails/${role}/${academyId}`} className="logo" >Pro Sports Manager</Link>
        </div>
      </div>

      <div className="below-navbar" >
        <h2 className='heading' style={{ textAlign: 'center', marginBottom: '10px' }}>Edit Asset</h2>

        <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0" }} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ marginBottom: '10px', fontSize: '16px' }}>Asset ID: {assetId}</p>

          <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Asset Name:</label>
              <input
                type="text"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Quantity:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Cost:</label>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: '10px',
                width: '100%',
              }}
            >
              {loading ? 'Updating...' : 'Update Asset'}
            </button>

            <Link
              to={`/AcademyDetails/${role}/${academyId}/Asset`}
              className='back-btn'
              style={{
                display: 'inline-block',
                width: '100%',
                textAlign: 'center',
                backgroundColor: '#6c757d',
                padding: '10px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'white',
              }}
            >
              Back
            </Link>
          </form>

          {message && (
            <p style={{ marginTop: '15px', fontWeight: 'bold', color: message.includes('success') ? 'green' : 'red' }}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditAsset;
