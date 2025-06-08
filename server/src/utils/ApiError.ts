import type { NextFunction, Request, Response } from "express";
import { ApiResponse } from "./ApiResponse";

class ApiError extends Error {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly stack: any = "";

  constructor(statusCode: number, message: string, stack = "") {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.name = "ApiError";

    if (stack) {
      this.stack = stack;
    }

    Error.captureStackTrace(this, this.constructor);
  }
}

const globalErrorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json(new ApiResponse(statusCode, message, {}));
};

const routeNotFound = (req: Request, res: Response) => {
  res.json(
    new ApiResponse(501, `Router[${req.url || req.path}] not Found`, {})
  );
};

export { ApiError, globalErrorHandler, routeNotFound };
