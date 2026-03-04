import mongoose, { Document, Schema } from "mongoose";

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

const notificationSchema = new Schema<Notification>(
  {
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
  },
  { timestamps: true }
);

notificationSchema.index({ receiverId: 1, createdAt: -1 });
notificationSchema.index({ receiverId: 1, isRead: 1, createdAt: -1 });

const Notification = mongoose.model<Notification>(
  "Notification",
  notificationSchema
);

export default Notification;
