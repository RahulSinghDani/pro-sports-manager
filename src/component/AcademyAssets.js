import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import AcademyNavbar from './AcademyNavbar';

const AcademyAssets = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

    const { academyId,role } = useParams(); // to get the academy id from URL
    const [asset, setAsset] = useState([]); // Change "Asset" to "asset" (lowercase first letter for consistency)
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        // Fetch asset data from the backend
        axios
            .get(`${API_BASE_URL}/api/assets/${academyId}`)
            .then(response => {
                setAsset(response.data); // Set assets data from the response
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to load asset details.');
                setLoading(false); // Set loading to false if there's an error
            });
    }, [API_BASE_URL ,academyId]);

    if (loading) {
        return <div>Loading...</div>; // Show loading text while fetching
    }

    if (error) {
        return <div>{error}</div>; // Show error message if something goes wrong
    }

    // if (asset.length === 0) {
    //     return <div>No assets found for this academy.</div>; // If no assets are found
    // }

    return (
        <div>
            <AcademyNavbar role={role} academyId={academyId} />

            <div className='container'>
            <h2>Asset Information</h2>
            <Link to={`/add-asset/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>

                <button>Add Asset</button>
            </Link>
            <Link to={`/edit-asset/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>

                <button>Edit Asset</button>
            </Link>
            <Link to={`/delete-asset/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>

                <button>Delete Asset</button>
            </Link>
            {error && <p>{error}</p>}
            {asset.length === 0 ? (
                <p>No Asset found for this academy.</p>
            ) : (
                <table border="1" width="700px">
                    <thead>
                        <tr>
                            <th>Asset ID</th>
                            <th>Asset Name</th>
                            <th>Quantity</th>
                            <th>Cost</th>
                            <th>Asset Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {asset.map((assetItem) => (
                            <tr key={assetItem.id}>
                                <td>{assetItem.id}</td>
                                <td>{assetItem.name}</td>
                                <td>{assetItem.quantity}</td>
                                <td>{assetItem.cost} / hr</td>
                                <td>{assetItem.assetType}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </div>
    );
};

export default AcademyAssets;
