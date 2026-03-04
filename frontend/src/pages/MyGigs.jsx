import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../lib/Axios.jsx";
import heroVisual from "../assets/hero-visual.svg";

const MyGigs = () => {
  const navigate = useNavigate();
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyGigs = async () => {
      try {
        const res = await api.get("/gig/my-gigs");
        setGigs(res.data.gigs || []);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
          return;
        }

        setError("Failed to load your gigs");
      } finally {
        setLoading(false);
      }
    };

    fetchMyGigs();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading your gigs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <section className="surface rounded-[1.7rem] p-6 sm:p-8 fade-up">
          <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr] items-center">
            <div>
              <span className="brand-pill inline-flex rounded-full px-3 py-1 text-xs uppercase tracking-[0.14em]">
                Owner dashboard
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
                My Gigs
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-[54ch]">
                Review every gig you posted and jump directly into bid management.
              </p>
            </div>
            <img
              src={heroVisual}
              alt="Dashboard preview"
              className="w-full rounded-2xl border border-sky-100 shadow-md"
            />
          </div>
        </section>

        {error && <p className="mt-4 text-sm text-red-700">{error}</p>}

        {gigs.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-sky-300 bg-white/80 p-8 text-center">
            <p className="text-slate-600">You have not created any gigs yet.</p>
            <Link
              to="/create-gig"
              className="inline-block mt-4 text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              Create your first gig
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {gigs.map((gig) => {
              const gigId = String(gig.gigId);

              return (
              <div
                key={gigId}
                className="surface-solid rounded-2xl p-5 fade-up stagger-1"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {gig.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                      {gig.description}
                    </p>
                    <p className="mt-3 text-xs text-slate-500">
                      Created: {new Date(gig.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-sm text-slate-700">
                    <p className="font-medium">
                      Bids Received:{" "}
                      <span className="text-blue-700">{gig.bidsCount}</span>
                    </p>
                    <Link
                      to={`/gig/${gigId}/bids`}
                      className="inline-block mt-2 text-blue-700 hover:text-blue-800 font-medium"
                    >
                      View bids
                    </Link>
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGigs;
