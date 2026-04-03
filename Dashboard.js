import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [devices, setDevices] = useState([
    { id: 1, name: "Living Room Lights", room: "Living Room", status: true, power: 1 },
    { id: 2, name: "Smart AC", room: "Bedroom", status: true, power: 3 },
    { id: 3, name: "Ceiling Fan", room: "Kitchen", status: true, power: 1 },
    { id: 4, name: "Outdoor Camera", room: "Entrance", status: true, power: 1 },
    { id: 5, name: "Smart TV", room: "Living Room", status: false, power: 2 },
    { id: 6, name: "Water Heater", room: "Bathroom", status: true, power: 3 },
    { id: 7, name: "Refrigerator", room: "Kitchen", status: true, power: 2 },
    { id: 8, name: "Study Lamp", room: "Office", status: false, power: 1 }
  ]);

  const [energyHistory, setEnergyHistory] = useState([5, 6, 4, 7, 8, 6]);

  const toggleDevice = (id) => {
    const updated = devices.map((d) => {
      if (d.id === id) {
        return { ...d, status: !d.status };
      }
      return d;
    });

    setDevices(updated);

    const energy = updated
      .filter(d => d.status)
      .reduce((sum, d) => sum + d.power, 0);

    setEnergyHistory([...energyHistory.slice(1), energy]);
  };

  function logout() {
    localStorage.clear();
    navigate("/home");
  }

  const activeDevices = devices.filter(d => d.status).length;
  const totalEnergy = devices.filter(d => d.status).reduce((sum, d) => sum + d.power, 0);
  const bill = totalEnergy * 50;
  const savedEnergy = 100 - totalEnergy;

  const chartData = {
    labels: ["10AM", "11AM", "12PM", "1PM", "2PM", "3PM"],
    datasets: [
      {
        label: "Energy Usage (kWh)",
        data: energyHistory,
        borderColor: "#00f0ff",
        backgroundColor: "#00f0ff",
        tension: 0.3
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" }
    }
  };

  return (
    <div className="dashboard">

      {/* HEADER (UNCHANGED) */}
      <div className="header">
        <h2>Smart Energy Dashboard ⚡</h2>
        <h2>Welcome {username}</h2>

        <div className="profile-area">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            className="profile-pic"
            onClick={() => setOpen(!open)}
            alt="profile"
          />

          {open && (
            <div className="dropdown">
              <p onClick={() => navigate("/profile")}>Profile</p>
              <p onClick={() => navigate("/settings")}>Settings</p>
              <p onClick={logout}>Logout</p>
            </div>
          )}
        </div>
      </div>

      {/* 🔥 NEW TOP CARDS */}
      <div className="top-cards">
        <div className="card">
          <h4>Energy Efficiency</h4>
          <div className="circle">{savedEnergy}%</div>
          <p>Better than 80% homes</p>
        </div>

        <div className="card">
          <h4>Peak Usage</h4>
          <p>7PM - 10PM ⚠️</p>
          <span className="alert">Active</span>
        </div>

        <div className="card">
          <h4>Monthly Bill</h4>
          <p>₹{bill}</p>
        </div>

        <div className="card">
          <h4>Active Devices</h4>
          <p>{activeDevices}</p>
        </div>
      </div>

      {/* GRAPH */}
      <div className="graph-section">
        <h3>Energy Consumption</h3>
        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* 🤖 AI SECTION */}
      <h3>AI Energy Intelligence</h3>
      <div className="ai-grid">
        <div className="card">🔋 Battery Optimization</div>
        <div className="card">⚡ Smart Load Balancing</div>
        <div className="card">🌞 Solar Usage</div>
        <div className="card">💡 Lighting Optimization</div>
        <div className="card">📊 Behaviour Insight</div>
        <div className="card">🌍 Sustainability</div>
      </div>

      {/* DEVICES (UNCHANGED LOGIC) */}
      <h3>Quick Device Control</h3>
      <div className="device-grid">
        {devices.map((device) => (
          <div className="device-card" key={device.id}>
            <h4>{device.name}</h4>
            <p>{device.room}</p>
            <p className={device.status ? "on" : "off"}>
              {device.status ? "ON" : "OFF"}
            </p>
            <button onClick={() => toggleDevice(device.id)}>
              {device.status ? "Turn OFF" : "Turn ON"}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;
