import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import api from "../lib/Axios.jsx";
import { markNotificationRead } from "../store/NotificationsSlice.jsx";

const getNotificationPath = (notification) => {
  if (!notification.gigId) {
    return "/gigs";
  }

  if (notification.type === "BID_PLACED") {
    return `/gig/${notification.gigId}/bids`;
  }

  return `/gig/${notification.gigId}`;
};

const NotificationDropdown = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useSelector((state) => state.notifications.items);

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      try {
        await api.patch(`/notifications/${notification.id}/read`);
      } catch {
        // Keep navigation usable even if read-state update fails.
      }

      dispatch(markNotificationRead(notification.id));
    }

    navigate(getNotificationPath(notification));
    onClose?.();
  };

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
        notifications.map((notification) => (
          <button
            type="button"
            key={notification.id}
            onClick={() => handleNotificationClick(notification)}
            className={`w-full text-left px-4 py-3 text-sm
                       hover:bg-gray-50 transition-colors
                       border-b last:border-b-0 ${
                         notification.isRead ? "bg-white" : "bg-indigo-50/40"
                       }`}
          >
            <p className="text-gray-800">{notification.message}</p>
            <p className="mt-1 text-xs text-gray-500">
              {new Date(notification.createdAt).toLocaleString()}
            </p>
          </button>
        ))
      )}
    </div>
  );
};

export default NotificationDropdown;
