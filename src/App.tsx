import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const App = () => {
  const [score, setScore] = useState(0);
  const [simulationData, setSimulationData] = useState([]);

  // Simulate 30 days of activity
  useEffect(() => {
    const data = [];
    let currentScore = 0;

    for (let day = 0; day < 30; day++) {
      // Simulate random activities
      const dailyActivities = Math.floor(Math.random() * 4); // 0-3 activities per day
      const baseScore = currentScore;

      // Add points for new activities
      for (let i = 0; i < dailyActivities; i++) {
        const activityPoints = Math.random() * 10;
        // Diminishing returns formula
        const pointsToAdd = activityPoints / Math.sqrt(1 + currentScore / 50);
        currentScore = Math.min(100, currentScore + pointsToAdd);
      }

      // Apply decay
      currentScore = Math.max(0, currentScore * 0.95);

      data.push({
        day,
        score: currentScore.toFixed(2),
        baseScore: baseScore.toFixed(2),
      });
    }

    setSimulationData(data);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Activity Score Simulation</h2>
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          This simulation shows how the score changes over 30 days with: -
          Exponential decay (5% daily) - Diminishing returns for repeated
          activities - Maximum score cap at 100 - Easier growth at lower scores
        </p>
      </div>
      <div className="w-full h-64">
        <LineChart width={600} height={300} data={simulationData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#8884d8"
            name="Score with Activities"
          />
          <Line
            type="monotone"
            dataKey="baseScore"
            stroke="#82ca9d"
            name="Base Decay"
          />
        </LineChart>
      </div>
    </div>
  );
};

export default App;
