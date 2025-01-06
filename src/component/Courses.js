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
      .get(`${API_BASE_URL}/api/courses/${academyId}`)
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

      <div className='container'>
        <h2>Course Information</h2>
        {/* <Link to="/edit-course">
        <button>Edit Course ( not working properly right now)</button>
      </Link> */}
        <Link to={`/edit-course/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <button>Edit Course</button>
        </Link>

        {/* <Link to={{ pathname: "/add-course", state: { academyId: academyId } }}>
  <button>Add Course</button>
</Link> */}
        <Link to={`/delete-course/${role}/${academyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <button>Delete Course</button>
        </Link>

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
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.course_id}>
                    <td>{course.course_id}</td>
                    <td>{course.course_name}</td>
                    <td>{course.timing}</td>
                    <td>{course.fee }</td>
                    <td>{course.fee * 3}</td>
                    <td>{course.fee * 6}</td>
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
