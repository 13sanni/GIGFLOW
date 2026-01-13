import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/Axios";

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
         
          <h1 className="text-2xl font-semibold text-gray-900">
            Create a New Gig
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Fill in the details below to post a new gig.
          </p>

         
          {error && (
            <div className="mt-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. Build a responsive landing page"
                className="w-full rounded-lg border border-gray-300 px-3 py-2
                           text-sm text-gray-800
                           focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                placeholder="Describe the work, expectations, and deliverables…"
                className="w-full rounded-lg border border-gray-300 px-3 py-2
                           text-sm text-gray-800
                           focus:outline-none focus:ring-2 focus:ring-indigo-500
                           resize-none"
              />
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required
                  placeholder="Enter your budget"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 pl-8
                             text-sm text-gray-800
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

           
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center
                         rounded-lg bg-indigo-600 px-5 py-2.5
                         text-sm font-medium text-white
                         hover:bg-indigo-700
                         disabled:opacity-60 disabled:cursor-not-allowed
                         transition-colors"
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
