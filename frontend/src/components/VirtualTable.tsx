import React from "react";
import { FixedSizeList as List } from "react-window";
import useOrdersQuery from "../hooks/useOrdersQuery";

const VirtualTable: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useOrdersQuery();

  // Flatten all pages of data into a single array
  const orders = data?.pages.flatMap((page) => page.data) || [];

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const order = orders[index];

    if (!order) {
      return (
        <div style={style} className="loading">
          Loading...
        </div>
      );
    }

    return (
      <div style={style} className="row">
        <div className="cell">{order.id || "N/A"}</div>
        <div className="cell">{order.customer_name || "N/A"}</div>
        <div className="cell">
  {order.order_amount !== undefined && order.order_amount !== null
    ? `₹${Number(order.order_amount).toFixed(2)}`
    : "N/A"}
</div>
        <div className="cell">{order.status || "N/A"}</div>
        <div className="cell">
          {order.created_at
            ? new Date(order.created_at).toLocaleString()
            : "Invalid Date"}
        </div>
      </div>
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError && error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <div className="table-container">
        <div className="header">
          <div className="cell">Order ID</div>
          <div className="cell">Customer Name</div>
          <div className="cell">Amount</div>
          <div className="cell">Status</div>
          <div className="cell">Created At</div>
        </div>
        <List
          height={600} // Height of the scrollable area
          itemCount={orders.length} // Total number of loaded rows
          itemSize={50} // Height of each row
          width="100%"
        >
          {Row}
        </List>
      </div>
      {hasNextPage && !isFetchingNextPage && (
        <button onClick={() => fetchNextPage()} className="load-more-button">
          Load More
        </button>
      )}
      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  );
};

export default VirtualTable;
