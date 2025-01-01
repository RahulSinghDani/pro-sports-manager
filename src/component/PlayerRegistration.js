import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import About from "./About";
const PlayerRegistration = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL  ;

  const navigate = useNavigate(); // Navigate to the Login page after registration
  const location = useLocation();

  const user_id = location.state?.user_id; // Safely access user_id

  // console.log("Received user_id:", user_id); // Verify user_id is received

  // State variables for form inputs
  const [academyId, setAcademyId] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  // const [schoolName, setSchoolName] = useState("");
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

  const [schoolList, setSchoolList] = useState([]); // Stores list of schools
  const [selectedSchool, setSelectedSchool] = useState("");


  // Fetch school/academy data and player ID on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const schoolResponse = await axios.get(`${API_BASE_URL}/api/schools`);
        setSchoolList(schoolResponse.data);
      } catch (error) {
        console.error("Error fetching school data:", error);
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/getUniquePlayerId`);
        setPlayerId(response.data.id);
      } catch (error) {
        console.error("Error fetching player ID:", error);
      }
    };

    if (user_id) {
      fetchInitialData();
    }
  }, [API_BASE_URL, user_id]);
  // Fetch available batches whenever selected school changes
  useEffect(() => {
    const fetchBatches = async () => {

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/getDistinctBatches/${academyId}`
        );
        setBatches(response.data.length ? response.data : []);

      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };

    fetchBatches();
  }, [API_BASE_URL,academyId]);
  //--------------

  // Handle dropdown change
  const handleSchoolChange = (event) => {
    const selectedId = event.target.value;
    setSelectedSchool(selectedId);
    setAcademyId(selectedId); // Set academyId to the selected school.id
  };



  // Handle form submission
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
      formData.append("user_id", user_id);
      // formData.append("school_name", schoolName);
      formData.append("school_name", selectedSchool);

      formData.append("academy_id", academyId);
      formData.append("name", name);
      formData.append("dob", dob);
      formData.append("gender", gender);
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
        setMessage("Player registered successfully!");
        setTimeout(() => {
          navigate("/Login"); // Redirect to Login page after success
        }, 2000);
      }
    } catch (error) {
      console.error("Error registering player:", error);
      setMessage("Failed to register player. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="player-registration-container">
      <nav className="nav">
        <h1 className="logo">Pro Sports Manager</h1>
        <Link to={`/`}>
          <button style={{ background: "rgb(13, 101, 183)", float: "right" }}>Home</button>
        </Link>
      </nav>
      <h2>Player Registration</h2>
      <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0" }} />

      {user_id ? (
        <p>User ID: {user_id}</p>
      ) : (
        <p style={{ color: "red" }}>User ID not available. Cannot proceed with registration.</p>
      )}
      <p>Academy ID: {academyId ? academyId : "Fetching Academy ID..."}</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Player ID (Unique):</label>
          <input type="text" value={playerId} disabled />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
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
          <select
            id="school"
            value={selectedSchool}
            onChange={handleSchoolChange}
            required
          >
            <option value="">-- Select School --</option>
            {schoolList.map((school) => (
              <option key={school.id} value={school.id}>
                {school.id} | {school.name}
              </option>
            ))}
          </select>
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
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Previous Academy:</label>
          <input type="text" value={previousAcademy} onChange={(e) => setPreviousAcademy(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Father's Name:</label>
          <input type="text" value={fatherName} onChange={(e) => setFatherName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Mother's Name:</label>
          <input type="text" value={motherName} onChange={(e) => setMotherName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {message && <p>{message}</p>}
      <About />
    </div>
  );
};


export default PlayerRegistration;
