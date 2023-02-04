import express from "express";
import {
  bootstrap,
  initDatabase,
  initErrorHandler,
  loadEnv,
} from "./utilities";
import { redirectRouter } from "./routes";

// Loading up relevant environment variables
loadEnv();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", redirectRouter);

// Initializing connection to the database
initDatabase();

initErrorHandler(app);

bootstrap(app);
