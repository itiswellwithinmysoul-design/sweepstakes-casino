/**
 * Core game mechanics types
 */

export enum SymbolType {
  CHERRY = "cherry",
  LEMON = "lemon",
  ORANGE = "orange",
  PLUM = "plum",
  BELL = "bell",
  BAR = "bar",
  WILD = "wild",
  SCATTER = "scatter",
}

export interface Symbol {
  id: SymbolType;
  name: string;
  weight: number; // Relative frequency on reels (0-100)
  multiplier: number; // Payout multiplier
}

export interface Reel {
  id: number;
  symbols: SymbolType[];
  position: number; // Current position (0-based)
}

export interface Payline {
  id: number;
  positions: [number, number, number]; // Reel indices (0-2)
  multiplier: number; // Payline-specific multiplier
}

export interface GameState {
  reels: Reel[];
  paylines: Payline[];
  selectedPaylines: number[]; // Active payline IDs
  bet: number; // Bet amount per payline
  totalBet: number; // Selected paylines * bet
  winAmount: number;
  winningLines: number[]; // IDs of winning paylines
  isSpinning: boolean;
  resultSymbols?: SymbolType[][]; // Final reel positions
}

export interface SpinResult {
  gameState: GameState;
  winAmount: number;
  winningLines: Payline[];
  matchedSymbols: SymbolType[];
  isWin: boolean;
  multiplier: number;
}

export interface GameConfig {
  totalReels: number;
  totalPaylines: number;
  symbolsPerReel: number;
  minBet: number;
  maxBet: number;
  symbols: Symbol[];
  paylines: Payline[];
  rtp: number; // Return to Player percentage (e.g., 0.96 = 96%)
}
