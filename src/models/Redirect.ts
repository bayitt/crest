import { getDatabasePool } from "../utilities";

export type Redirect = {
  uuid: string;
  link: string;
  article_uuid: string;
  created_at: string;
  updated_at: string;
};

export class RedirectModel {
  static async findByLink(
    link: string,
    callback: (rows: Redirect[], error?: Error) => void
  ) {
    const pool = getDatabasePool();

    return await pool.query(
      `SELECT * FROM "Redirect" WHERE link = $1 LIMIT 1`,
      [link],
      (pgError, results) => {
        callback(results?.rows ?? [], pgError);
      }
    );
  }
}
