import { Pool } from "pg";

let pool: Pool;

export const initDatabase = () => {
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT ?? 5432),
    ssl: process.env.APP_ENV === "production",
  });
};

export const getDatabasePool = () => pool;
