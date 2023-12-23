import express from "express";
import {
  bootstrap,
  initDatabase,
  initErrorHandler,
  loadEnv,
} from "./utilities";
import { Request, Response, NextFunction } from "express";
import { redirectRouter } from "./routes";

loadEnv();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post(
  "/ping",
  (request: Request, response: Response, next: NextFunction) => {
    return response.status(200).json({ status: "ok" });
  }
);
app.use("/", redirectRouter);

initDatabase();

initErrorHandler(app);

bootstrap(app);
