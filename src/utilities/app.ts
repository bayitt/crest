import { Express } from "express";
import http from "http";

export const bootstrap = (app: Express) => {
  const port = Number(process.env.APP_PORT ?? "3000");
  app.set("port", port);

  const server = http.createServer(app);
  server.listen(port);

  server.on("error", () => {
    console.log("error");
  });

  server.on("listening", () => {
    const addr = server.address();
    const bind =
      typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
  });
};
