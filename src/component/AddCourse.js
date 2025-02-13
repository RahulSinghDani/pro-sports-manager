import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import About from "./About";
const AddCourse = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { academyId, role } = useParams(); // Get academyId from URL
  const navigate = useNavigate(); // To navigate after adding a course

  const [courseName, setCourseName] = useState("");
  const [timing, setTiming] = useState("");
  const [startHour, setStartHour] = useState("");
  const [startAmPm, setStartAmPm] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endAmPm, setEndAmPm] = useState("");
  const [fee, setFee] = useState("");
  const [half_yearly, setHalfYearly] = useState("");
  const [yearly, setYearly] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-update timing when all fields are selected
  useEffect(() => {
    if (startHour && startAmPm && endHour && endAmPm) {
      setTiming(`${startHour} ${startAmPm} to ${endHour} ${endAmPm}`);
    }
  }, [startHour, startAmPm, endHour, endAmPm]);

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
        `${API_BASE_URL}/api/addCourse/${academyId}`,
        {
          course_name: courseName,
          timing: timing,
          fee: parseFloat(fee),
          half_yearly: parseFloat(half_yearly),
          yearly : parseFloat(yearly),
        },
        { withCredentials: true }
      );

      // Check for successful response
      if (response.status === 200) {
        setMessage(response.data.message);
        // Redirect to the AcademyDetails/Courses page after success
        setTimeout(() => {
          navigate(`/AcademyDetails/${role}/${academyId}/Courses`);
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      console.error("Error adding course:", error);
      setMessage("Failed to add course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="nav">
        <h3 className="logo">Pro Sports Manager</h3>
      </div>
    <div className="below-navbar">
      <h2>Add New Course</h2>
      <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0" }} /> {/*  adjust margin to set into column line */}

      <p>{academyId ? `Academy ID: ${academyId}` : "Academy ID not available"}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Name:</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        {/* ---------------------------------- */}
        <div className="form-group">
          <label>Start Time:</label>
          <select value={startHour} onChange={(e) => setStartHour(e.target.value)} required>
            <option value="">Hour</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <select value={startAmPm} onChange={(e) => setStartAmPm(e.target.value)} required>
            <option value="">AM/PM</option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>

          <label>End Time:</label>
          <select value={endHour} onChange={(e) => setEndHour(e.target.value)} required>
            <option value="">Hour</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <select value={endAmPm} onChange={(e) => setEndAmPm(e.target.value)} required>
            <option value="">AM/PM</option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>

          <p><strong>Selected Time:</strong> {timing || "Please select both start and end times"}</p>
        </div>
        {/* ----------------------------------- */}

        <div className="form-group">
          <label>Quarterly Fee:</label>
          <input
            type="number"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Half Yearly Fee:</label>
          <input
            type="number"
            value={half_yearly}
            onChange={(e) => setHalfYearly(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Yearly Fee:</label>
          <input
            type="number"
            value={yearly}
            onChange={(e) => setYearly(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Submit Course"}
        </button>
        {message && <p style={{textAlign:"center",color:"green"}}>{message}</p>}
        <Link to={`/AcademyDetails/${role}/${academyId}/Courses`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <button>Back</button>
        </Link>
      </form>
      
    </div>
    <About />
    </div>
  );
};

export default AddCourse;
