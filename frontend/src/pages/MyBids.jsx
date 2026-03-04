import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../lib/Axios.jsx";

const getStatusClass = (status) => {
  if (status === "accepted") return "bg-green-100 text-green-700";
  if (status === "rejected") return "bg-red-100 text-red-700";
  return "bg-yellow-100 text-yellow-700";
};

const MyBids = () => {
  const navigate = useNavigate();
  const [bids, setBids] = useState([]);
  const [biddedGigs, setBiddedGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [myBidsRes, biddedGigsRes] = await Promise.all([
          api.get("/bid/my-bids"),
          api.get("/users/bidded-gigs"),
        ]);

        setBids(myBidsRes.data.bids || []);
        setBiddedGigs(biddedGigsRes.data.gigs || []);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
          return;
        }

        setError("Failed to load your bid activity");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading your bids...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">My Bids</h1>
          <p className="mt-1 text-sm text-gray-600">
            Track all bids you have submitted and their current status.
          </p>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>

        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900">Bids Created by You</h2>

          {bids.length === 0 ? (
            <p className="mt-4 text-sm text-gray-600">
              You have not submitted any bids yet.
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              {bids.map((bid) => {
                const bidId = String(bid.bidId);
                const gigId = String(bid.gigId);

                return (
                <div
                  key={bidId}
                  className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between gap-3"
                >
                  <div>
                    <p className="font-medium text-gray-900">{bid.gigTitle}</p>
                    <p className="text-sm text-gray-600 mt-1">Amount: Rs {bid.amount}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Submitted: {new Date(bid.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                        bid.status
                      )}`}
                    >
                      {bid.status}
                    </span>
                    <Link
                      to={`/gig/${gigId}`}
                      className="text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      View gig
                    </Link>
                  </div>
                </div>
              )})}
            </div>
          )}
        </section>

        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900">Gigs You Have Bid On</h2>

          {biddedGigs.length === 0 ? (
            <p className="mt-4 text-sm text-gray-600">
              No bid activity found yet.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {biddedGigs.map((gig) => {
                const gigId = String(gig.gigId);

                return (
                <div
                  key={gigId}
                  className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between gap-3"
                >
                  <div>
                    <p className="font-medium text-gray-900">{gig.title}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      My Bid: Rs {gig.myBidAmount}
                    </p>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                        gig.bidStatus
                      )}`}
                    >
                      {gig.bidStatus}
                    </span>
                    <Link
                      to={`/gig/${gigId}`}
                      className="text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      Open gig
                    </Link>
                  </div>
                </div>
              )})}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyBids;
