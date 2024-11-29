import React from "react";

interface HeaderProps {
  onSort: (field: string) => void;
  sortField: string;
  sortDirection: "asc" | "desc";
}

const Header: React.FC<HeaderProps> = ({ onSort, sortField, sortDirection }) => {
  const handleSort = (field: string) => {
    onSort(field);
  };

  return (
    <div className="header">
      <div className="cell" onClick={() => handleSort("id")}>
        Order ID {sortField === "id" && (sortDirection === "asc" ? "↑" : "↓")}
      </div>
      <div className="cell" onClick={() => handleSort("customerName")}>
        Customer Name {sortField === "customerName" && (sortDirection === "asc" ? "↑" : "↓")}
      </div>
      <div className="cell" onClick={() => handleSort("orderAmount")}>
        Amount {sortField === "orderAmount" && (sortDirection === "asc" ? "↑" : "↓")}
      </div>
      <div className="cell" onClick={() => handleSort("status")}>
        Status {sortField === "status" && (sortDirection === "asc" ? "↑" : "↓")}
      </div>
      <div className="cell" onClick={() => handleSort("createdAt")}>
        Created At {sortField === "createdAt" && (sortDirection === "asc" ? "↑" : "↓")}
      </div>
    </div>
  );
};

export default Header;
