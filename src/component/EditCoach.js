import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditCoach = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL  ;

  const { academyId ,role} = useParams(); // Get academyId from URL parameters
  const [coachId, setCoachId] = useState('');
  const [coachName, setCoachName] = useState('');
  const [designation, setDesignation] = useState('');
  const [address, setAddress] = useState('');
  const [experience, setExperience] = useState('');
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
      setMessage('Please enter a valid coach ID.');
      return;
    }

    axios
      .get(`${API_BASE_URL}/api/coach/${academyId}/${coachId}`,{ withCredentials: true })
      .then((response) => {
        const {
          coachName,
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

        setCoachName(coachName || '');
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
        console.error('Error fetching coach data:', error);
        setMessage('Coach not found.');
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
    if (!coachId || !coachName || !designation || !address || !experience || !phoneNumber || !email || !salary) {
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
        coachName,
        designation,
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
      setMessage('Failed to update coach. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-coach-container">
      <h2 className='heading'>Edit Coach</h2>
      <div style={{ width: "100%", height: "2px", backgroundColor: "blue", margin: "20px 0"}}/> {/*  adjust margin to set into column line */}

      <p style={{textAlign:"center"}}>{academyId ? `Academy ID: ${academyId}` : 'Academy ID not available'}</p>

      {!coachFound ? (
        <div style={{ display:"flex",justifyContent:"center", alignItems:"center",flexDirection:"column"}}>
          <label style={{margin:"8px"}}>Coach ID:</label>
          <input
            type="text"
            value={coachId}
            onChange={(e) => setCoachId(e.target.value)}
            placeholder="Enter Coach ID"
          />
          <button onClick={handleCoachIdSubmit}>Find Coach</button>
          <Link to={`/AcademyDetails/${role}/${academyId}/Coach`}>
            <button type="button">Back</button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Coach Name:</label>
            <input
              type="text"
              value={coachName}
              onChange={(e) => setCoachName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Designation:</label>
            <select value={designation} onChange={(e) => setDesignation(e.target.value)} required>
              <option value="">Select Designation</option>
              <option value="Coach">Coach</option>
              <option value="Manager">Manager</option>
            </select>
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
              value={salaryFrequency}
              onChange={(e) => setSalaryFrequency(e.target.value)}
              required
            />
          </div>

          {/* <div>
            <label>Resume:</label>
            <input
              type="text"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
             
            />
          </div> */}

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
            {loading ? 'Updating...' : 'Update Coach'}
          </button>

          <Link to={`/AcademyDetails/${role}/${academyId}/Coach`}>
            <button type="button">Back</button>
          </Link>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditCoach;
