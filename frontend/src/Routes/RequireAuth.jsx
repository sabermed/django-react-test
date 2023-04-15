import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../Utils/useAuth";

export default function RequireAuth({ children }) {
  const { token, user } = useAuth();

  if (token && user) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} />;
  }
}
