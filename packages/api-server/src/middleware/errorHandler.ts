import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "@sweepstakes/shared";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  const errorResponse: ErrorResponse = {
    success: false,
    error: err.message || "Internal server error",
    code: err.code || "SERVER_ERROR",
    details: process.env.NODE_ENV === "development" ? err.stack : undefined,
  };

  res
    .status(err.statusCode || 500)
    .json(errorResponse);
};
