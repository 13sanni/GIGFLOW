import { createSlice } from "@reduxjs/toolkit";

const countUnread = (items) =>
  items.reduce((total, item) => total + (item.isRead ? 0 : 1), 0);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
    unreadCount: 0,
  },
  reducers: {
    setNotifications(state, action) {
      state.items = action.payload;
      state.unreadCount = countUnread(state.items);
    },

    addNotification(state, action) {
      const incoming = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.id === incoming.id
      );

      if (existingIndex === -1) {
        state.items.unshift(incoming);
      } else {
        state.items[existingIndex] = incoming;
      }

      state.unreadCount = countUnread(state.items);
    },

    markNotificationRead(state, action) {
      const notificationId = action.payload;
      const target = state.items.find((item) => item.id === notificationId);

      if (target) {
        target.isRead = true;
      }

      state.unreadCount = countUnread(state.items);
    },

    clearNotifications(state) {
      state.items = [];
      state.unreadCount = 0;
    },
  },
});

export const {
  addNotification,
  clearNotifications,
  markNotificationRead,
  setNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
