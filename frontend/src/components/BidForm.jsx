import { useState } from "react";
import api from "../lib/Axios.jsx";

const BidForm = ({ gigId }) => {
  const [proposal, setProposal] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitBid = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
    await api.post("/bid", {
  gigId,
  proposal: proposal.trim(),
  amount: Number(amount),
});

      setMessage("Bid placed successfully");
      setProposal("");
      setAmount("");
    } catch (err) {
      if (err.response?.status === 409) {
        setMessage("You already placed a bid");
      } else {
        setMessage("Failed to place bid");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitBid}
      className="mt-6 space-y-5 max-w-xl fade-up"
    >
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Proposal
        </label>
        <textarea
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
          placeholder="Describe how you will approach this gig…"
          required
          rows={4}
          className="w-full rounded-xl border border-sky-200 bg-white/90 p-3.5
                     text-sm text-slate-800
                     focus:outline-none focus:ring-2 focus:ring-sky-500
                     resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Bid Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            ₹
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter your price"
            required
            className="w-full rounded-xl border border-sky-200 bg-white/90 p-3.5 pl-8
                       text-sm text-slate-800
                       focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      <button
        disabled={loading}
        className="button-brand inline-flex items-center justify-center rounded-xl px-5 py-2.5
                   text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting…" : "Place Bid"}
      </button>

      {message && (
        <p
          className={`text-sm ${
            message.includes("success")
              ? "text-green-700"
              : "text-red-700"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default BidForm;
