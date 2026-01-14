import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import api from "../lib/Axios.jsx";
import NotificationDropdown from "./NotificationDropDown";

const Navbar = () => {
  const navigate = useNavigate();
  const unreadCount = useSelector(
    (state) => state.notifications.unreadCount
  );

  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await api.post("/auth/logout");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        
        <Link
          to="/gigs"
          className="text-lg font-semibold text-gray-900 tracking-tight"
        >
          GigFlow
        </Link>

        <div className="flex items-center gap-5 text-sm relative">
          <Link
            to="/gigs"
            className="text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Gigs
          </Link>

          <Link
            to="/create-gig"
            className="text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Create Gig
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              className="relative text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Notifications
              {unreadCount > 0 && (
                <span
                  className="absolute -top-2 -right-3 min-w-[18px] h-[18px]
                             rounded-full bg-red-600 text-white
                             text-[11px] font-medium
                             flex items-center justify-center px-1"
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <NotificationDropdown
                onClose={() => setShowNotifications(false)}
              />
            )}
          </div>

       
          <button
            onClick={handleLogout}
            className="rounded-md px-3 py-1.5
                       text-sm font-medium text-red-600
                       hover:bg-red-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
