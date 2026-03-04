import Notification, {} from "../models/notification.model.js";
import { getIO } from "../socket/socketStore.js";
export const mapNotificationDto = (notification) => ({
    id: notification._id.toString(),
    type: notification.type,
    gigId: notification.gigId.toString(),
    bidId: notification.bidId.toString(),
    senderId: notification.senderId.toString(),
    receiverId: notification.receiverId.toString(),
    message: notification.message,
    isRead: notification.isRead,
    createdAt: notification.createdAt,
});
export const createNotification = async (payload) => {
    const notification = await Notification.create({
        type: payload.type,
        gigId: payload.gigId,
        bidId: payload.bidId,
        senderId: payload.senderId,
        receiverId: payload.receiverId,
        message: payload.message,
        isRead: false,
    });
    return notification;
};
export const createAndEmitNotification = async (payload) => {
    const notification = await createNotification(payload);
    const io = getIO();
    io.to(`user:${notification.receiverId.toString()}`).emit("notification:new", mapNotificationDto(notification));
    return notification;
};
//# sourceMappingURL=notification.service.js.map