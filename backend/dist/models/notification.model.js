import mongoose, { Document, Schema } from "mongoose";
const notificationSchema = new Schema({
    type: {
        type: String,
        enum: ["BID_PLACED", "BID_ACCEPTED"],
        required: true,
    },
    gigId: { type: Schema.Types.ObjectId, ref: "Gig", required: true },
    bidId: { type: Schema.Types.ObjectId, ref: "Bid", required: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true, trim: true },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });
notificationSchema.index({ receiverId: 1, createdAt: -1 });
const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
//# sourceMappingURL=notification.model.js.map