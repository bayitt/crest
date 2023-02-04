import { Express, Request, Response, NextFunction } from "express";

export class CustomError extends Error {
  message: string;
  statusCode?: number;
}

export const initErrorHandler = (app: Express) => {
  app.use(
    (
      error: CustomError,
      request: Request,
      response: Response,
      next: NextFunction
    ) => {
      console.log(error);
      const statusCode = error?.statusCode ?? 500;
      const message = error.message;

      return response.status(statusCode).json({ message });
    }
  );
};
