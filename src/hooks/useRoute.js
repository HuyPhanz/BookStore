import React, { createContext, useContext, useState } from "react";
import {useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

const authContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('user');
  const navigate = useNavigate();

  const login = (userDetails) => {
    setUser(userDetails);
    navigate(userDetails.userName === 'admin' ? '/admin/user' : '/home');
  };

  const logout = () => {
    setUser({});
    navigate("/");
  };

  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};