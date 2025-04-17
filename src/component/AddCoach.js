import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';


const AddCoach = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { academyId, role } = useParams(); // Get the academyId from the URL
  const navigate = useNavigate(); // To navigate after adding a course

  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [address, setAddress] = useState('');
  const [experience, setExperience] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [salaryFrequency, setSalaryFrequency] = useState('');
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");


  // For batch input fields
  const [batches, setBatches] = useState([
    { batchName: '', timing: '' }
  ]);
  const [generatedId, setGeneratedId] = useState('');
  const [courseTimings, setCourseTimings] = useState([]); // For fetched timings


  useEffect(() => {
    const fetchCourseTimings = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/courses/${academyId}`, { withCredentials: true });
        setCourseTimings(response.data);
      } catch (error) {
        console.error('Error fetching course timings:', error);
      }
    };

    fetchCourseTimings();
  }, [API_BASE_URL, academyId]);

  const handleBatchChange = (index, field, value) => {
    const updatedBatches = [...batches];
    updatedBatches[index][field] = value;
    setBatches(updatedBatches);
  };

  const addBatch = () => {
    setBatches([...batches, { batchName: '', timing: '' }]);
  };

  const removeBatch = (index) => {
    const updatedBatches = batches.filter((_, i) => i !== index);
    setBatches(updatedBatches);
  };


  // Function to generate a unique coach ID
  useEffect(() => {
    // Function to generate a unique coach ID
    const generateCoachId = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/getUniqueCoachId`, { withCredentials: true });
        setGeneratedId(response.data.id);
      } catch (error) {
        console.error('Error fetching coach data for ID generation:', error);
      }
    };

    // Generate ID when the component mounts or academyId changes
    generateCoachId();
  }, [API_BASE_URL, academyId]);  // Runs when API_BASE_URL or academyId changes




  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect all batch data and format it as required
    const batchData = batches
      .filter(batch => batch.batchName && batch.timing)
      .map(batch => `${batch.batchName} (${batch.timing})`)
      .join(', ');

    const formData = new FormData();
    formData.append('coach_id', generatedId);
    formData.append('academyId', academyId);
    formData.append('name', name);
    formData.append('designation', designation);
    formData.append('address', address);
    formData.append('experience', experience);
    formData.append('phone_num', phoneNum);
    formData.append('email', email);
    formData.append('salary', salary);
    formData.append('salary_frequency', salaryFrequency);
    formData.append('batch_name', batchData);
    if (resume) formData.append('resume', resume);

    // Send data to the backend
    axios.post(`${API_BASE_URL}/api/addCoach/${academyId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }, withCredentials: true
    })
      .then(response => {
        console.log('Coach added successfully', response);
        // Optionally redirect or show success message

        if (response.status === 200) {
          setMessage(response.data.message);
          setTimeout(() => {
            navigate(`/AcademyDetails/${role}/${academyId}/Coach`); // Redirect to Players page after success
          }, 100);
        }
      })
      .catch(error => {
        console.error('Error adding coach:', error);
      });


  };

  return (
    <div>
      <div className='nav'>
        <p className='logo'>Pro Sports Manager</p>
      </div>
      <div className='below-navbar'>
        <h2>Add Employee</h2>
        <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0" }} /> {/*  adjust margin to set into column line */}

        <form onSubmit={handleSubmit}>
          <div className="form-group-main">
            <div className="form-seperator-in-parts">
              <div className='form-group'>
                <label>Employee ID: </label>
                <input
                  type="text"
                  value={generatedId.toUpperCase()}
                  disabled
                />
              </div>
              <div className='form-group'>
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Designation:</label>
                <select
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                >
                  <option value="">Select Designation</option>
                  <option value="Coach">Coach</option>
                  <option value="Manager">Manager</option>
                  <option value="Principal">Principal</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Admin">Admin</option>
                  <option value="Librarian">Librarian</option>
                  <option value="Sports Coordinator">Sports Coordinator</option>
                </select>
              </div>


              {designation.toLowerCase() === 'coach' && (
                <>
                  <h4>Batch Information</h4>
                  {batches.map((batch, index) => (
                    <div key={index}>
                      <div className='form-group'>
                        <label>Batch Name:</label>
                        <select
                          value={batch.batchName}
                          onChange={(e) => handleBatchChange(index, 'batchName', e.target.value)}
                          required
                        >
                          <option value="">Select Batch</option>
                          <option value="Weekend">Weekend</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Half-Yearly">Half-Yearly</option>
                          <option value="Yearly">Yearly</option>
                        </select>
                      </div>
                      <div className='form-group'>
                        <label>Timing:</label>
                        <select
                          value={batch.timing}
                          onChange={(e) => handleBatchChange(index, 'timing', e.target.value)}
                          required
                        >
                          <option value="">Select Timing</option>
                          {courseTimings.map((course) => (
                            <option key={course.courseName} value={course.timing}>
                              {course.timing}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className='form-group'>
                        <button type="button" onClick={() => removeBatch(index)} className='remove-value-btn'>
                          Remove Batch
                        </button>
                      </div>
                    </div>
                  ))}
                  <div>
                    <button type="button" onClick={addBatch} className='add-value-btn'>
                      Add New Batch
                    </button>
                  </div>
                </>
              )}

              <div className='form-group'>
                <label>Address:</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-seperator-in-parts">
              <div className='form-group'>
                <label>Experience:</label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Phone Number:</label>
                <input
                  type="text"
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Salary:</label>
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  required
                />
              </div>
              <div className='form-group'>
                <label>Salary Frequency:</label>
                <select value={salaryFrequency} onChange={(e) => setSalaryFrequency(e.target.value)} required>
                  <option value="">Select Frequency</option>
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                  <option value="daily">Daily</option>
                </select>
              </div>
            </div>
            <div className='form-group'>
              <Link to={`/AcademyDetails/${role}/${academyId}/Coach`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <button className='back-btn'>Back</button>
              </Link>
              <button type="submit">Submit</button>
            </div>
          </div>

        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default AddCoach;
