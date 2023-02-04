import { Router } from "express";
import { redirect } from "../actions";

export const redirectRouter = Router();

redirectRouter.get("/", redirect);

redirectRouter.get("/:link", redirect);
