import { getDatabasePool, CustomError } from "../utilities";

export type Redirect = {
  uuid: string;
  link: string;
  article_uuid: string;
  created_at: string;
  updated_at: string;
};

export class RedirectModel {
  static async findByLink(link: string, callback: (rows: Redirect[]) => void) {
    const pool = getDatabasePool();

    return await pool.query(
      `SELECT * FROM "Redirect" WHERE link = $1 LIMIT 1`,
      [link],
      (pgError, results) => {
        if (pgError) {
          const error = new CustomError(
            "There was a problem completing the request"
          );
          error.statusCode = 500;
          throw error;
        }

        callback(results.rows);
      }
    );
  }
}
