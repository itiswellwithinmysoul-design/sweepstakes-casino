/**
 * Payout calculation and prize types
 */

export interface PayoutRule {
  id: string;
  symbolCombo: string; // e.g., "3-CHERRY", "2-BAR", "3-WILD"
  baseMultiplier: number; // Base payout multiplier (e.g., 10x bet)
  description: string;
}

export interface PayoutTable {
  id: string;
  name: string;
  gameConfigId: string;
  rules: PayoutRule[];
  jackpot: number; // Fixed jackpot amount
  progressiveJackpot?: number; // Optional progressive jackpot
  createdAt: Date;
  updatedAt: Date;
}

export interface PayoutCalculation {
  bet: number;
  multiplier: number;
  paylineMultiplier: number;
  baseWin: number;
  finalWin: number;
  bonus?: number;
  jackpot?: number;
}

export interface Prize {
  id: string;
  type: "cash" | "free_spin" | "multiplier" | "jackpot";
  amount: number;
  description: string;
  minBet?: number; // Minimum bet to qualify
  maxWin?: number; // Cap on winnings
}

export interface PrizeWon {
  prizeId: string;
  userId: string;
  sessionId: string;
  amount: number;
  type: "cash" | "free_spin" | "multiplier" | "jackpot";
  wonAt: Date;
  claimedAt?: Date;
}

export interface JackpotPrize {
  id: string;
  type: "fixed" | "progressive";
  amount: number;
  lastWonBy?: string;
  lastWonAt?: Date;
  resetAmount?: number; // Amount after payout
  contributionPercentage: number; // % of each bet contributed (0-100)
}

export interface PayoutStatistics {
  totalBets: number;
  totalPayouts: number;
  rtp: number; // Return to Player
  houseEdge: number; // 1 - RTP
  avgWin: number;
  avgLoss: number;
  biggestWin: number;
  biggestLoss: number;
}
