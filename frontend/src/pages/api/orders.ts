import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cursor, limit = 50, sort = "created_at", sortDirection = "asc" } = req.query;

  try {
    const response = await axios.get("http://localhost:5001/api/orders", {
      params: { cursor, limit, sort, sortDirection },
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
}
