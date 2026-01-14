import mongoose, { Document } from "mongoose";
export interface Gig extends Document {
    title: string;
    description: string;
    budget: number;
    status: string;
    owner: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const Gig: mongoose.Model<Gig, {}, {}, {}, mongoose.Document<unknown, {}, Gig, {}, mongoose.DefaultSchemaOptions> & Gig & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, Gig>;
export default Gig;
//# sourceMappingURL=gig.model.d.ts.map