import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Attendance = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { academyId } = useParams();
  const [players, setPlayers] = useState([]);
  const [attendance, setAttendance] = useState({});

  

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to get current date in DD-MM-YYYY format
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };
  // useEffect(() => {
  //   // Fetch active players
  //   axios
  //     .get(`${API_BASE_URL}/api/players/active/${academyId}`, { withCredentials: true })
  //     .then(response => setPlayers(response.data))

  //     .catch(error => setError('Failed to load players'));

  //   // Fetch existing attendance records
  //   axios
  //     .get(`${API_BASE_URL}/api/attendance/${academyId}`, { withCredentials: true })
  //     .then(response => setAttendance(response.data))
  //     .catch(error => console.error('Error fetching attendance:', error));

  //   setLoading(false);
  // }, [API_BASE_URL, academyId]);

  // Get days & week names for **this month**
  
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/players/active/${academyId}`, { withCredentials: true })
      .then(response => {
        setPlayers(response.data);
  
        const today = new Date().getDate();
  
        // Load existing attendance, otherwise set "absent" as default
        axios.get(`${API_BASE_URL}/api/attendance/${academyId}`, { withCredentials: true })
          .then(attendanceResponse => {
            const fetchedAttendance = attendanceResponse.data;
  
            const updatedAttendance = response.data.reduce((acc, player) => {
              acc[player.id] = {
                ...fetchedAttendance[player.id], // Keep previous data
                [today]: fetchedAttendance[player.id]?.[today] || "absent", // Default to "absent" if not marked
              };
              return acc;
            }, {});
  
            setAttendance(updatedAttendance);
          })
          .catch(error => console.error('Error fetching attendance:', error));
      })
      .catch(error => setError('Failed to load players'));
  
    setLoading(false);
  }, [API_BASE_URL, academyId]);
  
  const getDaysInMonth = (date = new Date()) => {
    const year = date.getFullYear();
    const month = date.getMonth(); // Ensure correct month
    const days = [];

    for (let i = 1; i <= new Date(year, month + 1, 0).getDate(); i++) {
      const dayName = new Date(year, month, i).toLocaleDateString('en-US', { weekday: 'short' });
      days.push({ day: i, dayName });
    }

    return days;
  };
  const handleAttendanceChange = (playerId, day, status) => {
    const today = new Date().getDate();
    if (day !== today) return;

    setAttendance(prev => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        [day]: status || "absent", // Default to "absent" if no status is passed
      },
    }));
  };

  const saveAttendance = () => {
    const formattedAttendance = Object.entries(attendance).flatMap(([playerId, days]) =>
      Object.entries(days).map(([day, status]) => ({
        player_id: playerId,
        academy_id: academyId,
        date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${day}`,
        status,
      }))
    );

    axios
      .post(`${API_BASE_URL}/api/attendance/save`, formattedAttendance, { withCredentials: true })
      .then(() => alert('Attendance updated successfully'))
      .catch(error => console.error('Error saving attendance:', error));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Attendance</h2>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>📅 Date: {getCurrentDate()}</h3>
      </div>
      <div className="table-wrapper1">
        <table border="1" style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={{
                padding: '10px',
                fontWeight: 'bold',
                position: 'sticky',
                left: 0,
                background: 'rgb(2,2,2)', // Ensures readability
                zIndex: 2, // Keeps it above other elements
                borderRight: '1px solid #ddd', // Optional for better separation
              }}>Player Name</th>

              {getDaysInMonth().map(({ day, dayName }) => (
                <th key={day} style={{ padding: '10px', minWidth: '50px' }}>
                  {dayName} <br /> {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {players.map(player => (
              <tr key={player.id}>
                <td style={{
                  padding: '10px',
                  fontWeight: 'bold',
                  position: 'sticky',
                  left: 0,
                  background: 'white', // Ensures readability
                  zIndex: 2, // Keeps it above other elements
                  borderRight: '1px solid #ddd', // Optional for better separation
                }}>{player.name}</td>
                {getDaysInMonth().map(({ day, dayName }) => {
                  const isSunday = dayName === "Sun";
                  return (
                    <td key={day} style={{ padding: '5px' }}>
                      <input
                        type="checkbox"
                        className="attendance-checkbox-calender"
                        style={{ width: '18px', height: '18px' }}
                        checked={attendance[player.id]?.[day] === "present"} // Checked only if "present"
                        onChange={(e) =>
                          handleAttendanceChange(player.id, day, e.target.checked ? "present" : "absent")
                        }
                        disabled={isSunday || day !== new Date().getDate()}
                      />
                    </td>


                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={saveAttendance}
        style={{
          marginTop: '15px',
          padding: '10px 15px',
          fontSize: '16px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '5px'
        }}
      >
        Save Attendance
      </button>
    </div>
  );
};

export default Attendance;
