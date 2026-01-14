import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "./NotificationsSlice";

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
  },
});
