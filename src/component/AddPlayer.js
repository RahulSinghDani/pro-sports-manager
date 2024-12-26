import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate,Link } from "react-router-dom";

const AddPlayer = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const { academyId, role } = useParams(); // Get academyId from URL
  const navigate = useNavigate(); // To navigate after adding a player

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [sportsExpertise, setSportsExpertise] = useState("");
  const [address, setAddress] = useState("");
  const [previousAcademy, setPreviousAcademy] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [batch, setBatch] = useState(""); // For batch selection
  const [profilePic, setProfilePic] = useState(null);

  const [batches, setBatches] = useState([]);
  const [playerId, setPlayerId] = useState(""); // For unique player ID
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch available batches for the selected academy
    const fetchBatches = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/getDistinctBatches/${academyId}`);
        setBatches(response.data);
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };

    // Fetch a unique player ID
    const fetchPlayerId = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/getUniquePlayerId`);
        setPlayerId(response.data.id);
      } catch (error) {
        console.error("Error fetching player ID:", error);
      }
    };

    if (academyId) {
      fetchBatches();
      fetchPlayerId();
    }
  }, [API_BASE_URL ,academyId]);

  // Handle form submission to add a new player
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!academyId) {
      setMessage("Academy ID is required.");
      return;
    }

    if (!batch) {
      setMessage("Please select a batch.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("school_name", schoolName);
      formData.append("sports_expertise", sportsExpertise);
      formData.append("address", address);
      formData.append("previous_academy", previousAcademy);
      formData.append("father_name", fatherName);
      formData.append("mother_name", motherName);
      formData.append("phone_number", phoneNumber);
      formData.append("batch", batch);
      if (profilePic) {
        formData.append("profile_pic", profilePic);
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/addPlayer/${academyId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        setMessage(response.data.message);
        setTimeout(() => {
          navigate(`/AcademyDetails/${role}/${academyId}/Player`); // Redirect to Players page after success
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding player:", error);
      setMessage("Failed to add player. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-player-container">
      <h2>Add New Player</h2>
      <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0"}}/> {/*  adjust margin to set into column line */}

      <p>{academyId ? `Academy ID: ${academyId}` : "Academy ID not available"}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Player ID (Unique):</label>
          <input type="text" value={playerId} disabled />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>School Name:</label>
          <input
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Sports Expertise:</label>
          <input
            type="text"
            value={sportsExpertise}
            onChange={(e) => setSportsExpertise(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Previous Academy:</label>
          <input
            type="text"
            value={previousAcademy}
            onChange={(e) => setPreviousAcademy(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Father's Name:</label>
          <input
            type="text"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mother's Name:</label>
          <input
            type="text"
            value={motherName}
            onChange={(e) => setMotherName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Batch:</label>
          <select value={batch} onChange={(e) => setBatch(e.target.value)} required>
            <option value="">Select Batch</option>
            {batches.map((batch) => (
              <option key={batch.batch_name} value={batch.batch_name}>
                {batch.batch_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Player"}
        </button>
        <Link to={`/AcademyDetails/${role}/${academyId}/Player`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <button>Back</button>
      </Link>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddPlayer;
