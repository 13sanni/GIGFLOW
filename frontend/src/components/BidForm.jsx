import { useState } from "react";
import api from "../lib/Axios.JSX";

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
        proposal,
        amount,
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
      className="mt-6 space-y-5 max-w-xl"
    >
      {/* Proposal */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Proposal
        </label>
        <textarea
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
          placeholder="Describe how you will approach this gig…"
          required
          rows={4}
          className="w-full rounded-lg border border-gray-300 p-3
                     text-sm text-gray-800
                     focus:outline-none focus:ring-2 focus:ring-indigo-500
                     resize-none"
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bid Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            ₹
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter your price"
            required
            className="w-full rounded-lg border border-gray-300 p-3 pl-8
                       text-sm text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        disabled={loading}
        className="inline-flex items-center justify-center
                   rounded-lg bg-indigo-600 px-5 py-2.5
                   text-sm font-medium text-white
                   hover:bg-indigo-700
                   disabled:opacity-60 disabled:cursor-not-allowed
                   transition-colors"
      >
        {loading ? "Submitting…" : "Place Bid"}
      </button>

      {/* Message */}
      {message && (
        <p
          className={`text-sm ${
            message.includes("success")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default BidForm;
