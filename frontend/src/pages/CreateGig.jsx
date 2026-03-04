import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/Axios.jsx";

const CreateGig = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/gig/create", {
  title: title.trim(),
  description: description.trim(),
  budget: Number(budget),
});

      navigate("/gigs");
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Failed to create gig");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="surface rounded-[1.7rem] p-6 sm:p-9 fade-up">
          <span className="brand-pill inline-flex rounded-full px-3 py-1 text-xs uppercase tracking-[0.14em]">
            New project brief
          </span>

          <h1 className="text-3xl font-bold text-slate-900 mt-4">
            Create a New Gig
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Fill in the details below to post a new gig.
          </p>

         
          {error && (
            <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. Build a responsive landing page"
                className="w-full rounded-xl border border-sky-200 bg-white/90 px-3.5 py-2.5
                           text-sm text-slate-800
                           focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                placeholder="Describe the work, expectations, and deliverables…"
                className="w-full rounded-xl border border-sky-200 bg-white/90 px-3.5 py-2.5
                           text-sm text-slate-800
                           focus:outline-none focus:ring-2 focus:ring-sky-500
                           resize-none"
              />
            </div>

           
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Budget
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  ₹
                </span>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required
                  placeholder="Enter your budget"
                  className="w-full rounded-xl border border-sky-200 bg-white/90 px-3.5 py-2.5 pl-8
                             text-sm text-slate-800
                             focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

           
            <button
              type="submit"
              disabled={loading}
              className="button-brand inline-flex items-center justify-center rounded-xl px-5 py-2.5
                         text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating…" : "Create Gig"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGig;
