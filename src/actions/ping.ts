import { Request, Response, NextFunction } from "express";
import { ArticleModel, Article } from "../models";

export const ping = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    ArticleModel.findByUuid(
      "some-random-uuid",
      (articles: Article[], error?: Error) => {
        if (error) {
          response.status(400).json({ database: "unhealthy" });
          return response.end();
        }
        response.status(200).json({ database: "healthy" });
      }
    );
  } catch (error) {
    response.status(400).json({ database: "unhealthy" });
  }
};
