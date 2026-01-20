import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Restore login on refresh
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/profile")
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem("admin_user", JSON.stringify(res.data.user));
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // ✅ Login (token already stored in Login.jsx)
  const login = (userData) => {
    localStorage.setItem("admin_user", JSON.stringify(userData));
    setUser(userData);
  };

  // ✅ Logout (clear everything)
  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (_) {}

    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("remember_me");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
