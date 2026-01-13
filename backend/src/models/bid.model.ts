import mongoose, { Document, Schema } from "mongoose";
export interface Bid extends Document {

    proposal: string,
    amount: number,
    status: string,
    freelancer: mongoose.Schema.Types.ObjectId,
    gig: mongoose.Schema.Types.ObjectId,

}
const bidSchema = new Schema<Bid>({
    gig: { type: Schema.Types.ObjectId, ref: "Gig", required: true },
    proposal: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, default: "pending" },
    freelancer: {
        type: Schema.Types.ObjectId, ref: "User", required: true
    }
},
    { timestamps: true }
);

const Bid = mongoose.model<Bid>("Bid", bidSchema);
export default Bid