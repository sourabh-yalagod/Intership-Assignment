import { NextFunction, Request, Response } from "express";

const asyncHandler = (func: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.resolve(func(req, res, next)).catch((error: Error) =>
      next(error)
    );
  };
};
export default asyncHandler;
