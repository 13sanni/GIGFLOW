import mongoose, { Document, Schema } from "mongoose";
const gigSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: Number, required: true },
    status: { type: String, required: true, default: "open" },
    owner: {
        type: Schema.Types.ObjectId, ref: "User", required: true
    }
}, { timestamps: true });
const Gig = mongoose.model("Gig", gigSchema);
export default Gig;
//# sourceMappingURL=gig.model.js.map