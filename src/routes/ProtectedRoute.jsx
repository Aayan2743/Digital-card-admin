// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children }) {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) return <div>Loading...</div>;

//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// }

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // ⏳ Wait for auth check
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  // 🔐 Not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
