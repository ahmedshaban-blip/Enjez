import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo2.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import { getAuth, signOut } from "firebase/auth";
import ClientNotificationsDropdown from "../common/client/NotificationsDropdown.jsx";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!showNotifications) return undefined;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  useEffect(() => {
    setShowNotifications(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const username =
    user?.displayName ||
    (user?.email ? user.email.split("@")[0] : "User");

  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Enjez logo"
            className="h-16 w-16 object-contain cursor-pointer transition-all duration-300 hover:scale-110"
            loading="lazy"
          />

          {/* 
          <span className="text-xl font-bold text-slate-900">Enjez</span> */}
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              `hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : ""
              }`
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/how-it-works"
            className={({ isActive }) =>
              `hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : ""
              }`
            }
          >
            How It Works
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : ""
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/mybookings/:id"
            className={({ isActive }) =>
              `hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : ""
              }`
            }
          >
            My Bookings
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : ""
              }`
            }
          >
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          {!user && (
            <>
              <Link
                to="/login"
                className="h-10 px-5 rounded-full border border-blue-600 text-blue-600 text-sm font-medium flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                Log In
              </Link>

              <Link
                to="/signup"
                className="h-10 px-5 rounded-full bg-blue-600 text-white text-sm font-medium flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}

          {user && (
            <>
              <span className="hidden sm:inline text-sm text-slate-700">
                Welcome, <span className="font-semibold">{username}</span>
              </span>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowNotifications((prev) => !prev)}
                  className={`h-10 w-10 rounded-full border flex items-center justify-center transition ${
                    showNotifications
                      ? "border-blue-200 text-blue-600 bg-blue-50"
                      : "border-slate-300 text-slate-500 hover:text-blue-600 hover:border-blue-300"
                  }`}
                  aria-haspopup="true"
                  aria-expanded={showNotifications}
                  aria-label="Toggle notifications"
                >
                  <span className="material-symbols-outlined text-xl">notifications</span>
                </button>
                <ClientNotificationsDropdown
                  open={showNotifications}
                  onNavigate={() => setShowNotifications(false)}
                />
              </div>
              <button
                onClick={handleLogout}
                className="h-10 px-5 rounded-full border border-slate-300 text-sm font-medium text-slate-700 flex items-center justify-center hover:bg-slate-100 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
