import axios from "axios";

const fetchOrders = async ({ pageParam }: { pageParam?: string }) => {
  const response = await axios.get("/api/orders", {
    params: {
      cursor: pageParam, // Cursor for pagination
      limit: 50, // Number of rows per page
    },
  });

  return response.data;
};

export default fetchOrders;
