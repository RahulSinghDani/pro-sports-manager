import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate,Link } from 'react-router-dom';

const EditCourse = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const { academyId ,role} = useParams(); // Getting academyId from URL params
  const [courseId, setCourseId] = useState('');
  const [courseName, setCourseName] = useState('');
  const [timing, setTiming] = useState('');
  const [fee, setFee] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [courseFound, setCourseFound] = useState(false);
  const navigate = useNavigate();

  // Step 1: Handle the courseId input
  const handleCourseIdSubmit = () => {
    if (!courseId) {
      setMessage('Please enter a valid course ID.');
      return;
    }

    // Fetch the course data using the courseId and academyId
    axios
      .get(`${API_BASE_URL}/api/courses/${academyId}/${courseId}`)
      .then((response) => {
        const { course_name, timing, fee } = response.data;
        setCourseName(course_name);
        setTiming(timing);
        setFee(fee);
        setCourseFound(true); // Mark course found
        setMessage(''); // Clear the message if course found
      })
      .catch((error) => {
        console.error('Error fetching course data:', error);
        setMessage('Course not found.');
      });
  };

  // Step 2: Handle form submission to update course
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!academyId || !courseId || !courseName || !timing || !fee) {
      setMessage('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/editCourse/${academyId}/${courseId}`,
        {
          course_name: courseName,
          timing: timing,
          fee: parseFloat(fee),
        }
      );

      if (response.status === 200) {
        setMessage('Course updated successfully!');
        setTimeout(() => {
          navigate(`/AcademyDetails/${role}/${academyId}/Courses`); // Redirect to courses list after successful update
        }, 2000);
      }
    } catch (error) {
      console.error('Error updating course:', error);
      setMessage('Failed to update course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-course-container">
      <h2 className='heading'>Edit Course</h2>
      <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0"}}/> {/*  adjust margin to set into column line */}

      <p style={{textAlign:"center"}}>{academyId ? `Academy ID: ${academyId}` : 'Academy ID not available'}</p>

      {/* Step 1: Input for courseId */}
      {!courseFound ? (
        <div style={{ display:"flex",justifyContent:"center", alignItems:"center",flexDirection:"column"}}>
          <label style={{margin:"8px"}}>Course ID:</label>
          <input
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            placeholder="Enter Course ID"
          />
          <button onClick={handleCourseIdSubmit}>Find Course</button>
          <Link to={`/AcademyDetails/${role}/${academyId}/courses`}>
            <button type="button">Back</button>
          </Link>
        </div>
      ) : (
        <div>
          {/* Step 2: Display course edit form if courseId is found */}
          <p style={{textAlign:"center"}}>Editing Course ID: {courseId}</p>

          {message && <p style={{textAlign:"center"}}>{message}</p>}

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
              {loading ? 'Updating...' : 'Update Course'}
            </button>
            <Link to={`/AcademyDetails/${role}/${academyId}/Courses`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <button>Back</button>
      </Link>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditCourse;
