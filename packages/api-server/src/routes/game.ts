import { Router, Request, Response } from "express";
import { SpinRequest, SpinResponse } from "@sweepstakes/shared";
import { spinGame } from "../services/gameEngine";

const router = Router();

/**
 * POST /api/game/session
 * Create a new game session
 */
router.post("/session", (req: Request, res: Response) => {
  try {
    const sessionId = Date.now().toString();
    const gameSession = {
      id: sessionId,
      userId: req.userId,
      currentGameState: {
        reels: [],
        paylines: [],
        selectedPaylines: [],
        bet: 0,
        totalBet: 0,
        winAmount: 0,
        winningLines: [],
        isSpinning: false,
      },
      totalWinnings: 0,
      startedAt: new Date(),
    };

    res.json({ success: true, session: gameSession });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create session" });
  }
});

/**
 * POST /api/game/spin
 * Execute a spin
 */
router.post("/spin", (req: Request, res: Response) => {
  try {
    const { sessionId, selectedPaylines, bet }: SpinRequest = req.body;

    if (!sessionId || !selectedPaylines || !bet) {
      return res
        .status(400)
        .json({ success: false, error: "Missing spin parameters" });
    }

    if (bet < 0.1 || bet > 100) {
      return res.status(400).json({ success: false, error: "Invalid bet amount" });
    }

    const result = spinGame(selectedPaylines, bet);

    const spinResponse: SpinResponse = {
      success: true,
      result,
      session: {
        id: sessionId,
        userId: req.userId!,
        gameConfig: {
          totalReels: 3,
          totalPaylines: 5,
          symbolsPerReel: 22,
          minBet: 0.1,
          maxBet: 100,
          symbols: [],
          paylines: [],
          rtp: 0.96,
        },
        currentGameState: result.gameState,
        totalWinnings: result.winAmount,
        startedAt: new Date(),
      },
    };

    res.json(spinResponse);
  } catch (error) {
    res.status(500).json({ success: false, error: "Spin failed" });
  }
});

/**
 * GET /api/game/session/:sessionId
 * Get game session details
 */
router.get("/session/:sessionId", (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    res.json({
      success: true,
      session: {
        id: sessionId,
        userId: req.userId,
        totalWinnings: 0,
        startedAt: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch session" });
  }
});

export default router;
