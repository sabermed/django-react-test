import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Utils/useAuth";
import NavBar from "../Components/NavBar/NavBar";

export default function RequireAuth({ children }) {
  const { token, user } = useAuth();

  if (token && user) {
    return (
      <>
        <NavBar />
        <Outlet />
      </>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
}
