import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate,Link } from 'react-router-dom';

const DeleteCourse = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL  ;

  const { academyId ,role} = useParams(); // Getting academyId from URL params
  const [courseId, setCourseId] = useState('');
  const [courseName, setCourseName] = useState('');
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
        const { course_name } = response.data;
        setCourseName(course_name);
        setCourseFound(true); // Mark course found
        setMessage(''); // Clear the message if course found
      })
      .catch((error) => {
        console.error('Error fetching course data:', error);
        setMessage('Course not found.');
      });
  };

  // Step 2: Handle course deletion
  const handleDelete = async () => {
    if (!courseId || !academyId) {
      setMessage('Course ID and Academy ID are required.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/deleteCourse/${academyId}/${courseId}`
      );

      if (response.status === 200) {
        setMessage('Course deleted successfully!');
        setTimeout(() => {
          navigate(`/AcademyDetails/${role}/${academyId}/Courses`); // Redirect to courses list after deletion
        }, 2000);
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      setMessage('Failed to delete course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-course-container">
      <h2 className='heading'>Delete Course</h2>
      <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0"}}/> {/*  adjust margin to set into column line */}

      <p>{academyId ? `Academy ID: ${academyId}` : 'Academy ID not available'}</p>

      {/* Step 1: Input for courseId */}
      {!courseFound ? (
        <div>
          <label>Course ID:</label>
          <input
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            placeholder="Enter Course ID"
          />
          <button onClick={handleCourseIdSubmit}>Find Course</button>
        </div>
      ) : (
        <div>
          {/* Step 2: Display course details and delete confirmation */}
          <p>Are you sure you want to delete the course: {courseName} (ID: {courseId})?</p>
          {message && <p>{message}</p>}

          <button onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Course'}
          </button>
          <Link to={`/AcademyDetails/${role}/${academyId}/Courses`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <button>Back</button>
      </Link>
        </div>
        
      )}
    </div>
  );
};

export default DeleteCourse;
