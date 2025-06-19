"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const res = await axios.get(`${base_url}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setIsLoggedIn(true);
      } else {
        throw new Error("Unauthorized");
      }
    } catch ( err ) {
      console.warn("Invalid or expired token.", err);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();

    const handleStorage = () => checkAuth();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
