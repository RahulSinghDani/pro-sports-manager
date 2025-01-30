import React, { useState } from 'react';
import About from './About';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CricketData = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();

    const {role, academyId, id , name } = useParams();
    const [formData, setFormData] = useState({
        player_id: id,
        name: name,
        matches_played: 0,
        runs: 0,
        wickets: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/cricket-data`, formData);
            console.log('Data added:', response.data);
            alert('Sports Data added successfully!');
            navigate(`/AcademyDetails/${role}/${academyId}/Player`);
        } catch (error) {
            console.error('Error adding data:', error);
            alert('Failed to add data');
        }
    };

    return (
        <div>
            <div className='nav'>
                <p className='logo'>Pro Sports Manager</p>
            </div>
            <div className='below-navbar'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Player ID:</label>
                        <input
                            type="text"
                            name="player_id"
                            value={id}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div>
                        <label>Player Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                    </div>
                    <div>
                        <label>Matches Played:</label>
                        <input
                            type="number"
                            name="matches_played"
                            value={formData.matches_played}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Runs:</label>
                        <input
                            type="number"
                            name="runs"
                            value={formData.runs}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Wickets:</label>
                        <input
                            type="number"
                            name="wickets"
                            value={formData.wickets}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <About />
        </div>
    );
};

export default CricketData;
