import mongoose, { Document } from "mongoose";
export type NotificationType = "BID_PLACED" | "BID_ACCEPTED";
export interface Notification extends Document {
    type: NotificationType;
    gigId: mongoose.Types.ObjectId;
    bidId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    message: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const Notification: mongoose.Model<Notification, {}, {}, {}, mongoose.Document<unknown, {}, Notification, {}, mongoose.DefaultSchemaOptions> & Notification & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, Notification>;
export default Notification;
//# sourceMappingURL=notification.model.d.ts.map