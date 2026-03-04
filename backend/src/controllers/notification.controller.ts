import type { Request, Response } from "express";
import mongoose from "mongoose";

import Notification from "../models/notification.model.js";
import { AppError } from "../utils/appError.js";
import { mapNotificationDto } from "../services/notification.service.js";

export const getMyNotifications = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;

  const notifications = await Notification.find({ receiverId: userId })
    .sort({ createdAt: -1 })
    .limit(100);

  return res.status(200).json({
    success: true,
    notifications: notifications.map(mapNotificationDto),
  });
};

export const markNotificationAsRead = async (
  req: Request,
  res: Response
) => {
  const userId = (req as any).user.userId;
  const { notificationId } = req.params;

  if (!mongoose.isValidObjectId(notificationId)) {
    throw new AppError("invalid notification id", 400);
  }

  const notification = await Notification.findById(notificationId);

  if (!notification) {
    throw new AppError("notification not found", 404);
  }

  if (notification.receiverId.toString() !== userId) {
    throw new AppError("notification not found", 404);
  }

  notification.isRead = true;
  await notification.save();

  return res.status(200).json({
    success: true,
    notification: mapNotificationDto(notification),
  });
};
