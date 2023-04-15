import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Utils/useAuth";

export default function ListSociete() {
  const navigate = useNavigate();
  const { updateAuth } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    updateAuth(null, null);
    navigate("/login");
  };
  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
