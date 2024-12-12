import { getDatabasePool } from "../utilities";

export type Article = {
  title: string;
  uuid: string;
  slug: string;
  status: boolean;
  created_at: string;
  updated_at: string;
};
export class ArticleModel {
  static async findByUuid(
    uuid: string,
    callback: (rows: Article[], error?: Error) => void
  ) {
    const pool = getDatabasePool();

    return await pool.query(
      `SELECT * FROM "Article" WHERE uuid = $1`,
      [uuid],
      (pgError, results) => {
        callback(results?.rows ?? [], pgError);
      }
    );
  }
}
