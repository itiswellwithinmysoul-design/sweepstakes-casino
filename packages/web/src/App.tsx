import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { LoginForm } from "./LoginForm";
import { PlayerDashboard } from "./PlayerDashboard";
import { GameBoard } from "./GameBoard";
import { AdminPanel } from "./AdminPanel";

export const App: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [currentView, setCurrentView] = useState("dashboard");

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const isAdmin = user?.isAdmin || false;

  return (
    <div className="app">
      {isAdmin ? (
        <AdminPanel />
      ) : (
        <div className="player-app">
          <nav className="player-nav">
            <button
              onClick={() => setCurrentView("dashboard")}
              className={currentView === "dashboard" ? "active" : ""}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView("game")}
              className={currentView === "game" ? "active" : ""}
            >
              Game
            </button>
          </nav>

          {currentView === "dashboard" && <PlayerDashboard />}
          {currentView === "game" && <GameBoard />}
        </div>
      )}
    </div>
  );
};

export default App;
