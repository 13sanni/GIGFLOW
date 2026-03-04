import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/Axios.jsx";
import heroVisual from "../assets/hero-visual.svg";

const Gigs = () => {
  const navigate = useNavigate();

  const [gigs, setGigs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const cursorRef = useRef(null);
  const hasMoreRef = useRef(true);
  const loadingRef = useRef(false);
  const sentinelRef = useRef(null);

  const fetchGigs = useCallback(async () => {
    if (!hasMoreRef.current || loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const res = await api.get("/gig/gigs", {
        params: {
          limit: 10,
          cursor: cursorRef.current,
        },
      });

    setGigs(prev => {
  const existingIds = new Set(prev.map(g => g._id));
  const uniqueNewGigs = res.data.gigs.filter(
    g => !existingIds.has(g._id)
  );
  return [...prev, ...uniqueNewGigs];
});

      const nextCursor = res.data.nextCursor ?? null;
      const nextHasMore = Boolean(res.data.hasMore);

      cursorRef.current = nextCursor;
      hasMoreRef.current = nextHasMore;

      setHasMore(nextHasMore);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchGigs();
  }, [fetchGigs]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          fetchGigs();
        }
      },
      { root: null, rootMargin: "320px", threshold: 0 }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [fetchGigs]);

  return (
    <div className="min-h-screen pb-10">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <section className="surface rounded-[1.8rem] p-6 sm:p-8 md:p-10 fade-up">
          <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div className="space-y-4">
              <span className="brand-pill inline-flex rounded-full px-3 py-1 text-xs uppercase tracking-[0.14em]">
                Live marketplace
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-slate-900">
                Open gigs ready for skilled execution.
              </h1>
              <p className="text-slate-600 max-w-[60ch] text-sm sm:text-base">
                Explore active projects, place precise bids, and move quickly from shortlist to hire.
              </p>
            </div>

            <img
              src={heroVisual}
              alt="Gig marketplace overview"
              className="w-full rounded-2xl border border-sky-100 shadow-md"
            />
          </div>
        </section>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gigs.map((gig) => (
            <div
              key={gig._id}
              className="surface-solid rounded-2xl p-5
                         hover:-translate-y-0.5 transition-all duration-200
                         fade-up stagger-1"
            >
              <h2 className="text-lg font-semibold text-slate-900 line-clamp-1">
                {gig.title}
              </h2>

              <p className="text-sm text-slate-600 mt-2 line-clamp-3">
                {gig.description}
              </p>

              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-semibold text-blue-700">
                  ₹ {gig.budget}
                </span>

                <Link
                  to={`/gigs/${gig._id}`}
                  className="text-sm text-slate-700 hover:text-blue-700 font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          {loading && (
            <p className="text-sm text-slate-500">Loading more gigs...</p>
          )}

          {!hasMore && !loading && (
            <p className="text-sm text-slate-400">
              You have reached the end
            </p>
          )}
        </div>
        <div ref={sentinelRef} className="h-1 w-full" />
      </div>
    </div>
  );
};

export default Gigs;
