import mongoose, { Document, Schema } from "mongoose";
const bidSchema = new Schema({
    gig: { type: Schema.Types.ObjectId, ref: "Gig", required: true },
    proposal: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, default: "pending" },
    freelancer: {
        type: Schema.Types.ObjectId, ref: "User", required: true
    }
}, { timestamps: true });
const Bid = mongoose.model("Bid", bidSchema);
export default Bid;
//# sourceMappingURL=bid.model.js.map