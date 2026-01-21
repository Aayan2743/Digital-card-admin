// import { createContext, useContext, useEffect, useState } from "react";
// import api from "../services/api";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [branding, setBranding] = useState(null); // ✅ NEW
//   const [loading, setLoading] = useState(true);

//   /* ======================
//      RESTORE LOGIN + BRANDING
//   ====================== */
//   useEffect(() => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");

//     const requests = [];

//     // 🔐 Restore user session
//     if (token) {
//       requests.push(
//         api.get("/profile").then((res) => {
//           setUser(res.data.user);
//           localStorage.setItem("admin_user", JSON.stringify(res.data.user));
//         }),
//       );
//     }

//     // 🎨 Fetch branding (PUBLIC / AUTH SAFE)
//     requests.push(
//       api
//         .get("/public/settings/brand")
//         .then((res) => {
//           setBranding(res.data.data);

//           // 🔖 Apply favicon globally
//           if (res.data?.data?.favicon) {
//             let link =
//               document.querySelector("link[rel~='icon']") ||
//               document.createElement("link");

//             link.rel = "icon";
//             link.href = res.data.data.favicon;
//             document.head.appendChild(link);
//           }
//         })
//         .catch(() => {
//           setBranding(null);
//         }),
//     );

//     Promise.allSettled(requests).finally(() => {
//       setLoading(false);
//     });
//   }, []);

//   /* ======================
//      LOGIN
//   ====================== */
//   const login = (userData) => {
//     localStorage.setItem("admin_user", JSON.stringify(userData));
//     setUser(userData);
//   };

//   /* ======================
//      LOGOUT
//   ====================== */
//   const logout = async () => {
//     try {
//       await api.post("/logout");
//     } catch (_) {}

//     localStorage.removeItem("token");
//     sessionStorage.removeItem("token");
//     localStorage.removeItem("admin_user");
//     localStorage.removeItem("remember_me");

//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         branding, // ✅ EXPOSE BRANDING
//         login,
//         logout,
//         loading,
//         isAuthenticated: !!user,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 👇 Load cached branding instantly
  const [branding, setBranding] = useState(() => {
    const cached = localStorage.getItem("branding");
    return cached ? JSON.parse(cached) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    const requests = [];

    // Restore session
    if (token) {
      requests.push(
        api.get("/profile").then((res) => {
          setUser(res.data.user);
          localStorage.setItem("admin_user", JSON.stringify(res.data.user));
        }),
      );
    }

    // Fetch latest branding (background refresh)
    requests.push(
      api.get("/public/settings/brand").then((res) => {
        setBranding(res.data.data);
        localStorage.setItem("branding", JSON.stringify(res.data.data));

        // Apply favicon immediately
        if (res.data?.data?.favicon) {
          let link =
            document.querySelector("link[rel~='icon']") ||
            document.createElement("link");

          link.rel = "icon";
          link.href = res.data.data.favicon;
          document.head.appendChild(link);
        }
      }),
    );

    Promise.allSettled(requests).finally(() => {
      setLoading(false);
    });
  }, []);

  const login = (userData) => {
    localStorage.setItem("admin_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (_) {}

    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("remember_me");
    localStorage.removeItem("branding");

    setUser(null);
    setBranding(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        branding,
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
