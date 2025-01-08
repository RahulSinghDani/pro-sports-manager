import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditPlayer = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { academyId, role } = useParams(); // Academy ID from URL
  const navigate = useNavigate(); // For redirection

  const [playerId, setPlayerId] = useState(""); // Player ID from input
  const [playerData, setPlayerData] = useState({
    name: "",
    dob: "",
    gender: "",
    school_name: "",
    sports_expertise: "",
    address: "",
    previous_academy: "",
    father_name: "",
    mother_name: "",
    phone_number: "",
    batch: "",
    profile_pic: "",
  });
  const [batchList, setBatchList] = useState([]); // To store distinct batches
  const [message, setMessage] = useState("");

  // Fetch distinct batches when the component loads
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/getDistinctBatches/${academyId}`
        );
        setBatchList(response.data);
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };
    fetchBatches();
  }, [API_BASE_URL, academyId]);

  // Fetch Player Details only on button click
  const fetchPlayerDetails = async () => {
    if (!playerId) {
      setMessage("Please enter a Player ID.");
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/getPlayerDetails/${academyId}/${playerId}`
      );
      if (response.data) {
        setPlayerData(response.data);
        setMessage(""); // Clear message if player is found
      } else {
        setMessage(`Player not found in this academy.`);
      }
    } catch (error) {
      console.error("Error fetching player details:", error);
      setMessage("Error fetching player details. Please try again.");
    }
  };

  // // Handle Player Data Update
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setPlayerData({
  //     ...playerData,
  //     [name]: value,
  //   });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPlayerData((prevData) => ({
      ...prevData,
      [name]: name === "dob" ? value : value, // Simply update the value as-is
    }));
  };


  // Format the date before rendering in the input field
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Manually format the date in the local format (YYYY-MM-DD)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    // Return the formatted date as 'YYYY-MM-DD'
    return `${year}-${month}-${day}`;
  };


  // Handle Save Changes Request
  const saveChanges = async (e) => {
    e.preventDefault();

    // To avoid shifting by one day, store the date in the format YYYY-MM-DD
    const formattedData = {
      ...playerData,
      dob: playerData.dob ? new Date(playerData.dob).toLocaleDateString("en-CA") : "", // Use local date format (YYYY-MM-DD)
    };
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/editPlayer/${academyId}/${playerId}`,
        formattedData
      );
      if (response.status === 200) {
        setMessage("Player details updated successfully!");
        // alert("Player Updated..");
        setTimeout(() => {
          navigate(`/AcademyDetails/${role}/${academyId}/Player`); // Redirect to Player Page
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating player details:", error);
      setMessage("Failed to update player details. Please try again.");
    }
  };


  return (
    <div className="edit-player-container">
      <h2 className='heading'>Edit Player</h2>


      <div className="form-group">
        <label>Player ID:</label>
        <input
          type="text"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          placeholder="Enter Player ID"
        />
        <button onClick={fetchPlayerDetails}>Check Player</button>
        <Link to={`/AcademyDetails/${role}/${academyId}/player`}>
          <button type="button">Back</button>
        </Link>
      </div>

      {playerId && (
        <form onSubmit={saveChanges}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={playerData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formatDate(playerData.dob)}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <select
              name="gender"
              value={playerData.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label>School Name:</label>
            <input
              type="text"
              name="school_name"
              value={playerData.school_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Sports Expertise:</label>
            <input
              type="text"
              name="sports_expertise"
              value={playerData.sports_expertise}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={playerData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Previous Academy:</label>
            <input
              type="text"
              name="previous_academy"
              value={playerData.previous_academy}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Father Name:</label>
            <input
              type="text"
              name="father_name"
              value={playerData.father_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Mother Name:</label>
            <input
              type="text"
              name="mother_name"
              value={playerData.mother_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phone_number"
              value={playerData.phone_number}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Batch:</label>
            <select
              name="batch"
              value={playerData.batch}
              onChange={handleInputChange}
            >
              <option value="">Select Batch</option>
              {batchList.map((batch) => (
                <option key={batch.timing} value={batch.timing}>
                  {batch.timing}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Profile Picture URL:</label>
            <input
              type="text"
              name="profile_pic"
              value={playerData.profile_pic}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">Save Changes</button>
          {message && <p style={{ color: "green" }}>{message}</p>}
          <Link to={`/AcademyDetails/${role}/${academyId}/Player`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <button>Back</button>
          </Link>
        </form>
      )}
    </div>
  );
};

export default EditPlayer;
