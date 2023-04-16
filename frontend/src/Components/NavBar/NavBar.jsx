import React, { useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Utils/useAuth";

export default function NavBar() {
  const navigate = useNavigate();
  const { updateAuth } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    updateAuth(null, null);
    navigate("/login");
  };

  return (
    <div className="navbar justify-between">
      <Link to={"/"} className="nav-title">
        LOGO
      </Link>
      <div className="navbar-links">
        <Link to={"/"}>Accueil</Link>
        <Link to={"/historique-calcul"}>Historique de calcul</Link>
        <div style={{ width: "fit-content" }}>
          <button
            style={{ backgroundColor: "#666666" }}
            onClick={handleLogout}
            className="button"
            role="button"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
