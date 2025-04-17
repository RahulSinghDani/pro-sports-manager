import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import About from './About';

const EditCoach = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { academyId, role } = useParams(); // Get academyId from URL parameters
  const [coachId, setCoachId] = useState('');
  const [name, setCoachName] = useState('');
  const [address, setAddress] = useState('');
  const [experience, setExperience] = useState('');
  const [designation, setDesignation] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [salaryFrequency, setSalaryFrequency] = useState('');
  // const [resume, setResume] = useState('');
  // const [batches, setBatches] = useState([{ batchName: '', timing: '' }]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [coachFound, setCoachFound] = useState(false);
  const navigate = useNavigate();

  // Fetch coach details
  const handleCoachIdSubmit = () => {
    if (!coachId) {
      setMessage('Please enter a valid employee ID.');
      return;
    }

    axios
      .get(`${API_BASE_URL}/api/coach/${academyId}/${coachId}`, { withCredentials: true })
      .then((response) => {
        const {
          name,
          designation,
          address,
          experience,
          phoneNumber,
          email,
          salary,
          salaryFrequency,
          // resume,
          // batchName,
        } = response.data;

        setCoachName(name || '');
        setDesignation(designation || '');
        setAddress(address || '');
        setExperience(experience || '');
        setPhoneNumber(phoneNumber || '');
        setEmail(email || '');
        setSalary(salary || '');
        setSalaryFrequency(salaryFrequency || '');
        // setResume(resume || '');
        // setBatches(
        //   batchName
        //     ? batchName
        //       .split(',')
        //       .map((batch) => {
        //         const match = batch.match(/(.*)\s\((.*)\)/);
        //         if (match) {
        //           const [name, timing] = match.slice(1);
        //           return { batchName: name.trim(), timing: timing.trim() };
        //         } else {
        //           return { batchName: batch.trim(), timing: '' };
        //         }
        //       })
        //     : [{ batchName: '', timing: '' }] // Default to one empty batch
        // );



        setCoachFound(true);
        setMessage('');
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
        setMessage('Employee not found.');
      });
  };

  // Handle batch changes
  // const handleBatchChange = (index, field, value) => {
  //   const updatedBatches = [...batches];
  //   updatedBatches[index][field] = value;
  //   setBatches(updatedBatches);
  // };

  // const addBatch = () => setBatches([...batches, { batchName: '', timing: '' }]);

  // const removeBatch = (index) => setBatches(batches.filter((_, i) => i !== index));

  // Update coach details
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coachId || !name || !address || !experience || !phoneNumber || !email || !salary) {
      setMessage('All fields are required.');
      return;
    }

    // const batchData = batches
    //   .filter((batch) => batch.batchName && batch.timing)
    //   .map((batch) => `${batch.batchName} (${batch.timing})`)
    //   .join(', ');

    setLoading(true);

    try {
      const response = await axios.put(`${API_BASE_URL}/api/editCoach/${academyId}/${coachId}`, {
        name,
       
        address,
        experience,
        phoneNumber,
        email,
        salary: parseFloat(salary),
        salaryFrequency,
        // resume,
        // batchName: batchData,
      }, { withCredentials: true });

      if (response.status === 200) {
        setMessage('Employee updated successfully!');
        setTimeout(() => {
          navigate(`/AcademyDetails/${role}/${academyId}/Coach`);
        }, 100);
      }
    } catch (error) {
      console.error('Error updating Employee:', error);
      setMessage('Failed to update Employee. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='nav'>
        <p className='logo'>Pro Sports Manager</p>
      </div>
      <div className="below-navbar">
        <h2 className='heading'>Edit Employee</h2>
        <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0" }} /> {/*  adjust margin to set into column line */}

        {/* <p style={{textAlign:"center"}}>{academyId ? `Academy ID: ${academyId}` : 'Academy ID not available'}</p> */}

        {!coachFound ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <label style={{ margin: "8px" }}>Employee ID:</label>
            <input
              type="text"
              value={coachId}
              onChange={(e) => setCoachId(e.target.value)}
              placeholder="Enter Employee ID"
            />
            <button onClick={handleCoachIdSubmit}>Find Employee</button>
            <Link to={`/AcademyDetails/${role}/${academyId}/Coach`}>
              <button type="button" className='back-btn'>Back</button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-seperator-in-parts">
              <div>
                <label>Employee Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setCoachName(e.target.value)}
                  required
                />
              </div>


              <div>
                <label>Address:</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Experience (Years):</label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Phone Number:</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Salary:</label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Salary Frequency:</label>
                <input
                  type="text"
                  list="salaryOptions"
                  value={salaryFrequency}
                  onChange={(e) => setSalaryFrequency(e.target.value)}
                  required
                />
                <datalist id="salaryOptions">
                  <option value="Monthly" />
                  <option value="Weekly" />
                  <option value="Daily" />
                </datalist>
              </div>

            </div>
            

            {/* <h4>Batch Information</h4> */}
            {/* {batches.map((batch, index) => (
            <div key={index}>
              <label>Batch Name:</label>
              <input
                type="text"
                value={batch.batchName}
                onChange={(e) => handleBatchChange(index, 'batchName', e.target.value)}
                required
              />
              <label>Timing:</label>
              <input
                type="text"
                value={batch.timing}
                onChange={(e) => handleBatchChange(index, 'timing', e.target.value)}
                required
              />
              <button type="button" onClick={() => removeBatch(index)}>
                Remove Batch
              </button>
            </div>
          ))} */}

            {/* <button type="button" onClick={addBatch}>
            Add New Batch
          </button> */}

            <button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Employee'}
            </button>

            <Link to={`/AcademyDetails/${role}/${academyId}/Coach`}>
              <button type="button" className='back-btn'>Back</button>
            </Link>
          </form>
        )}
        {message && <p>{message}</p>}
      </div>
      <About />
    </div>
  );
};

export default EditCoach;
