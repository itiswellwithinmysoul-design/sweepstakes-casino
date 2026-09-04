import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/AdminPanel.css";

export const AdminPanel: React.FC = () => {
  const { token, logout } = useAuth();
  const [dashboard, setDashboard] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (activeTab === "dashboard") fetchDashboard();
    if (activeTab === "users") fetchUsers();
    if (activeTab === "transactions") fetchTransactions();
  }, [activeTab, token]);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/dashboard`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setDashboard(response.data.dashboard);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/users`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/transactions`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setTransactions(response.data.transactions);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const handleBanUser = async (userId: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/user/${userId}/ban`,
        { reason: "Admin action" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("User banned successfully");
      fetchUsers();
    } catch (error) {
      console.error("Failed to ban user:", error);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>🔐 Admin Dashboard</h1>
        <button onClick={logout} className="btn btn-logout">
          Logout
        </button>
      </div>

      <div className="admin-tabs">
        {["dashboard", "users", "transactions"].map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "dashboard" && dashboard && (
        <div className="admin-content">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Users</h3>
              <p className="amount">{dashboard.totalUsers}</p>
            </div>
            <div className="stat-card">
              <h3>Active Users</h3>
              <p>{dashboard.activeUsers}</p>
            </div>
            <div className="stat-card">
              <h3>Total Revenue</h3>
              <p>${dashboard.totalRevenue?.toFixed(2)}</p>
            </div>
            <div className="stat-card">
              <h3>Total Payouts</h3>
              <p>${dashboard.totalPayouts?.toFixed(2)}</p>
            </div>
            <div className="stat-card">
              <h3>Current RTP</h3>
              <p>{(dashboard.currentRTP * 100).toFixed(2)}%</p>
            </div>
          </div>

          {dashboard.systemHealth && (
            <div className="system-health">
              <h3>System Health</h3>
              <ul>
                <li>Uptime: {dashboard.systemHealth.uptime}ms</li>
                <li>API Latency: {dashboard.systemHealth.apiLatency}ms</li>
                <li>
                  Database:{" "}
                  {dashboard.systemHealth.databaseConnected ? "✅" : "❌"}
                </li>
                <li>
                  Cache: {dashboard.systemHealth.cacheConnected ? "✅" : "❌"}
                </li>
                <li>Errors (24h): {dashboard.systemHealth.errors24h}</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {activeTab === "users" && (
        <div className="admin-content">
          <h3>User Management</h3>
          <table className="users-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>${user.balance?.toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleBanUser(user.id)}
                      className="btn btn-danger"
                    >
                      Ban
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "transactions" && (
        <div className="admin-content">
          <h3>Recent Transactions</h3>
          <table className="transactions-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.id}</td>
                  <td>{tx.userId}</td>
                  <td>{tx.type}</td>
                  <td>${tx.amount?.toFixed(2)}</td>
                  <td>{tx.status}</td>
                  <td>{new Date(tx.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
