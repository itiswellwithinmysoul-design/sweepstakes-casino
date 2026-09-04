import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import gameRoutes from "./routes/game";
import userRoutes from "./routes/user";
import adminRoutes from "./routes/admin";
import { errorHandler } from "./middleware/errorHandler";
import { authenticateToken } from "./middleware/auth";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/game", authenticateToken, gameRoutes);
app.use("/api/user", authenticateToken, userRoutes);
app.use("/api/admin", authenticateToken, adminRoutes);

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🎰 Sweepstakes Casino API running on port ${PORT}`);
});

export default app;
