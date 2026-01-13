import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/Axios.jsx";

const Gigs = () => {
  const navigate = useNavigate();

  const [gigs, setGigs] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchGigs = async () => {
    if (!hasMore || loading) return;

    setLoading(true);

    try {
      const res = await api.get("/gig/gigs", {
        params: {
          limit: 10,
          cursor,
        },
      });

    setGigs(prev => {
  const existingIds = new Set(prev.map(g => g._id));
  const uniqueNewGigs = res.data.gigs.filter(
    g => !existingIds.has(g._id)
  );
  return [...prev, ...uniqueNewGigs];
});

      setCursor(res.data.nextCursor);
      setHasMore(res.data.hasMore);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        fetchGigs();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [cursor, hasMore]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold text-gray-900">
          Open Gigs
        </h1>
        <p className="text-gray-600 mt-1">
          Browse freelance gigs posted by clients
        </p>

        {/* Gigs Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gigs.map((gig) => (
            <div
              key={gig._id}
              className="bg-white rounded-xl border border-gray-200 p-5
                         hover:shadow-md transition-shadow duration-200"
            >
              <h2 className="text-lg font-medium text-gray-900 line-clamp-1">
                {gig.title}
              </h2>

              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {gig.description}
              </p>

              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-semibold text-indigo-600">
                  ₹ {gig.budget}
                </span>

                <Link
                  to={`/gigs/${gig._id}`}
                  className="text-sm text-gray-700 hover:text-indigo-600"
                >
                  View →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Loading / End Indicator */}
        <div className="mt-10 text-center">
          {loading && (
            <p className="text-sm text-gray-500">Loading more gigs…</p>
          )}

          {!hasMore && !loading && (
            <p className="text-sm text-gray-400">
              You’ve reached the end
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
