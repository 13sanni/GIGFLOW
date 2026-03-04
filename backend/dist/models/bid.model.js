import mongoose, { Document, Schema } from "mongoose";
const bidSchema = new Schema({
    gig: { type: Schema.Types.ObjectId, ref: "Gig", required: true },
    proposal: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
        type: String,
        required: true,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    },
    freelancer: {
        type: Schema.Types.ObjectId, ref: "User", required: true
    }
}, { timestamps: true });
// Prevent duplicate bids for the same gig by the same freelancer.
bidSchema.index({ gig: 1, freelancer: 1 }, { unique: true });
bidSchema.index({ gig: 1, createdAt: -1 });
bidSchema.index({ gig: 1, status: 1 });
bidSchema.index({ freelancer: 1, createdAt: -1 });
const Bid = mongoose.model("Bid", bidSchema);
export default Bid;
//# sourceMappingURL=bid.model.js.map