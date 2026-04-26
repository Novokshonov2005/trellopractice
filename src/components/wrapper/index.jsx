import React from "react";
import backgroundImage from "../../assets/bg1.jpg";
import { useAuth } from "../AuthContext";

export const Wrapper = ({ children, className = "" }) => {
  const { appBackground } = useAuth();
  const bg = appBackground || backgroundImage;

  return (
    <div
      className={`min-h-screen bg-cover bg-center bg-no-repeat ${className}`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      {children}
    </div>
  );
};
