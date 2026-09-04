/**
 * API request/response types
 */

import { GameState, SpinResult, GameConfig } from "./game";

// Authentication & User
export interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

// Game Session
export interface GameSession {
  id: string;
  userId: string;
  gameConfig: GameConfig;
  currentGameState: GameState;
  totalWinnings: number;
  startedAt: Date;
  endedAt?: Date;
}

// Spin Request/Response
export interface SpinRequest {
  sessionId: string;
  selectedPaylines: number[];
  bet: number;
}

export interface SpinResponse {
  success: boolean;
  result?: SpinResult;
  error?: string;
  session?: GameSession;
}

// User Balance
export interface BalanceRequest {
  userId: string;
}

export interface BalanceResponse {
  userId: string;
  balance: number;
  totalWagered: number;
  totalWon: number;
}

// Withdrawal/Deposit
export interface WithdrawalRequest {
  userId: string;
  amount: number;
  paymentMethod: "bank_transfer" | "credit_card" | "check";
}

export interface WithdrawalResponse {
  success: boolean;
  withdrawalId?: string;
  status?: "pending" | "processing" | "completed" | "failed";
  error?: string;
}

export interface DepositRequest {
  userId: string;
  amount: number;
  paymentMethod: "credit_card" | "debit_card" | "bank_transfer";
}

export interface DepositResponse {
  success: boolean;
  depositId?: string;
  status?: "pending" | "completed" | "failed";
  error?: string;
}

// Generic API Response
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

// Error Response
export interface ErrorResponse {
  success: false;
  error: string;
  code: string;
  details?: Record<string, any>;
}
