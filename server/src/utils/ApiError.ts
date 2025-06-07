import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "./ApiResponse";
class ApiError extends Error {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly stack: any = "";
  constructor(statusCode: number, message: string, stack = "") {
    super(message);
    //   initialize
    this.message = message;
    this.statusCode = statusCode;
    this.name = "ApiError";
    //   stack
    if (stack) {
      this.stack = stack;
    }
    Error.captureStackTrace(this, this.constructor);
  }
}
const globalErrorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error("Error:", message);

  res.status(statusCode).json(new ApiResponse(statusCode, message, {}));
  return;
};

const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
  res.json(
    new ApiResponse(501, `Router[${req.url || req.path}] not Found`, {})
  );
};
export { ApiError, globalErrorHandler, routeNotFound };
