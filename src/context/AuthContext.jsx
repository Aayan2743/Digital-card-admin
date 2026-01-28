// import { createContext, useContext, useEffect, useRef, useState } from "react";
// // import jwtDecode from "jwt-decode";
// import { jwtDecode } from "jwt-decode";
// import api from "../services/api";

// const AuthContext = createContext();

// const isTokenValid = (token) => {
//   try {
//     const decoded = jwtDecode(token);
//     return decoded.exp * 1000 > Date.now();
//   } catch {
//     return false;
//   }
// };

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const cached = localStorage.getItem("admin_user");
//     return cached ? JSON.parse(cached) : null;
//   });

//   const [branding, setBranding] = useState(() => {
//     const cached = localStorage.getItem("branding");
//     return cached ? JSON.parse(cached) : null;
//   });

//   const [cardPricing, setCardPricing] = useState(() => {
//     const cached = localStorage.getItem("card_pricing");
//     return cached ? JSON.parse(cached) : null;
//   });

//   const [loading, setLoading] = useState(true);

//   // 🔒 Prevent duplicate calls (React 18 StrictMode safe)
//   const hasFetched = useRef(false);

//   useEffect(() => {
//     if (hasFetched.current) return;
//     hasFetched.current = true;

//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");

//     const requests = [];

//     // ✅ Call profile ONLY if token exists AND valid
//     if (token && isTokenValid(token)) {
//       requests.push(
//         api
//           .get("/profile")
//           .then((res) => {
//             setUser(res.data.user);
//             localStorage.setItem("admin_user", JSON.stringify(res.data.user));
//           })
//           .catch(() => {
//             localStorage.removeItem("token");
//             sessionStorage.removeItem("token");
//             setUser(null);
//           }),
//       );
//     } else {
//       // 🔐 Token expired or invalid
//       localStorage.removeItem("token");
//       sessionStorage.removeItem("token");
//       setUser(null);
//     }

//     // 🎨 Branding fetch (safe)
//     if (!branding) {
//       requests.push(
//         api.get("/public/settings/brand").then((res) => {
//           setBranding(res.data.data);
//           localStorage.setItem("branding", JSON.stringify(res.data.data));
//         }),
//       );
//     }

//     if (!cardPricing) {
//       requests.push(
//         api.get("/settings/card-pricing").then((res) => {
//           setCardPricing(res.data.data);
//           localStorage.setItem("card_pricing", JSON.stringify(res.data.data));
//         }),
//       );
//     }

//     Promise.allSettled(requests).finally(() => {
//       setLoading(false);
//     });
//   }, []);

//   // 🔑 Login handler
//   const login = (userData, token, remember = false) => {
//     if (remember) {
//       localStorage.setItem("token", token);
//       localStorage.setItem("remember_me", "1");
//     } else {
//       sessionStorage.setItem("token", token);
//     }

//     localStorage.setItem("admin_user", JSON.stringify(userData));
//     setUser(userData);
//   };

//   // 🚪 Logout handler
//   const logout = async () => {
//     try {
//       await api.post("/logout");
//     } catch (_) {}

//     localStorage.removeItem("token");
//     sessionStorage.removeItem("token");
//     localStorage.removeItem("admin_user");
//     localStorage.removeItem("branding");
//     localStorage.removeItem("remember_me");

//     setUser(null);
//     setBranding(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         branding,
//         loading,
//         cardPricing,
//         login,
//         logout,
//         isAuthenticated: !!user,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";

const AuthContext = createContext();

/* ================= TOKEN VALIDATION ================= */
const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export function AuthProvider({ children }) {
  /* ================= STATE ================= */
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem("admin_user");
    return cached ? JSON.parse(cached) : null;
  });

  const [branding, setBranding] = useState(() => {
    const cached = localStorage.getItem("branding");
    return cached ? JSON.parse(cached) : null;
  });

  const [cardPricing, setCardPricing] = useState(() => {
    const cached = localStorage.getItem("card_pricing");
    return cached ? JSON.parse(cached) : null;
  });

  const [loading, setLoading] = useState(true);

  // 🔒 Prevent duplicate bootstrap calls (StrictMode safe)
  const hasFetched = useRef(false);

  /* ================= BOOTSTRAP ================= */
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    const requests = [];

    /* ---------- PROFILE ---------- */
    if (token && isTokenValid(token)) {
      // Only fetch profile if not already cached
      if (!user) {
        requests.push(
          api
            .get("/profile")
            .then((res) => {
              setUser(res.data.user);
              localStorage.setItem("admin_user", JSON.stringify(res.data.user));
            })
            .catch(() => {
              localStorage.removeItem("token");
              sessionStorage.removeItem("token");
              localStorage.removeItem("admin_user");
              setUser(null);
            }),
        );
      }
    } else {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      localStorage.removeItem("admin_user");
      setUser(null);
    }

    /* ---------- BRANDING ---------- */
    if (!branding) {
      requests.push(
        api.get("/public/settings/brand").then((res) => {
          setBranding(res.data.data);
          localStorage.setItem("branding", JSON.stringify(res.data.data));
        }),
      );
    }

    /* ---------- CARD PRICING ---------- */
    if (!cardPricing) {
      requests.push(
        api.get("/settings/card-pricing").then((res) => {
          setCardPricing(res.data.data);
          localStorage.setItem("card_pricing", JSON.stringify(res.data.data));
        }),
      );
    }

    Promise.allSettled(requests).finally(() => {
      setLoading(false);
    });
  }, []);

  /* ================= LOGIN ================= */
  const login = (userData, token, remember = false) => {
    if (remember) {
      localStorage.setItem("token", token);
      localStorage.setItem("remember_me", "1");
      sessionStorage.removeItem("token");
    } else {
      sessionStorage.setItem("token", token);
      localStorage.removeItem("token");
    }

    localStorage.setItem("admin_user", JSON.stringify(userData));
    setUser(userData);
  };

  /* ================= LOGOUT ================= */
  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (_) {}

    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("branding");
    localStorage.removeItem("card_pricing");
    localStorage.removeItem("remember_me");

    setUser(null);
    setBranding(null);
    setCardPricing(null);
  };

  /* ================= PROVIDER ================= */
  return (
    <AuthContext.Provider
      value={{
        user,
        branding,
        cardPricing,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ================= HOOK ================= */
export const useAuth = () => useContext(AuthContext);
