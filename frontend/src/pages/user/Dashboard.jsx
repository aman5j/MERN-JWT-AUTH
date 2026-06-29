import React from 'react';
import './Dashboard.css'; // Import your new normal CSS file here

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">
        Dashboard
      </h1>

      <div className="dashboard-grid">
        <div className="stat-card">
          <h2 className="stat-label">Orders</h2>
          <p className="stat-value">0</p>
        </div>

        <div className="stat-card">
          <h2 className="stat-label">Cart Items</h2>
          <p className="stat-value">0</p>
        </div>

        <div className="stat-card">
          <h2 className="stat-label">Account</h2>
          <p className="stat-value status-active">Active</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;