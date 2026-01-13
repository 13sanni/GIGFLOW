import mongoose, { Document, Schema } from "mongoose";
export interface Gig extends Document {
    title: string,
    description: string,
    budget: number,
    status: string,
    owner: mongoose.Schema.Types.ObjectId,

}
const gigSchema = new Schema<Gig>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: Number, required: true },
    status: { type: String, required: true, default: "open" },
    owner: {
        type: Schema.Types.ObjectId, ref: "User", required: true
    }
},
    { timestamps: true }
);

const Gig = mongoose.model<Gig>("Gig", gigSchema);
export default Gig