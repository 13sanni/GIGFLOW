import { type NotificationType } from "../models/notification.model.js";
interface NotificationPayload {
    type: NotificationType;
    gigId: string;
    bidId: string;
    senderId: string;
    receiverId: string;
    message: string;
}
export declare const mapNotificationDto: (notification: any) => {
    id: any;
    type: any;
    gigId: any;
    bidId: any;
    senderId: any;
    receiverId: any;
    message: any;
    isRead: any;
    createdAt: any;
};
export declare const createNotification: (payload: NotificationPayload) => Promise<import("mongoose").Document<unknown, {}, import("../models/notification.model.js").Notification, {}, import("mongoose").DefaultSchemaOptions> & import("../models/notification.model.js").Notification & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const createAndEmitNotification: (payload: NotificationPayload) => Promise<import("mongoose").Document<unknown, {}, import("../models/notification.model.js").Notification, {}, import("mongoose").DefaultSchemaOptions> & import("../models/notification.model.js").Notification & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export {};
//# sourceMappingURL=notification.service.d.ts.map