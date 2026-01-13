import { Link, useNavigate } from "react-router-dom";
import api from "../lib/Axios";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/login");
    } catch {
      alert("Logout failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-300 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/gigs"
          className="text-lg font-semibold text-gray-900 tracking-tight  bg-gray-400 rounded-2xl p-2"
        >
          GigFlow
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-5 text-sm">
          <Link
            to="/gigs"
            className="text-gray-700  bg-gray-400 rounded-2xl p-2 hover:text-indigo-600 transition-colors"
          >
            Gigs
          </Link>

          <Link
            to="/create-gig"
            className="text-gray-700 bg-gray-400 rounded-2xl p-2 hover:text-indigo-600 transition-colors"
          >
            Create Gig
          </Link>

          <button
            onClick={handleLogout}
            className=" px-3 py-1.5  bg-gray-400 rounded-2xl p-2
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
