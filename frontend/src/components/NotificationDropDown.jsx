import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { markAllAsRead } from "../store/NotificationsSlice.jsx";

const NotificationDropdown = ({ onClose }) => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notifications.items
  );

  // Mark all as read once when dropdown opens
  useEffect(() => {
    dispatch(markAllAsRead());
  }, [dispatch]);

  return (
    <div
      className="absolute right-0 mt-2 w-80
                 bg-white border border-gray-200
                 rounded-xl shadow-lg
                 max-h-96 overflow-y-auto z-50"
    >
     
      <div className="px-4 py-3 border-b text-sm font-medium text-gray-900">
        Notifications
      </div>

      {notifications.length === 0 ? (
        <div className="px-4 py-6 text-sm text-gray-500 text-center">
          No notifications
        </div>
      ) : (
        notifications.map((n) => (
          <div
            key={n.id}
            className="px-4 py-3 text-sm
                       hover:bg-gray-50 transition-colors
                       border-b last:border-b-0"
          >
            <p className="text-gray-800">{n.message}</p>
            <p className="mt-1 text-xs text-gray-500">
              {new Date(n.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationDropdown;
