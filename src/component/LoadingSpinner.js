import React from "react";
import "./LoadingSpinner.css"; // Ensure you have styles for centering

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
