import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { authRoutes, routes } from "./routes";
import RequireAuth from "./RequireAuth";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        {authRoutes.map(({ path, Component }, i) => (
          <Route path={path} element={Component} key={i} />
        ))}

        {/* Require Authentication Routes */}
        <Route element={<RequireAuth />}>
          {routes.map(({ path, Component }, i) => (
            <Route path={path} element={Component} key={i} />
          ))}
        </Route>

        {/* Catch all Routes */}
        <Route path={"/*"} element={<div>404 not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
