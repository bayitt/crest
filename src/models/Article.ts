import { getDatabasePool, CustomError } from "../utilities";

export type Article = {
  title: string;
  uuid: string;
  slug: string;
  status: boolean;
  created_at: string;
  updated_at: string;
};
export class ArticleModel {
  static async findByUuid(uuid: string, callback: (rows: Article[]) => void) {
    const pool = getDatabasePool();

    return await pool.query(
      `SELECT * FROM "Article" WHERE uuid = $1`,
      [uuid],
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
