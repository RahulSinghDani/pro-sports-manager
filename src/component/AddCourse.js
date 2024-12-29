import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const AddCourse = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL  ;

  const { academyId ,role} = useParams(); // Get academyId from URL
  const navigate = useNavigate(); // To navigate after adding a course

  const [courseName, setCourseName] = useState("");
  const [timing, setTiming] = useState("");
  const [fee, setFee] = useState("");
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
        `${API_BASE_URL}/api/addCourse/${academyId}`,
        {
          course_name: courseName,
          timing: timing,
          fee: parseFloat(fee),
        }
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
    <div className="add-course-container">
      <h2>Add New Course</h2>
      <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0"}}/> {/*  adjust margin to set into column line */}

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
        <div className="form-group">
          <label>Timing:</label>
          <input
            type="text"
            value={timing}
            onChange={(e) => setTiming(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Fee:</label>
          <input
            type="number"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Course"}
        </button>
        <Link to={`/AcademyDetails/${role}/${academyId}/Courses`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <button>Back</button>
      </Link>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddCourse;
