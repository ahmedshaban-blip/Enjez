// src/components/layout/Navbar.jsx
import { useEffect, useRef, useState, useMemo } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo2.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import { getAuth, signOut } from "firebase/auth";
import ClientNotificationsDropdown from "../common/client/NotificationsDropdown.jsx";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNotifications } from "../../hooks/useNotifications";
import useNotificationSoundListener from "../../hooks/useNotificationSoundListener";


export default function Navbar() {
  useNotificationSoundListener("user");

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
    user?.username ||
    (user?.email ? user.email.split("@")[0] : "User");


  const notificationsQuery = useMemo(() => {
    if (!user) return null;

    return query(
      collection(db, "notifications"),
      where("role", "==", "user"),
      where("userId", "==", user.uid)
    );
  }, [user]);

  const { notifications } = useNotifications(notificationsQuery);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );


  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 group">
          <img
            src={logo}
            alt="Enjez logo"
            className="h-14 w-auto object-contain cursor-pointer transition-transform duration-500 group-hover:scale-105 drop-shadow-sm"
            loading="lazy"
          />
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { to: "/home", label: "Home" },
            { to: "/services", label: "Services" },
            { to: "/how-it-works", label: "How It Works" },
            { to: "/about", label: "About" },
            { to: "/mybookings/:id", label: "My Bookings" },
            { to: "/contact", label: "Contact" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {!user && (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-xl text-slate-600 text-sm font-bold hover:text-blue-600 hover:bg-blue-50 transition-all"
              >
                Log In
              </Link>

              <Link
                to="/signup"
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-md hover:shadow-lg hover:bg-slate-800 transition-all transform hover:-translate-y-0.5"
              >
                Sign Up
              </Link>
            </div>
          )}

          {user && (
            <div className="flex items-center gap-4">
              <span className="hidden lg:inline text-sm text-slate-600 font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                Hi, <span className="text-slate-900 font-bold">{username}</span>
              </span>
              
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowNotifications((prev) => !prev)}
                  className={`h-11 w-11 rounded-full flex items-center justify-center transition-all duration-200 relative ${
                    showNotifications
                      ? "bg-blue-100 text-blue-600 ring-2 ring-blue-200"
                      : "bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:shadow-md"
                  }`}
                  aria-haspopup="true"
                  aria-expanded={showNotifications}
                  aria-label="Toggle notifications"
                >
                  <span className="material-symbols-outlined text-[22px]">notifications</span>

                  {unreadCount > 0 && (
                    <span
                      className="
                        absolute top-0 right-0
                        min-w-[18px] h-[18px] px-1
                        rounded-full bg-red-500 border-2 border-white
                        text-white text-[10px] font-bold leading-none
                        flex items-center justify-center
                        animate-pulse shadow-sm
                      "
                    >
                      {unreadCount}
                    </span>
                  )}
                </button>

                <ClientNotificationsDropdown
                  open={showNotifications}
                  onNavigate={() => setShowNotifications(false)}
                />
              </div>

              <button
                onClick={handleLogout}
                className="h-11 px-6 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 flex items-center justify-center hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}