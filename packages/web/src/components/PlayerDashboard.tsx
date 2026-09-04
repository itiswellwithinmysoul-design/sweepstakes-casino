import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css";

export const PlayerDashboard: React.FC = () => {
  const { user, token, logout } = useAuth();
  const [balance, setBalance] = useState(0);
  const [totalWagered, setTotalWagered] = useState(0);
  const [totalWon, setTotalWon] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");

  useEffect(() => {
    fetchBalance();
  }, [token]);

  const fetchBalance = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/balance`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setBalance(response.data.data.balance);
        setTotalWagered(response.data.data.totalWagered);
        setTotalWon(response.data.data.totalWon);
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/withdraw`,
        {
          amount: parseFloat(withdrawAmount),
          paymentMethod: "bank_transfer",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert("Withdrawal request submitted");
        setWithdrawAmount("");
        fetchBalance();
      }
    } catch (error) {
      console.error("Withdrawal failed:", error);
      alert("Withdrawal failed");
    }
  };

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/deposit`,
        {
          amount: parseFloat(depositAmount),
          paymentMethod: "credit_card",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert("Deposit successful");
        setDepositAmount("");
        fetchBalance();
      }
    } catch (error) {
      console.error("Deposit failed:", error);
      alert("Deposit failed");
    }
  };

  return (
    <div className="player-dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.username}!</h1>
        <button onClick={logout} className="btn btn-logout">
          Logout
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Balance</h3>
          <p className="amount">${balance.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Total Wagered</h3>
          <p>${totalWagered.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Total Won</h3>
          <p>${totalWon.toFixed(2)}</p>
        </div>
      </div>

      <div className="transactions-section">
        <div className="transaction-form">
          <h3>Deposit Funds</h3>
          <form onSubmit={handleDeposit}>
            <input
              type="number"
              step="0.01"
              min="1"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Amount to deposit"
              required
            />
            <button type="submit" className="btn btn-primary">
              Deposit
            </button>
          </form>
        </div>

        <div className="transaction-form">
          <h3>Request Withdrawal</h3>
          <form onSubmit={handleWithdraw}>
            <input
              type="number"
              step="0.01"
              min="1"
              max={balance}
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Amount to withdraw"
              required
            />
            <button type="submit" className="btn btn-secondary">
              Withdraw
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
