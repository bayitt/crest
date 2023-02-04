import { Router } from "express";
import { redirect } from "../actions";

export const redirectRouter = Router();

redirectRouter.get("/:link", redirect);
