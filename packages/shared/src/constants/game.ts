/**
 * Game constants
 */

import { Symbol, Payline, SymbolType } from "../types/game";

// Default symbol configuration
export const DEFAULT_SYMBOLS: Symbol[] = [
  {
    id: SymbolType.CHERRY,
    name: "Cherry",
    weight: 15,
    multiplier: 2,
  },
  {
    id: SymbolType.LEMON,
    name: "Lemon",
    weight: 15,
    multiplier: 3,
  },
  {
    id: SymbolType.ORANGE,
    name: "Orange",
    weight: 15,
    multiplier: 3,
  },
  {
    id: SymbolType.PLUM,
    name: "Plum",
    weight: 12,
    multiplier: 5,
  },
  {
    id: SymbolType.BELL,
    name: "Bell",
    weight: 12,
    multiplier: 10,
  },
  {
    id: SymbolType.BAR,
    name: "Bar",
    weight: 16,
    multiplier: 15,
  },
  {
    id: SymbolType.WILD,
    name: "Wild",
    weight: 5,
    multiplier: 50,
  },
  {
    id: SymbolType.SCATTER,
    name: "Scatter",
    weight: 5,
    multiplier: 100,
  },
];

// Default paylines (3-reel machine)
export const DEFAULT_PAYLINES: Payline[] = [
  { id: 1, positions: [0, 0, 0], multiplier: 1 },
  { id: 2, positions: [1, 1, 1], multiplier: 1 },
  { id: 3, positions: [2, 2, 2], multiplier: 1 },
  { id: 4, positions: [0, 1, 2], multiplier: 1.2 },
  { id: 5, positions: [2, 1, 0], multiplier: 1.2 },
];

// Game configuration limits
export const GAME_LIMITS = {
  MIN_BET: 0.1,
  MAX_BET: 100,
  MIN_PAYLINES: 1,
  MAX_PAYLINES: 5,
  MIN_REELS: 3,
  MAX_REELS: 5,
  SYMBOLS_PER_REEL: 22, // Standard reel strip size
  DEFAULT_RTP: 0.96, // 96% return to player
};

// Spin animation timing (milliseconds)
export const SPIN_TIMING = {
  REEL_SPIN_DURATION: 500,
  REEL_STOP_STAGGER: 150,
  TOTAL_SPIN_TIME: 2000,
  RESULT_DELAY: 500,
};

// Common error codes
export const ERROR_CODES = {
  INSUFFICIENT_BALANCE: "INSUFFICIENT_BALANCE",
  INVALID_BET: "INVALID_BET",
  SESSION_NOT_FOUND: "SESSION_NOT_FOUND",
  GAME_ALREADY_SPINNING: "GAME_ALREADY_SPINNING",
  INVALID_PAYLINES: "INVALID_PAYLINES",
  UNAUTHORIZED: "UNAUTHORIZED",
  SERVER_ERROR: "SERVER_ERROR",
};
