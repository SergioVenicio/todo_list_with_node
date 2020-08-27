import { Request, Response, NextFunction } from "express";

import AppError from "../errors/AppError";

const errorHandling = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      error: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

export default errorHandling;
