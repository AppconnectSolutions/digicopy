import React, { useState } from "react";
import { ArrowLeft, Lock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({ onLoginSuccess }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const API_URL = process.env.REACT_APP_API_URL || "https://api.digicopy.in";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("adminUser", JSON.stringify(data.admin));
      onLoginSuccess(data.admin); 

      navigate("/admin/dashboard", { replace: true });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-300">
      
      {/* 1. FLOATING BACK BUTTON (Matches Reference Image Style) */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-1/2 left-0 -translate-y-1/2 flex items-center gap-2 bg-white/95 py-3 px-8 rounded-r-full shadow-lg text-gray-700 hover:text-orange-600 transition-all z-50 group border border-white/20"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold">Back</span>
      </button>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/40 rotate-12 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/30 -rotate-12 rounded-full blur-xl"></div>
      </div>

      {/* ADMIN CARD */}
      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20 relative z-10">
        
        {/* HEADER (Updated to match your dark/orange theme) */}
        <div className="p-8 text-center bg-[#2D2D2D] text-white">
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-white/10">
            <Lock size={36} />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">Admin Portal</h2>
          <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest font-medium">
            Owner & Staff Access Only
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="p-8 space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@digicopy.in"
              className="w-full border-2 border-gray-100 px-4 py-3 rounded-xl focus:border-orange-500 outline-none transition-all bg-gray-50/50"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
              Secure Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border-2 border-gray-100 px-4 py-3 rounded-xl focus:border-orange-500 outline-none transition-all bg-gray-50/50"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-200 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Verifying..." : "AUTHORIZE ACCESS"}
            {!loading && <ChevronRight size={20} />}
          </button>
        </form>
      </div>

      {/* FOOTER LABEL */}
      <div className="absolute bottom-6 flex items-center gap-2 opacity-80">
        <span className="text-white font-bold text-2xl tracking-tighter italic">ADMIN</span>
      </div>
    </div>
  );
}