import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../lib/Axios.jsx";
import BidForm from "../components/BidForm";

const GigDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gigRes, meRes] = await Promise.all([
          api.get(`/gig/${id}`),
          api.get("/auth/me"),
        ]);

        setGig(gigRes.data.gig);
        setUserId(meRes.data.user.userId);

        if (gigRes.data.gig.owner === meRes.data.user.userId) {
          const bidsRes = await api.get(`/bid/gig/${id}`);
          setBids(bidsRes.data.bids);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          setError("Failed to load gig");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const hireBid = async (bidId) => {
    try {
      await api.post(`/bid/${bidId}/hire`);
      alert("Freelancer hired successfully");

      const gigRes = await api.get(`/gig/${id}`);
      setGig(gigRes.data.gig);

      const bidsRes = await api.get(`/bid/gig/${id}`);
      setBids(bidsRes.data.bids);
    } catch {
      alert("Failed to hire freelancer");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading gig details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  const isOwner = gig.owner === userId;

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <Link
          to="/gigs"
          className="inline-flex brand-pill rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.12em] hover:bg-sky-100/80 transition-colors"
        >
          Back to gigs
        </Link>

        <div className="surface rounded-[1.6rem] p-6 sm:p-8 fade-up">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-5">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {gig.title}
              </h1>
              <p className="mt-3 text-slate-600 leading-relaxed">
                {gig.description}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-2xl font-bold text-blue-700">
                ₹ {gig.budget}
              </p>
              <span
                className={`inline-block mt-3 text-xs px-3 py-1.5 rounded-full font-medium ${gig.status === "open"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                  }`}
              >
                {gig.status}
              </span>
            </div>
          </div>
        </div>

        {!isOwner && gig.status === "open" && (
          <div className="surface-solid rounded-2xl p-6 fade-up stagger-1">
            <h2 className="text-xl font-semibold text-slate-900">
              Place a Bid
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Submit your proposal for this gig
            </p>

            <BidForm gigId={gig._id} />
          </div>
        )}

        {isOwner && (
          <div className="surface-solid rounded-2xl p-6 fade-up stagger-1">
            <h2 className="text-xl font-semibold text-slate-900">
              Bids Received
            </h2>

            {bids.length === 0 ? (
              <p className="mt-3 text-slate-600">
                No bids have been placed yet.
              </p>
            ) : (
              <div className="mt-4 space-y-4">
                {bids.map((bid) => (
                  <div
                    key={bid._id}
                    className="border border-sky-100 bg-sky-50/40 rounded-xl p-4
                               flex flex-col sm:flex-row sm:justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm text-slate-800">
                        {bid.proposal}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Amount: ₹{bid.amount} · Status: {bid.status}
                      </p>
                    </div>

                    {gig.status === "open" && bid.status === "pending" && (
                      <button
                        onClick={() => hireBid(bid._id)}
                        className="button-brand self-start sm:self-center rounded-xl px-4 py-2
                                   text-sm font-semibold"
                      >
                        Hire
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GigDetail;
