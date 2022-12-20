import React from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "../../hooks/useRoute";

const RequireAuth = ({ children }) => {
  const auth = useAuth();

  return auth?.user?.accessToken ? (
    children
  ) : (
    <Navigate to="/auth/login"/>
  );
};

export default RequireAuth
