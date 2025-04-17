import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AcademyNavbar from './AcademyNavbar.js';
import { Link } from 'react-router-dom';
import About from './About.js';
const Courses = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { academyId, role } = useParams(); // Get the academy_id from the URL
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add a loading state
  // console.log(academyId); //-----------------------
  useEffect(() => {
    // Fetch course data from the backend
    axios
      .get(`${API_BASE_URL}/api/courses/${academyId}`, { withCredentials: true })
      .then(response => {
        setCourses(response.data); // Set the fetched courses data
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to load course details.');
        setLoading(false); // Set loading to false even on error
      });
  }, [API_BASE_URL, academyId]);

  // Show loading message while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if there is an error fetching data
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <AcademyNavbar role={role} academyId={academyId} />

      <div className='below-navbar'>
        <h2>Course Information</h2>
        <Link to={`/add-course/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <button>Add Course</button>
        </Link>

        {error && <p>{error}</p>}
        {courses.length === 0 ? (
          <p>No courses found for this academy.</p>
        ) : (
          <div className="table-wrapper">
            <table border="1" width="700px">
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Timing</th>
                  <th>Quarterly</th>
                  <th>Half Yearly</th>
                  <th>Yearly</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.course_id}>
                    <td>{course.course_id.toUpperCase()}</td>
                    <td>{course.course_name}</td>
                    <td>{course.timing}</td>
                    <td>{course.fee}</td>
                    <td>{course.half_yearly}</td>
                    <td>{course.yearly}</td>
                    <td>
                      <Link to={`/edit-course/${role}/${academyId}`}
                        state={{ courseId: course.course_id }}
                      >
                        <button>Edit</button>
                      </Link>

                      <Link to={`/delete-course/${role}/${academyId}`} state={{ courseId: course.course_id }}>
                        <button style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
                          Delete
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <About />
    </div>
  );
};

export default Courses;
