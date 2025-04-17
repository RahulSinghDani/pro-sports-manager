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
    f_ph_num: "",
    m_ph_num: "",
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
          `${API_BASE_URL}/api/getDistinctBatches/${academyId}`, { withCredentials: true }
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
        `${API_BASE_URL}/api/getPlayerDetails/${academyId}/${playerId}`, { withCredentials: true }
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

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profile_pic" && files && files[0]) {
      const file = files[0];
      setPlayerData((prevData) => ({
        ...prevData,
        profile_pic: file, // Store file object
      }));
    } else {
      setPlayerData((prevData) => ({
        ...prevData,
        [name]: name === "dob" ? value : value, // Keep dob handling as-is
      }));
    }
  };

  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl); // Show preview before uploading

      // Update playerData state
      setPlayerData({ ...playerData, profile_pic: file });
    }
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

  const saveChanges = async (e) => {
    e.preventDefault();

    // Format DOB to avoid shifting issues (YYYY-MM-DD format)
    const formattedDOB = playerData.dob
      ? new Date(playerData.dob).toISOString().split("T")[0]
      : "";

    // Create FormData for sending file + other fields
    const formData = new FormData();
    formData.append("name", playerData.name);
    formData.append("dob", formattedDOB);
    formData.append("gender", playerData.gender);
    formData.append("school_name", playerData.school_name);
    formData.append("sports_expertise", playerData.sports_expertise);
    formData.append("address", playerData.address);
    formData.append("previous_academy", playerData.previous_academy);
    formData.append("father_name", playerData.father_name);
    formData.append("mother_name", playerData.mother_name);
    formData.append("phone_number", playerData.phone_number);
    formData.append("f_ph_num", playerData.f_ph_num);
    formData.append("m_ph_num", playerData.m_ph_num);
    formData.append("batch", playerData.batch);

    if (playerData.profile_pic) {
      formData.append("profile_pic", playerData.profile_pic); // Append image file
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/editPlayer/${academyId}/${playerId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true
        }
      );

      if (response.status === 200) {
        setMessage("Player details updated successfully!");
        setTimeout(() => {
          navigate(`/AcademyDetails/${role}/${academyId}/Player`);
        }, 100);
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
          <button className="back-btn" type="button">Back</button>
        </Link>
      </div>

      {playerId && (
        <form onSubmit={saveChanges}>
          <div className="form-group-main">
            <div className="form-seperator-in-parts">
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
                <label>Phone Number:</label>
                <input
                  type="text"
                  name="phone_number"
                  value={playerData.phone_number}
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

              
            </div>
            <div className="form-seperator-in-parts">
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
                <label>Father's Name:</label>
                <input
                  type="text"
                  name="father_name"
                  value={playerData.father_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Father's Ph. Num.:</label>
                <input
                  type="text"
                  name="f_ph_num"
                  value={playerData.f_ph_num}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Mother's Name:</label>
                <input
                  type="text"
                  name="mother_name"
                  value={playerData.mother_name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Mother's Ph. Num.:</label>
                <input
                  type="text"
                  name="m_ph_num"
                  value={playerData.m_ph_num}
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
            </div>
          </div>
          <div className="form-group">
            <label>Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              name="profile_pic"
              onChange={(e) => handleImageChange(e)}
            />

            {/* Show existing image or preview selected image */}
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile Preview"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                  marginTop: "10px",
                  objectFit: "cover"
                }}
              />
            ) : playerData.profile_pic ? (
              <img
                src={`${API_BASE_URL}/uploads/${playerData.profile_pic}`} // Adjust path if needed
                alt="Profile"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                  marginTop: "10px",
                  objectFit: "cover"
                }}
              />
            ) : null}
          </div>



          <button type="submit">Save Changes</button>
          {message && <p style={{ color: "green" }}>{message}</p>}
          <Link to={`/AcademyDetails/${role}/${academyId}/Player`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <button className="back-btn">Back</button>
          </Link>
        </form>
      )}
    </div>
  );
};

export default EditPlayer;
