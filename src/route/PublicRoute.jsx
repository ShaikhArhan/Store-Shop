import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
    // const [isAuthenticat, setIsAuthenticat] = useState(true);
  //   return isAuthenticat ? <Outlet /> : <Navigate to="/login" />;
  return <Outlet />;
};
