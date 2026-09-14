import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Login api hit krna
    try {
      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setUser(data.user);
        }
        setMessage("Login Successful! 🎉");
        navigate("/");
      } else {
        setMessage(`Error:${data.message || "Login failed"}`);
      }
    } catch (error) {
      // console.log(error);
      toast.error(`Error : ${error}`);
      setMessage("server connection failed.Is beckend running?");
    } finally {
      setLoading(false);
    }
  };

  // Google login success Handler
  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("value1:", credentialResponse.credential);
    try {
      setLoading(true);

      // Google se mila credential token beckend pe bhejo
      const response = await fetch(`${API_URL}/api/v1/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        // console.log(data);
        setMessage("Google Login Successfully!");
        navigate("/");
      } else {
        setMessage(`Error: ${data.message || "Google login failed"}`);
      }
    } catch (err) {
      // console.log(err);
      toast.error(`error : ${err}`);
      setMessage("Server connection failed.Is beckend failed");
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Google Login Error Handler
  const handleGoogleError = () => {
    setMessage("Google Login failed.Please try again.");
  };

  const isError =
    message.toLowerCase().includes("error") ||
    message.toLowerCase().includes("failed");

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700">
        {/* Heading */}

        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-slate-400 text-sm mb-8">
          Login to continue your journey
        </p>

        {/* message Box */}

        {message && (
          <div
            className={`p-3 mb-5 rounded-lg text-sm border ${
              isError
                ? "bg-red-500/20 text-red-400 border-red-500"
                : "bg-green-50/20 text-green-400 border-green-500"
            }`}
          >
            {message}
          </div>
        )}
        {/* ✅ NAYA: Google Login Component */}
        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="filled_black"
            size="large"
            text="continue_with"
            shape="rectangular"
            width="370"
          />
        </div>

        {/* Divider */}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. rahul@example.com"
              required
              className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 
              rounded-lg text-white placeholder-slate focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>

          {/* password Field */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-slate-300">
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-xs text-indigo-400 hover:text-indigo-300 transition"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="*************"
              required
              className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Submit Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Logging in....." : "Login"}
          </button>
        </form>

        {/* Sign UP Link */}

        <p className="text-center text-slate-400 text-sm mt-6">
          Dont't have an account?{" "}
          <a
            href="/SignUp"
            className="text-indigo-400 hover:text-indigo-300 font-medium tarsition"
          >
            SignUp
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
