import mongoose, { Document } from "mongoose";
export interface User extends Document {
    name: string;
    email: string;
    password: string;
}
declare const User: mongoose.Model<User, {}, {}, {}, mongoose.Document<unknown, {}, User, {}, mongoose.DefaultSchemaOptions> & User & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, User>;
export default User;
//# sourceMappingURL=user.model.d.ts.map