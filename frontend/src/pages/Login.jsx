import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../lib/Axios.jsx";
import logoMark from "../assets/logo-mark.svg";
import heroVisual from "../assets/hero-visual.svg";

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
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl surface rounded-[2rem] overflow-hidden grid grid-cols-1 md:grid-cols-2 fade-up">
        <div className="hidden md:flex relative p-10 bg-sky-100/60">
          <div className="absolute top-7 left-7 brand-pill rounded-full px-3 py-1 text-xs uppercase tracking-[0.14em]">
            Trusted talent network
          </div>
          <div className="relative z-10 flex flex-col justify-between gap-8 w-full">
            <div className="space-y-3 mt-10">
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">
                Build with the right freelancers, faster.
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed max-w-[30ch]">
                Track gigs, handle bids, and close hires with one focused workspace.
              </p>
            </div>
            <img
              src={heroVisual}
              alt="GigFlow workspace preview"
              className="w-full rounded-2xl border border-sky-100 shadow-md"
            />
          </div>
        </div>

        <div className="p-6 sm:p-10 md:p-12 flex flex-col justify-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <img src={logoMark} alt="GigFlow logo" className="h-10 w-10 rounded-xl" />
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Welcome back</p>
              <p className="text-lg font-bold text-slate-900">GigFlow</p>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Log In
          </h1>
          <p className="text-sm text-slate-600 mb-6">
            Enter your credentials to continue
          </p>

          {error && (
            <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl p-2.5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-sky-200 bg-white/85 rounded-xl px-3.5 py-2.5 text-sm
                           focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-sky-200 bg-white/85 rounded-xl px-3.5 py-2.5 text-sm
                           focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="button-brand w-full py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-700 hover:text-blue-800 font-semibold"
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
