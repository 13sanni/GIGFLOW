import mongoose, { Document } from "mongoose";
export interface Bid extends Document {
    proposal: string;
    amount: number;
    status: string;
    freelancer: mongoose.Schema.Types.ObjectId;
    gig: mongoose.Schema.Types.ObjectId;
}
declare const Bid: mongoose.Model<Bid, {}, {}, {}, mongoose.Document<unknown, {}, Bid, {}, mongoose.DefaultSchemaOptions> & Bid & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, Bid>;
export default Bid;
//# sourceMappingURL=bid.model.d.ts.map