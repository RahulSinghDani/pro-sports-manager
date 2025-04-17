import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import AcademyNavbar from "./AcademyNavbar";
import axios from "axios";

const PlayerAttendance = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { academyId, role } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedDate = queryParams.get("date") || new Date().toISOString().split("T")[0];
    console.log(selectedDate);
    const today = new Date().toISOString().split("T")[0];

    const [players, setPlayers] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [submittedAttendance, setSubmittedAttendance] = useState({});
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [isPastDate, setIsPastDate] = useState(false);
    const [attendanceExists, setAttendanceExists] = useState(false);

    useEffect(() => {
        setIsPastDate(selectedDate < today);

        axios
            .get(`${API_BASE_URL}/api/attendance/${academyId}?date=${selectedDate}`, { withCredentials: true })
            .then(response => {
                console.log("API Response:", response); // 🛠 Debugging log

                if (response.attendanceExists) {
                    setAttendance(response.attendanceData);
                    setSubmittedAttendance(response.attendanceData);
                    setAttendanceExists(true);
                } else if (selectedDate === today) {
                    fetchPlayers();
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching attendance:", error);
                setError("Failed to load attendance.");
                setLoading(false);
            });
    }, [API_BASE_URL, academyId, selectedDate]);


    const fetchPlayers = () => {
        axios
            .get(`${API_BASE_URL}/api/players/${academyId}`, { withCredentials: true })
            .then(response => {
                setPlayers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching players:", error);
                setError("Failed to load player details.");
                setLoading(false);
            });
    };

    const handleAttendanceChange = (playerId, status) => {
        setAttendance({ ...attendance, [playerId]: status });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/api/markAttendance/${academyId}`, {
                date: selectedDate,
                attendance,
            }, { withCredentials: true });
            setMessage("Attendance marked successfully!");
            setSubmittedAttendance(attendance);
            setAttendanceExists(true);
        } catch (error) {
            setMessage("Failed to mark attendance. Try again.");
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <AcademyNavbar role={role} academyId={academyId} />
            <div className="below-navbar">
                <h2>Player Attendance - {selectedDate}</h2>
                {loading ? <p>Loading...</p> : (
                    <div>
                        {isPastDate && !attendanceExists ? (
                            <p>No attendance record available for this date.</p>
                        ) : (
                            <form onSubmit={selectedDate === today ? handleSubmit : (e) => e.preventDefault()}>
                                <div>
                                    <div>
                                        <div>
                                            <th>Player Name</th>
                                            <th>Attendance</th>
                                        </div>
                                    </div>
                                    <div>
                                        {players.map((player) => (
                                            <div key={player.id}>

                                                <div>
                                                    {attendanceExists ? (
                                                        <div>
                                                            <div>{player.name}</div>
                                                        <div>{submittedAttendance[player.id] || "N/A"}</div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div style={{ display: 'flex', flexDirection: 'row', border: '1px solid grey' }}>
                                                                <h4>{player.name}</h4>
                                                                <div style={{ width: '40%' }}>
                                                                    <label>
                                                                        <input
                                                                            type="radio"
                                                                            name={`attendance-${player.id}`}
                                                                            value="present"
                                                                            checked={attendance[player.id] === "present"}
                                                                            onChange={() => handleAttendanceChange(player.id, "present")}
                                                                            required
                                                                        /> Present
                                                                    </label>

                                                                    <label>
                                                                        <input
                                                                            type="radio"
                                                                            name={`attendance-${player.id}`}
                                                                            value="absent"
                                                                            checked={attendance[player.id] === "absent"}
                                                                            onChange={() => handleAttendanceChange(player.id, "absent")}
                                                                        /> Absent
                                                                    </label>
                                                                    <label>
                                                                        <input
                                                                            type="radio"
                                                                            name={`attendance-${player.id}`}
                                                                            value="late"
                                                                            checked={attendance[player.id] === "late"}
                                                                            onChange={() => handleAttendanceChange(player.id, "late")}
                                                                        /> Late
                                                                    </label>
                                                                    <label>
                                                                        <input
                                                                            type="radio"
                                                                            name={`attendance-${player.id}`}
                                                                            value="excused"
                                                                            checked={attendance[player.id] === "excused"}
                                                                            onChange={() => handleAttendanceChange(player.id, "excused")}
                                                                        /> Excused
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {selectedDate === today && !attendanceExists && <button type="submit">Submit Attendance</button>}
                            </form>
                        )}
                        {message && <p>{message}</p>}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlayerAttendance;
