import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { successAlert, errorAlert } from "../../utils/alert";
import Loader from "../../components/Loader";

import api from "../../services/api";
import Footer from "../../components/Footer";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { branding } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("remember_me") === "true",
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      // ✅ STORE TOKEN BASED ON REMEMBER ME
      if (rememberMe) {
        localStorage.setItem("token", res.data.token);
        sessionStorage.removeItem("token");
      } else {
        sessionStorage.setItem("token", res.data.token);
        localStorage.removeItem("token");
      }

      // ✅ Save user in context
      login(res.data.user);

      successAlert("Login Successful", "Welcome back!");
      navigate("/");
    } catch (error) {
      errorAlert(
        "Login Failed",
        error.response?.data?.message || "Invalid credentials",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
      <Loader show={loading} text="Signing you in..." />
      {/* Card */}
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
        {/* Logo / Title */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden">
            <img
              src={branding?.logo || "/logo.jpeg"}
              alt="Logo"
              className="h-10 w-10 object-contain"
            />
          </div>
          <h1 className="font-bold text-lg">
            {branding?.brand_name || "Admin Panel"}
          </h1>
          <p className="text-white/80 text-sm mt-1">
            Sign in to manage your dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-white text-sm mb-1 block">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/90 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          {/* Password */}
          <div>
            <label className="text-white text-sm mb-1 block">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/90 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          {/* Remember + Forgot */}

          <div className="flex items-center justify-between text-sm text-white/80">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                className="accent-indigo-500"
                onChange={(e) => {
                  setRememberMe(e.target.checked);
                  localStorage.setItem("remember_me", e.target.checked);
                }}
              />
              Remember me
            </label>

            <span
              onClick={() => navigate("/forget-password")}
              className="hover:underline cursor-pointer"
            >
              Forgot password?
            </span>
          </div>
          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-semibold transition shadow-lg
    ${
      loading
        ? "bg-indigo-400 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-700"
    } text-white`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
