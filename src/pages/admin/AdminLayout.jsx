// src/pages/admin/AdminLayout.jsx
import { useEffect, useRef, useState, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../../components/layout/AdminSidebar.jsx";
import NotificationsDropdown from "../../components/common/admin/NotificationsDropdown.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import useNewBookingNotifier from "../../hooks/useNewBookingNotifier.ts";
import useNotificationSoundListener from "../../hooks/useNotificationSoundListener.js";

import { collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNotifications } from "../../hooks/useNotifications";

export default function AdminLayout() {
  useNotificationSoundListener("admin");
  useNewBookingNotifier();

  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  const { user, currentUser } = useAuth();
  const activeUser = user || currentUser;

  const username =
    activeUser?.displayName ||
    (activeUser?.email ? activeUser.email.split("@")[0] : "Admin");

  const adminNotificationsQuery = useMemo(() => {
    return query(
      collection(db, "notifications"),
      where("role", "==", "admin"),
      orderBy("createdAt", "desc")
    );
  }, []);

  const { notifications: adminNotifications } = useNotifications(
    adminNotificationsQuery
  );

  const unreadCount = useMemo(
    () => adminNotifications.filter((n) => !n.read).length,
    [adminNotifications]
  );

  useEffect(() => {
    const handleClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [showNotifications]);

  useEffect(() => {
    setShowNotifications(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar component */}
      <AdminSidebar />

      {/* Right side */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Topbar */}
        {location.pathname === "/admin" && (
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
            <h2 className="text-xl font-bold text-slate-900">Dashboard</h2>

            <div className="flex items-center gap-4 flex-1 justify-end">
              {/* Search */}
              <label className="relative min-w-40 max-w-xs w-full">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full h-10 rounded-lg bg-slate-50 border border-slate-200 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </label>

              {/* Notifications + badge */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowNotifications((prev) => !prev)}
                  className="h-10 w-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 transition"
                  aria-haspopup="true"
                  aria-expanded={showNotifications}
                >
                  <span className="material-symbols-outlined text-xl">
                    notifications
                  </span>
                </button>

                {unreadCount > 0 && (
                  <span
                    className="
        absolute -top-1 -right-1
        min-w-[18px] h-[18px] px-1
        rounded-full bg-red-500
        text-white text-[10px] leading-none
        flex items-center justify-center
      "
                  >
                    {unreadCount}
                  </span>
                )}

                <NotificationsDropdown open={showNotifications} />
              </div>


              {/* User info */}
              <div className="flex items-center gap-3">
                <div
                  className="size-10 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC38BCuL2rtXnsjqKp0NDCi9TNvLBNpy2ktW8i31C2v_po_7UWQjScjNk2A4EPG9WaANP_dR654e3ESrl1xvYyCPhUMyV7ovjHwqaqszmNwHhhewrqdOZIQhmLhzJt_BAKngPTrdF9bpAzTqkPgh3nGaryQvfRwzkbuOsE7uLF5mQnsOztAwxOgdXyOp06EiFL4LRSKpU-H0AHm6dh31a1yzueuMXRGW6I6OYKYLYvBx6GGZFttD_qMeXRCb7K6MD6c0CFAwI7JANJj")',
                  }}
                />
                <div className="hidden md:flex flex-col">
                  <span className="text-sm font-medium text-slate-900">
                    {username}
                  </span>
                  <span className="text-xs text-slate-500">
                    {activeUser?.email || "Administrator"}
                  </span>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Page content */}
        <main className="flex-1 p-8 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
