import { Request, Response, NextFunction } from "express";
import { Redirect } from "../models";

export const redirect = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { params } = request;
  await Redirect.findByLink(params?.link ?? "");
  response.json({ eme: "" });
};
