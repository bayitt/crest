import express from "express";
import {
  bootstrap,
  initDatabase,
  initErrorHandler,
  loadEnv,
} from "./utilities";
import { redirectRouter } from "./routes";

loadEnv();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", redirectRouter);

initDatabase();

initErrorHandler(app);

bootstrap(app);
