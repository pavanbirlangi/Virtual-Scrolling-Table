import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER || "root_psql",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "orders_db",
  password: process.env.DB_PASS || "psql@123",
  port: Number(process.env.DB_PORT) || 5432,
});

// Test database connection
(async () => {
  try {
    const client = await pool.connect();
    console.log("Database connection successful!");
    client.release(); // Release the connection back to the pool
  } catch (error) {
    if (error instanceof Error) {
      console.error("Database connection failed:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
  
})();

export default pool;
