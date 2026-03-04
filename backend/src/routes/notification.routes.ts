import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getMyNotifications,
  markNotificationAsRead
} from "../controllers/notification.controller.js";

const notificationRouter = Router();

notificationRouter.get("/", authMiddleware, getMyNotifications);
notificationRouter.patch(
  "/:notificationId/read",
  authMiddleware,
  markNotificationAsRead
);

export default notificationRouter;
