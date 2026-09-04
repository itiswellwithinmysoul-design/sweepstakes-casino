import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/GameBoard.css";

export const GameBoard: React.FC = () => {
  const { token } = useAuth();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [selectedPaylines, setSelectedPaylines] = useState<number[]>([1]);
  const [bet, setBet] = useState<number>(1);
  const [result, setResult] = useState<any>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winAmount, setWinAmount] = useState(0);

  const createSession = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/game/session`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSessionId(response.data.session.id);
      }
    } catch (error) {
      console.error("Failed to create session:", error);
    }
  };

  const handleSpin = async () => {
    if (!sessionId) {
      alert("Please create a game session first");
      return;
    }

    setIsSpinning(true);
    setWinAmount(0);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/game/spin`,
        {
          sessionId,
          selectedPaylines,
          bet,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setResult(response.data.result);
        setWinAmount(response.data.result.winAmount);
      }
    } catch (error) {
      console.error("Spin failed:", error);
      alert("Spin failed. Please try again.");
    } finally {
      setIsSpinning(false);
    }
  };

  return (
    <div className="game-board">
      <div className="game-container">
        <h1>🎰 Sweepstakes Casino</h1>

        {!sessionId ? (
          <button onClick={createSession} className="btn btn-primary">
            Start Game
          </button>
        ) : (
          <>
            {/* Reels Display */}
            <div className="reels">
              {result?.gameState?.resultSymbols ? (
                result.gameState.resultSymbols.map((reel: any[], idx: number) => (
                  <div key={idx} className="reel">
                    <div className="symbols">
                      {reel.map((symbol, pos) => (
                        <div
                          key={pos}
                          className={`symbol ${
                            pos === 1 ? "active" : ""
                          }`}
                        >
                          {symbol}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>No spin yet</p>
              )}
            </div>

            {/* Controls */}
            <div className="controls">
              <div className="control-group">
                <label>Bet Amount: ${bet}</label>
                <input
                  type="range"
                  min="0.1"
                  max="100"
                  step="0.1"
                  value={bet}
                  onChange={(e) => setBet(parseFloat(e.target.value))}
                  disabled={isSpinning}
                />
              </div>

              <div className="control-group">
                <label>Paylines (1-5):</label>
                <div className="paylines-selector">
                  {[1, 2, 3, 4, 5].map((line) => (
                    <label key={line}>
                      <input
                        type="checkbox"
                        checked={selectedPaylines.includes(line)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPaylines([...selectedPaylines, line]);
                          } else {
                            setSelectedPaylines(
                              selectedPaylines.filter((l) => l !== line)
                            );
                          }
                        }}
                        disabled={isSpinning}
                      />
                      Line {line}
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSpin}
                disabled={isSpinning || selectedPaylines.length === 0}
                className="btn btn-spin"
              >
                {isSpinning ? "SPINNING..." : "SPIN"}
              </button>
            </div>

            {/* Results */}
            {winAmount > 0 && (
              <div className="result win">
                <h2>🎉 You Won! ${winAmount.toFixed(2)}</h2>
              </div>
            )}

            {result && winAmount === 0 && (
              <div className="result lose">
                <p>No match. Try again!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
