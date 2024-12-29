import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const AddAsset = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL  ;


  const { academyId, role } = useParams(); // Get academyId from URL
  const navigate = useNavigate(); // To navigate after adding a course

  const [assetType, setAssetType] = useState("default");
  const [assetName, setAsssetName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission to add a new course
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!academyId) {
      setMessage("Academy ID is required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/addAsset/${academyId}`,
        {
          assetName: assetName,
          quantity: quantity,
          cost: parseFloat(cost),
        }
      );

      // Check for successful response
      if (response.status === 200) {
        setMessage(response.data.message);
        // Redirect to the AcademyDetails/Asset page after success
        setTimeout(() => {
          navigate(`/AcademyDetails/${role}/${academyId}/Asset`);
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      console.error("Error adding asset:", error);
      setMessage("Failed to add asset. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-asset-container">
      <h2>Add New Asset</h2>
      <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0" }} /> {/*  adjust margin to set into column line */}

      <p>{academyId ? `Academy ID: ${academyId}` : "Academy ID not available"}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Asset Type:</label>
          <select
            name="assets"
            id="assets"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
            required
          >
            <option value="default" disabled>
              Select Type
            </option>
            <optgroup label="Kit/Equipment">
              <option value="cricket_kit">Cricket Kit</option>
              <option value="football_kit">Football Kit</option>
              <option value="basketball_kit">Basketball Kit</option>
              <option value="archery_kit">Archery Kit</option>
              <option value="gym_equipment">Gym Equipment</option>
              <option value="badminton_kit">Badminton Kit</option>
              <option value="skating_gear">Skating Gear</option>
              <option value="swimming_pool_gear">Swimming Pool Gear</option>
            </optgroup>
            <optgroup label="Machines">
              <option value="bowling_machine">Bowling Machine</option>
              <option value="shuttlecock_machine">Shuttlecock Machine</option>
              <option value="ball_throwing_machine">Ball Throwing Machine</option>
              <option value="treadmill">Treadmills</option>
              <option value="rowing_machine">Rowing Machine</option>
              <option value="cycle_ergometer">Cycle Ergometer</option>
            </optgroup>
            <optgroup label="Grounds/Courts/Facilities">
              <option value="football_ground">Football Ground</option>
              <option value="cricket_pitch">Cricket Pitch</option>
              <option value="tennis_court">Tennis Court</option>
              <option value="badminton_court">Badminton Court</option>
              <option value="basketball_court">Basketball Court</option>
              <option value="running_track">Running Track</option>
              <option value="swimming_pool">Swimming Pool</option>
              <option value="skating_rink">Skating Rink</option>
            </optgroup>
            <optgroup label="Support Facilities">
              <option value="locker_rooms">Locker Rooms</option>
              <option value="changing_rooms">Changing Rooms</option>
              <option value="first_aid_equipment">First Aid Equipment</option>
              <option value="cafeteria">Cafeteria</option>
              <option value="parking_facilities">Parking Facilities</option>
            </optgroup>
            <optgroup label="Training Tools">
              <option value="whiteboards">Whiteboards/Digital Boards</option>
              <option value="video_analysis_equipment">Video Analysis Equipment</option>
              <option value="vr_trainers">Virtual Reality Sports Trainers</option>
              <option value="stopwatches">Stopwatches</option>
            </optgroup>
            <optgroup label="Additional Accessories">
              <option value="cones_markers">Cones and Markers</option>
              <option value="training_ladders">Training Ladders</option>
              <option value="resistance_bands">Resistance Bands</option>
              <option value="medicine_balls">Medicine Balls</option>
            </optgroup>
          </select>
        </div>
        <div className="form-group">
          <label>Asset Name:</label>
          <input
            type="text"
            value={assetName}
            onChange={(e) => setAsssetName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>quantity:</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>cost:</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Asset"}
        </button>
        <Link to={`/AcademyDetails/${role}/${academyId}/Asset`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <button>Back</button>
        </Link>
      </form>
      {message && <p id="message">{message}</p>}
    </div>
  );
};

export default AddAsset;
