import { Router, Request, Response } from "express";
import {
  BalanceResponse,
  WithdrawalResponse,
  DepositResponse,
} from "@sweepstakes/shared";

const router = Router();

// Mock user balances
const userBalances: Record<string, number> = {
  "1": 1000,
};

/**
 * GET /api/user/balance
 * Get user balance
 */
router.get("/balance", (req: Request, res: Response) => {
  try {
    const balance = userBalances[req.userId!] || 0;

    const balanceResponse: BalanceResponse = {
      userId: req.userId!,
      balance,
      totalWagered: 0,
      totalWon: 0,
    };

    res.json({ success: true, data: balanceResponse });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch balance" });
  }
});

/**
 * POST /api/user/withdraw
 * Request withdrawal
 */
router.post("/withdraw", (req: Request, res: Response) => {
  try {
    const { amount, paymentMethod } = req.body;

    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid amount" });
    }

    const balance = userBalances[req.userId!] || 0;
    if (balance < amount) {
      return res
        .status(400)
        .json({ success: false, error: "Insufficient balance" });
    }

    const withdrawalId = Date.now().toString();
    userBalances[req.userId!] -= amount;

    const withdrawalResponse: WithdrawalResponse = {
      success: true,
      withdrawalId,
      status: "pending",
    };

    res.json(withdrawalResponse);
  } catch (error) {
    res.status(500).json({ success: false, error: "Withdrawal failed" });
  }
});

/**
 * POST /api/user/deposit
 * Process deposit
 */
router.post("/deposit", (req: Request, res: Response) => {
  try {
    const { amount, paymentMethod } = req.body;

    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid amount" });
    }

    const depositId = Date.now().toString();
    userBalances[req.userId!] = (userBalances[req.userId!] || 0) + amount;

    const depositResponse: DepositResponse = {
      success: true,
      depositId,
      status: "completed",
    };

    res.json(depositResponse);
  } catch (error) {
    res.status(500).json({ success: false, error: "Deposit failed" });
  }
});

/**
 * GET /api/user/profile
 * Get user profile
 */
router.get("/profile", (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.userId,
        username: "player",
        email: "player@example.com",
        balance: userBalances[req.userId!] || 0,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch profile" });
  }
});

export default router;
