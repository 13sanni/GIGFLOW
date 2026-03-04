import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../lib/Axios.jsx";
import heroVisual from "../assets/hero-visual.svg";

const getStatusClass = (status) => {
  if (status === "accepted") return "bg-emerald-100 text-emerald-700";
  if (status === "rejected") return "bg-red-100 text-red-700";
  return "bg-amber-100 text-amber-700";
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading your bids...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <section className="surface rounded-[1.7rem] p-6 sm:p-8 fade-up">
          <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr] items-center">
            <div>
              <span className="brand-pill inline-flex rounded-full px-3 py-1 text-xs uppercase tracking-[0.14em]">
                Freelancer dashboard
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">My Bids</h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-[54ch]">
                Watch every proposal status in one place and jump into the related gig instantly.
              </p>
            </div>
            <img
              src={heroVisual}
              alt="Bid activity overview"
              className="w-full rounded-2xl border border-sky-100 shadow-md"
            />
          </div>
          {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
        </section>

        <section className="surface-solid rounded-2xl p-6 fade-up stagger-1">
          <h2 className="text-lg font-semibold text-slate-900">Bids Created by You</h2>

          {bids.length === 0 ? (
            <p className="mt-4 text-sm text-slate-600">
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
                  className="border border-sky-100 bg-sky-50/40 rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between gap-3"
                >
                  <div>
                    <p className="font-medium text-slate-900">{bid.gigTitle}</p>
                    <p className="text-sm text-slate-600 mt-1">Amount: Rs {bid.amount}</p>
                    <p className="text-xs text-slate-500 mt-2">
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
                      className="text-sm text-blue-700 hover:text-blue-800 font-medium"
                    >
                      View gig
                    </Link>
                  </div>
                </div>
              )})}
            </div>
          )}
        </section>

        <section className="surface-solid rounded-2xl p-6 fade-up stagger-2">
          <h2 className="text-lg font-semibold text-slate-900">Gigs You Have Bid On</h2>

          {biddedGigs.length === 0 ? (
            <p className="mt-4 text-sm text-slate-600">
              No bid activity found yet.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {biddedGigs.map((gig) => {
                const gigId = String(gig.gigId);

                return (
                <div
                  key={gigId}
                  className="border border-sky-100 bg-sky-50/40 rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between gap-3"
                >
                  <div>
                    <p className="font-medium text-slate-900">{gig.title}</p>
                    <p className="text-sm text-slate-600 mt-1">
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
                      className="text-sm text-blue-700 hover:text-blue-800 font-medium"
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
