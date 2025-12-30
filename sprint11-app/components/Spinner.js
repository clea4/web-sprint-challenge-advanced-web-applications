import React from "react";

export default function Spinner({ children }) {
  return (
    <div data-testid="spinner" className="spinner">
      {children || "Loading..."}
    </div>
  );
}
