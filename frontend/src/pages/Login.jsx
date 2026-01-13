import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../lib/Axios.jsx";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/login", { email, password });
      navigate("/gigs");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {/* Main Card */}
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT SECTION */}
        <div className="hidden md:flex relative">
          <img
            src="https://images.unsplash.com/photo-1517433456452-f9633a875f6f"
            alt="Work"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="relative z-10 bg-black/50 w-full flex flex-col justify-center px-10 text-white">
            <p className="text-sm uppercase tracking-wide mb-2">
              Hello
            </p>
            <h2 className="text-3xl font-semibold mb-4">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-200 mb-6 leading-relaxed">
              Log in to manage your gigs and bids.
            </p>

          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="p-6 sm:p-10 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Log In
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Enter your credentials to continue
          </p>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-2 rounded text-sm font-medium
                         hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-teal-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
