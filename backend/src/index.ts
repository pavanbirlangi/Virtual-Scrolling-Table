import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ordersRoutes } from "./routes/orders";

dotenv.config();

const app = express();

// Enable JSON parsing
app.use(express.json());

// Enable CORS
app.use(
    cors({
      origin: "http://localhost:3000", // Your frontend's origin
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
      credentials: true, // Allow cookies/auth headers
    })
  );

// Routes
app.use("/api/orders", ordersRoutes);

// Error Handling Middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack); // Log the error stack
  res.status(500).json({ error: "Internal Server Error" });
});

app.get("/",(req,res) => {
  res.send("Backend server successfully started!!!");
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
