import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const EditCourse = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const { academyId, role } = useParams(); // Getting academyId from URL params
  const [courseId, setCourseId] = useState(location.state?.courseId || '');
  const [courseName, setCourseName] = useState('');
  const [timing, setTiming] = useState('');
  const [startHour, setStartHour] = useState('');
  const [startAmPm, setStartAmPm] = useState('');
  const [endHour, setEndHour] = useState('');
  const [endAmPm, setEndAmPm] = useState('');
  const [fee, setFee] = useState('');
  const [half_yearly, setHalfYearly] = useState('');
  const [yearly, setYearly] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [courseFound, setCourseFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      handleCourseIdSubmit();
    }
  }, [courseId]);

  useEffect(() => {
    if (startHour && startAmPm && endHour && endAmPm) {
      setTiming(`${startHour} ${startAmPm} to ${endHour} ${endAmPm}`);
    }
  }, [startHour, startAmPm, endHour, endAmPm]);
  // Step 1: Handle the courseId input
  const handleCourseIdSubmit = () => {
    if (!courseId) {
      setMessage('Please enter a valid course ID.');
      return;
    }

    // Fetch the course data using the courseId and academyId
    axios
      .get(`${API_BASE_URL}/api/courses/${academyId}/${courseId}`, { withCredentials: true })
      .then((response) => {
        const { course_name, timing, fee } = response.data;
        setCourseName(course_name);
        setTiming(timing);
        setFee(fee);
        setHalfYearly(response.data.half_yearly);
        setYearly(response.data.yearly);

        const timingParts = timing.split(' to ');
        if (timingParts.length === 2) {
          const [startTime, endTime] = timingParts;
          const [startHourVal, startAmPmVal] = startTime.split(' ');
          const [endHourVal, endAmPmVal] = endTime.split(' ');
          setStartHour(startHourVal);
          setStartAmPm(startAmPmVal);
          setEndHour(endHourVal);
          setEndAmPm(endAmPmVal);
        }

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
    if (!academyId || !courseId || !courseName || !timing || !fee || !half_yearly || !yearly) {
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
          half_yearly: parseFloat(half_yearly),
          yearly: parseFloat(yearly),
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setMessage('Course updated successfully!');
        setOpen(false);
        setTimeout(() => {
          navigate(`/AcademyDetails/${role}/${academyId}/Courses`); // Redirect to courses list after successful update
        }, 100);
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
      <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0" }} /> {/*  adjust margin to set into column line */}

      {/* Step 1: Input for courseId */}
      <div>
        {/* Step 2: Display course edit form if courseId is found */}
        <p style={{ textAlign: "center" }}>Editing Course ID: {courseId}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Course Name:</label>
            <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)}
              required
            />
          </div>
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

            <p><strong>Selected Time:</strong> {timing || 'Please select both start and end times'}</p>
          </div>

          <div className="form-group">
            <label>Quarterly:</label>
            <input
              type="number"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Half Yearly:</label>
            <input
              type="number"
              value={half_yearly}
              onChange={(e) => setHalfYearly(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Yearly:</label>
            <input
              type="number"
              value={yearly}
              onChange={(e) => setYearly(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Course'}
          </button>
          <Link to={`/AcademyDetails/${role}/${academyId}/Courses`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <button className='back-btn'>Back</button>
          </Link>
          {message && <p style={{ textAlign: "center" }}>{message}</p>}
        </form>
      </div>

    </div>
  );
};

export default EditCourse;
