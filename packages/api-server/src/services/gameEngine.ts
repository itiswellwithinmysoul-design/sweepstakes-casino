import { SymbolType, SpinResult, GameState } from "@sweepstakes/shared";
import { DEFAULT_SYMBOLS, DEFAULT_PAYLINES } from "@sweepstakes/shared";

/**
 * Generate a random symbol based on weights
 */
function getRandomSymbol(): SymbolType {
  const symbols = DEFAULT_SYMBOLS;
  const totalWeight = symbols.reduce((sum, s) => sum + s.weight, 0);
  let random = Math.random() * totalWeight;

  for (const symbol of symbols) {
    random -= symbol.weight;
    if (random <= 0) {
      return symbol.id;
    }
  }

  return SymbolType.CHERRY;
}

/**
 * Generate 3 reels with random symbols
 */
function generateReels(): SymbolType[][] {
  return [
    [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
    [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
    [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
  ];
}

/**
 * Check if a payline is a winner
 */
function checkPaylineWin(
  reels: SymbolType[][],
  payline: (typeof DEFAULT_PAYLINES)[0]
): boolean {
  const symbols = payline.positions.map((pos, reel) => reels[reel][pos]);
  return symbols[0] === symbols[1] && symbols[1] === symbols[2];
}

/**
 * Calculate payout for a winning payline
 */
function calculatePayout(
  symbols: SymbolType[],
  bet: number,
  paylineMultiplier: number
): number {
  const symbolMultiplier = DEFAULT_SYMBOLS.find(
    (s) => s.id === symbols[0]
  )?.multiplier || 1;

  return bet * symbolMultiplier * paylineMultiplier;
}

/**
 * Main spin game logic
 */
export function spinGame(selectedPaylines: number[], bet: number): SpinResult {
  const reels = generateReels();
  let totalWin = 0;
  const winningLines: typeof DEFAULT_PAYLINES = [];

  for (const paylineId of selectedPaylines) {
    const payline = DEFAULT_PAYLINES.find((p) => p.id === paylineId);
    if (!payline) continue;

    if (checkPaylineWin(reels, payline)) {
      const symbols = payline.positions.map((pos, reel) => reels[reel][pos]);
      const payout = calculatePayout(symbols, bet, payline.multiplier);
      totalWin += payout;
      winningLines.push(payline);
    }
  }

  const gameState: GameState = {
    reels: [
      { id: 0, symbols: reels[0], position: 0 },
      { id: 1, symbols: reels[1], position: 0 },
      { id: 2, symbols: reels[2], position: 0 },
    ],
    paylines: DEFAULT_PAYLINES,
    selectedPaylines,
    bet,
    totalBet: bet * selectedPaylines.length,
    winAmount: totalWin,
    winningLines: winningLines.map((w) => w.id),
    isSpinning: false,
    resultSymbols: reels,
  };

  return {
    gameState,
    winAmount: totalWin,
    winningLines,
    matchedSymbols: winningLines.length > 0 ? [reels[0][0]] : [],
    isWin: totalWin > 0,
    multiplier: winningLines.length > 0 ? totalWin / (bet * selectedPaylines.length) : 0,
  };
}
