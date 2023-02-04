import { Request, Response, NextFunction } from "express";
import { Redirect, RedirectModel } from "../models";

export const redirect = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { params } = request;

  const handleRedirect = (redirects: Redirect[]) => {
    if (redirects.length === 0)
      return response
        .status(404)
        .json({ message: "the link you requested for does not exist" });
  };

  const rows = await RedirectModel.findByLink(
    params?.link ?? "",
    handleRedirect
  );
  console.log(rows);
  response.json({ eme: "" });
};
