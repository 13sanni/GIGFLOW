import { createSlice, nanoid } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
    unreadCount: 0,
  },
  reducers: {
    addNotification: {
      reducer(state, action) {
        state.items.unshift(action.payload);
        state.unreadCount += 1;
      },
      prepare(notification) {
        return {
          payload: {
            id: nanoid(),
            read: false,
            createdAt: new Date().toISOString(),
            ...notification,
          },
        };
      },
    },

    markAllAsRead(state) {
      state.items.forEach((n) => (n.read = true));
      state.unreadCount = 0;
    },

    clearNotifications(state) {
      state.items = [];
      state.unreadCount = 0;
    },
  },
});

export const {
  addNotification,
  markAllAsRead,
  clearNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
