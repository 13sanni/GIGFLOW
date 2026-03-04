import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../lib/Axios.jsx";

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading your gigs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold text-gray-900">My Gigs</h1>
        <p className="mt-1 text-sm text-gray-600">
          All gigs created by you, with quick access to received bids.
        </p>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {gigs.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
            <p className="text-gray-600">You have not created any gigs yet.</p>
            <Link
              to="/create-gig"
              className="inline-block mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700"
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
                className="bg-white border border-gray-200 rounded-xl p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {gig.title}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {gig.description}
                    </p>
                    <p className="mt-3 text-xs text-gray-500">
                      Created: {new Date(gig.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-sm text-gray-700">
                    <p className="font-medium">
                      Bids Received:{" "}
                      <span className="text-indigo-600">{gig.bidsCount}</span>
                    </p>
                    <Link
                      to={`/gig/${gigId}/bids`}
                      className="inline-block mt-2 text-indigo-600 hover:text-indigo-700"
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
