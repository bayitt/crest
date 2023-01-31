import { getDatabasePool } from "../utilities";

export class Redirect {
  static async findByLink(link: string) {
    const pool = getDatabasePool();

    return pool.query(
      "SELECT * FROM redirects WHERE link = $1",
      [link],
      (error, results) => {
        if (error) throw error;
        console.log(results);
        return results.rows;
      }
    );
  }
}
