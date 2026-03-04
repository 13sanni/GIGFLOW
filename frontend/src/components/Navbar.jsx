import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import api from "../lib/Axios.jsx";
import NotificationDropdown from "./NotificationDropDown";
import { clearNotifications } from "../store/NotificationsSlice.jsx";
import logoMark from "../assets/logo-mark.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const unreadCount = useSelector(
    (state) => state.notifications.unreadCount
  );

  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await api.post("/auth/logout");
    dispatch(clearNotifications());
    navigate("/login");
  };

  return (
    <nav className="sticky top-3 z-50 px-3 sm:px-5">
      <div className="surface max-w-6xl mx-auto rounded-2xl py-3 px-4 sm:px-6 fade-up">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Link
            to="/gigs"
            className="inline-flex items-center gap-2.5 text-slate-900 tracking-tight"
          >
            <img
              src={logoMark}
              alt="GigFlow logo"
              className="h-9 w-9 rounded-xl shadow-sm"
            />
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.16em] text-slate-500">
                Freelance Hub
              </p>
              <p className="text-[1.05rem] font-bold leading-none">GigFlow</p>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-2.5 text-sm relative">
            <Link
              to="/gigs"
              className="brand-pill rounded-full px-3 py-1.5 hover:bg-sky-100/80 transition-colors"
            >
              Gigs
            </Link>

            <Link
              to="/create-gig"
              className="brand-pill rounded-full px-3 py-1.5 hover:bg-sky-100/80 transition-colors"
            >
              Create Gig
            </Link>

            <Link
              to="/my-gigs"
              className="brand-pill rounded-full px-3 py-1.5 hover:bg-sky-100/80 transition-colors"
            >
              My Gigs
            </Link>

            <Link
              to="/my-bids"
              className="brand-pill rounded-full px-3 py-1.5 hover:bg-sky-100/80 transition-colors"
            >
              My Bids
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowNotifications((prev) => !prev)}
                className="brand-pill rounded-full px-3 py-1.5 hover:bg-sky-100/80 transition-colors relative"
              >
                Notifications
                {unreadCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 min-w-[18px] h-[18px]
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
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
