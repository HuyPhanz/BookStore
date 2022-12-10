import React from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "../../hooks/useRoute";

export const accessToken = ({ children }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const auth = useAuth();

  return auth.accessToken ? (
    children
  ) : (
    <Navigate to="/auth/login"/>
  );
};