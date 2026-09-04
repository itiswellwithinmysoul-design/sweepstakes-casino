/**
 * Admin configuration and management types
 */

import { GameConfig, PayoutTable } from ".";

export interface AdminUser extends Record<string, any> {
  id: string;
  username: string;
  email: string;
  role: "super_admin" | "admin" | "moderator";
  permissions: AdminPermission[];
  createdAt: Date;
  updatedAt: Date;
}

export type AdminPermission =
  | "manage_games"
  | "manage_users"
  | "manage_payouts"
  | "view_analytics"
  | "manage_admins"
  | "manage_transactions"
  | "view_logs";

export interface GameConfigUpdate {
  id: string;
  minBet?: number;
  maxBet?: number;
  rtp?: number;
  symbols?: any[];
  paylines?: any[];
  enabled?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminDashboardData {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  totalPayouts: number;
  currentRTP: number;
  topGames: GameConfig[];
  recentTransactions: Transaction[];
  systemHealth: SystemHealth;
}

export interface Transaction {
  id: string;
  userId: string;
  type: "bet" | "payout" | "deposit" | "withdrawal" | "bonus";
  amount: number;
  balance: number;
  sessionId?: string;
  status: "completed" | "pending" | "failed";
  createdAt: Date;
}

export interface SystemHealth {
  uptime: number; // Milliseconds
  apiLatency: number; // Milliseconds
  databaseConnected: boolean;
  cacheConnected: boolean;
  errors24h: number;
  warnings24h: number;
}

export interface UserManagement {
  userId: string;
  action: "ban" | "unban" | "suspend" | "verify" | "reset_balance";
  reason?: string;
  duration?: number; // Milliseconds for suspensions
  performedBy: string;
  performedAt: Date;
}

export interface PayoutAudit {
  id: string;
  gameSessionId: string;
  userId: string;
  payoutAmount: number;
  verified: boolean;
  verifiedBy?: string;
  verifiedAt?: Date;
  notes?: string;
  createdAt: Date;
}

export interface AdminAuditLog {
  id: string;
  adminId: string;
  action: string;
  resourceType: string; // e.g., "user", "game", "payout"
  resourceId: string;
  changes: Record<string, any>;
  createdAt: Date;
}

export interface AdminSettings {
  maintenanceMode: boolean;
  allowNewUsers: boolean;
  globalBetMultiplier: number;
  maxDailyWithdrawal: number;
  maxMonthlyWithdrawal: number;
  minDepositAmount: number;
  kycRequired: boolean;
  bonusEnabled: boolean;
  maxBonusAmount: number;
}
