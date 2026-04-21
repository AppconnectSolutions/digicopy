import React, { useState } from "react";
import { ArrowLeft, UserPlus, LogIn, X, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CustomerLogin({ onLoginSuccess }) {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "https://api.digicopy.in";

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [showForgot, setShowForgot] = useState(false);
  const [forgotMobile, setForgotMobile] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setFormData({ name: "", mobile: "", email: "", password: "" });
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const url = isRegistering
      ? `${API_URL}/api/customers/register`
      : `${API_URL}/api/customers/login`;

    const bodyData = isRegistering
      ? { ...formData }
      : { mobile: formData.mobile, password: formData.password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Authentication failed");

      if (!isRegistering) {
        onLoginSuccess(data.customer, data.transactions || []);
      } else {
        alert("Account created successfully!");
        toggleMode();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setForgotMsg("");
    if (!forgotMobile || !newPassword || !confirmPassword) {
      setForgotMsg("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setForgotMsg("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/api/customers/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: forgotMobile, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");

      alert("Password updated successfully.");
      setShowForgot(false);
    } catch (e) {
      setForgotMsg(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-300">
      
      {/* 1. POSITIONED BACK BUTTON (Matches Reference Image) */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-1/2 left-0 -translate-y-1/2 flex items-center gap-2 bg-white/95 py-3 px-8 rounded-r-full shadow-lg text-gray-700 hover:text-orange-600 transition-all z-50 group border border-white/20"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold">Back</span>
      </button>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-24 h-32 bg-white/40 rotate-12 rounded-lg blur-sm shadow-xl"></div>
        <div className="absolute bottom-20 right-10 w-20 h-28 bg-white/30 -rotate-12 rounded-lg blur-sm shadow-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-20 bg-white/20 rotate-45 rounded-lg blur-sm"></div>
      </div>

      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20 relative z-10">
        
        {/* Header Section */}
        <div className="p-8 text-center bg-[#2D2D2D] text-white">
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-white/10">
            {isRegistering ? <UserPlus size={36} /> : <Printer size={36} />}
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            {isRegistering ? "Join Digi Copy" : "Welcome Back"}
          </h2>
          <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest font-medium">
            Professional Digital Printing
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-2 border-gray-100 px-4 py-3 rounded-xl focus:border-orange-500 outline-none transition-all"
                required
              />
            )}
            
            <input
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border-2 border-gray-100 px-4 py-3 rounded-xl focus:border-orange-500 outline-none transition-all bg-gray-50/50"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-2 border-gray-100 px-4 py-3 rounded-xl focus:border-orange-500 outline-none transition-all bg-gray-50/50"
              required
            />

            {!isRegistering && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-sm text-orange-600 font-semibold hover:text-orange-700 underline underline-offset-4"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-200 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {isLoading ? "Processing..." : isRegistering ? "CREATE ACCOUNT" : "LOGIN TO DASHBOARD"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={toggleMode}
              className="text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
            >
              {isRegistering 
                ? "Already have an account? Login" 
                : "New to Digi Copy? Create an account"}
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER LOGO */}
      <div className="absolute bottom-6 flex items-center gap-2 opacity-80">
        <span className="text-white font-bold text-2xl tracking-tighter">Xerox</span>
      </div>

      {/* RESET PASSWORD MODAL */}
      {showForgot && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-sm shadow-2xl">
            <h3 className="font-bold text-2xl mb-1 text-gray-800">Reset Password</h3>
            <p className="text-gray-500 text-sm mb-6">Enter details to update your password</p>

            <div className="space-y-3">
              <input
                placeholder="Registered Mobile"
                value={forgotMobile}
                onChange={(e) => setForgotMobile(e.target.value)}
                className="w-full border-2 border-gray-100 px-4 py-3 rounded-xl focus:border-orange-500 outline-none transition-all"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border-2 border-gray-100 px-4 py-3 rounded-xl focus:border-orange-500 outline-none transition-all"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border-2 border-gray-100 px-4 py-3 rounded-xl focus:border-orange-500 outline-none transition-all"
              />
            </div>

            {forgotMsg && <p className="text-sm text-red-600 mt-3 text-center">{forgotMsg}</p>}

            <div className="flex gap-3 mt-8">
              <button
                onClick={handleResetPassword}
                className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-all"
              >
                Update
              </button>
              <button
                onClick={() => setShowForgot(false)}
                className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}