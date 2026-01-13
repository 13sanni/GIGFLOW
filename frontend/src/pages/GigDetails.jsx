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
          api.get(`/gig/gigs/${id}`),
          api.get("/auth/me"),
        ]);

        setGig(gigRes.data.gig);
        setUserId(meRes.data.user.userId);

        // OWNER → fetch bids
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading gig details…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const isOwner = gig.owner === userId;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        {/* Back */}
        <Link
          to="/gigs"
          className="text-sm text-gray-600 hover:text-indigo-600"
        >
          ← Back to gigs
        </Link>

        {/* Gig Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {gig.title}
              </h1>
              <p className="mt-3 text-gray-600 leading-relaxed">
                {gig.description}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-lg font-semibold text-indigo-600">
                ₹ {gig.budget}
              </p>
              <span
                className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${
                  gig.status === "open"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {gig.status}
              </span>
            </div>
          </div>
        </div>

        {/* CASE 2 — NON OWNER → BID FORM */}
        {!isOwner && gig.status === "open" && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Place a Bid
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Submit your proposal for this gig
            </p>

            <BidForm gigId={gig._id} />
          </div>
        )}

        {/* CASE 1 — OWNER → BIDS LIST */}
        {isOwner && (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Bids Received
            </h2>

            {bids.length === 0 ? (
              <p className="mt-3 text-gray-600">
                No bids have been placed yet.
              </p>
            ) : (
              <div className="mt-4 space-y-4">
                {bids.map((bid) => (
                  <div
                    key={bid._id}
                    className="border border-gray-200 rounded-lg p-4
                               flex flex-col sm:flex-row sm:justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm text-gray-800">
                        {bid.proposal}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Amount: ₹{bid.amount} · Status: {bid.status}
                      </p>
                    </div>

                    {gig.status === "open" && bid.status === "pending" && (
                      <button
                        onClick={() => hireBid(bid._id)}
                        className="self-start sm:self-center
                                   rounded-lg bg-indigo-600 px-4 py-2
                                   text-sm font-medium text-white
                                   hover:bg-indigo-700 transition-colors"
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
