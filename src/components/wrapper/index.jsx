import React from "react";
import backgroundImage from "../../assets/bg1.jpg";

export const Wrapper = ({ children, className = "" }) => {
  return (
    <div
      className={`min-h-screen bg-cover bg-center bg-no-repeat ${className}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {children}
    </div>
  );
};
