import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AuthRequest, AuthResponse, User } from "@sweepstakes/shared";

const router = Router();

// Mock user database (replace with real DB)
const mockUsers: Record<string, any> = {
  testuser: {
    id: "1",
    username: "testuser",
    email: "test@example.com",
    passwordHash: bcrypt.hashSync("password123", 10),
    balance: 1000,
    isAdmin: false,
  },
};

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password }: AuthRequest & { email: string } =
      req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    if (mockUsers[username]) {
      return res
        .status(400)
        .json({ success: false, error: "Username already exists" });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const userId = Date.now().toString();

    mockUsers[username] = {
      id: userId,
      username,
      email,
      passwordHash,
      balance: 0,
      isAdmin: false,
    };

    const user: User = {
      id: userId,
      username,
      email,
      balance: 0,
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: "Registration failed" });
  }
});

/**
 * POST /api/auth/login
 * Login user and return JWT token
 */
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password }: AuthRequest = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Missing credentials" });
    }

    const user = mockUsers[username];
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "24h" }
    );

    const userResponse: User = {
      id: user.id,
      username: user.username,
      email: user.email,
      balance: user.balance,
      isAdmin: user.isAdmin,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    res.json({ success: true, user: userResponse, token });
  } catch (error) {
    res.status(500).json({ success: false, error: "Login failed" });
  }
});

export default router;
