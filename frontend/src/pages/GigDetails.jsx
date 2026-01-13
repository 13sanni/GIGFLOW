import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import BidForm from "../components/BidForm.jsx";
import api from "../lib/Axios.jsx";

const GigDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await api.get(`/gig/gigs/${id}`);
        setGig(res.data.gig);
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

    fetchGig();
  }, [id, navigate]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Back link */}
        <Link
          to="/gigs"
          className="text-sm text-gray-600 hover:text-indigo-600"
        >
          ← Back to gigs
        </Link>

        {/* Gig Card */}
        <div className="mt-4 bg-white border border-gray-200 rounded-xl p-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            {gig.title}
          </h1>

          <p className="mt-3 text-gray-600 leading-relaxed">
            {gig.description}
          </p>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-lg font-semibold text-indigo-600">
              ₹ {gig.budget}
            </span>

            <span
              className={`text-sm px-3 py-1 rounded-full ${
                gig.status === "open"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {gig.status}
            </span>
          </div>
        </div>

        {/* Action Section */}
        {gig.status === "open" && (
          <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-medium text-gray-900">
              Submit a Bid
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Place your proposal for this gig
            </p>

            
            <div className="mt-4">
              <BidForm gigId={gig._id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GigDetail;
