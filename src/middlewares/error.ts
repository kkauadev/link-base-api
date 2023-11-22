import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-errors";

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(error);
  }

  const status = error.statusCode ?? 500;

  const erroResponse = {
    code: status,
    message: error.message ?? "Internal server error",
    additionalDetails: {
      timestamp: new Date().toISOString(),
      endpoint: req.originalUrl,
      method: req.method,
    },
  };

  res.status(status).json(erroResponse);
};
