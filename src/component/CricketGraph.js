import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CricketGraph = ({academyId}) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/cricket-data/graph/${academyId}`);
                setPlayers(response.data);
            } catch (error) {
                console.error("Error fetching cricket data:", error);
            }
        };
        fetchData();
    }, [API_BASE_URL , academyId]);

    // Extract data for the graph
    const playerNames = players.map(player => player.name);
    const runs = players.map(player => player.runs);
    const wickets = players.map(player => player.wickets);

    // Sort players by performance (Runs + Wickets)
    const topPerformers = [...players].sort((a, b) => (b.runs + b.wickets) - (a.runs + a.wickets)).slice(0, 4);

    // Bar chart data
    const chartData = {
        labels: playerNames,
        datasets: [
            {
                label: "Runs",
                data: runs,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
            {
                label: "Wickets",
                data: wickets,
                backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
        ],
    };

    return (
        <div className="container-graph">
            <h2>Cricket Player Performance</h2>

            {/* Bar Chart */}
            <div className="graph-container-academy-details">
                <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
            </div>

            {/* Top Performers Section */}
            <div className="top-performers">
                <h2 className="title-cricket-performer">🏆 Top Performers</h2>
                <div className="top-performers-container">
                    {topPerformers.map((player, index) => (
                        <div key={index} className="top-performer-card">
                            <h3 className="player-rank">🙍‍♂️ #{index + 1} {player.name}</h3>
                            <p className="player-stat">🏏 Runs: <span>{player.runs}</span></p>
                            <p className="player-stat">🎯 Wickets: <span>{player.wickets}</span></p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default CricketGraph;
