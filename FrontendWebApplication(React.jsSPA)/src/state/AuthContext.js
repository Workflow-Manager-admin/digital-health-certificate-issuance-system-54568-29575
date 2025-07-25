import React, { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

// PUBLIC_INTERFACE
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUser({ ...decoded, token: storedToken });
        setToken(storedToken);
      } catch {
        setUser(null);
        setToken(null);
      }
    }
  }, []);

  // PUBLIC_INTERFACE
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token } = res.data;
      const decoded = jwtDecode(token);
      setUser({ ...decoded, token });
      setToken(token);
      localStorage.setItem("token", token);
      toast.success("Logged in!");
      return true;
    } catch (e) {
      toast.error("Login failed!");
      return false;
    }
  };

  // PUBLIC_INTERFACE
  const register = async (name, email, password) => {
    try {
      await axios.post(`${API_URL}/auth/register`, { name, email, password });
      toast.success("Registration successful! Please log in.");
      return true;
    } catch (e) {
      toast.error("Registration failed!");
      return false;
    }
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    toast.info("Logged out");
  };

  // For API requests
  axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
