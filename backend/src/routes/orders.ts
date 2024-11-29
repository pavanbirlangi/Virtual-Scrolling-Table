import { Router, Request, Response } from "express";
import pool from "../db/pool";

const router = Router();

interface OrdersQuery {
  cursor?: string; // Cursor to determine where to start the next page
  limit?: string;  // Limit on the number of rows to fetch
  sort?: string;   // Column to sort by
  sortDirection?: "asc" | "desc"; // Sort direction
}

router.get(
  "/",
  (async (req: Request<{}, {}, {}, OrdersQuery>, res: Response) => {
    const {
      cursor, 
      limit: limitRaw = "50", // Default to 50 rows per page
      sort: sortParam = "created_at", // Default sort column
      sortDirection = "asc", // Default sort direction
    } = req.query;

    const limit = parseInt(limitRaw, 10);
    if (isNaN(limit) || limit <= 0) {
      return res.status(400).json({ error: "Invalid 'limit' parameter" });
    }

    try {
      const cursorCondition = cursor
        ? `AND ${sortParam} ${sortDirection === "asc" ? ">" : "<"} $2`
        : "";
      const values = cursor ? [limit, cursor] : [limit];

      const query = `
        SELECT * FROM orders
        WHERE TRUE ${cursorCondition}
        ORDER BY ${sortParam} ${sortDirection}
        LIMIT $1;
      `;

      const result = await pool.query(query, values);

      // If rows are fetched, determine the next cursor
      const nextCursor = result.rows.length
        ? result.rows[result.rows.length - 1][sortParam as keyof typeof result.rows[0]]
        : null;

      return res.json({
        data: result.rows,
        nextCursor, // Cursor for fetching the next page
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }) as unknown as any // TypeScript workaround for Express
);

export { router as ordersRoutes };
