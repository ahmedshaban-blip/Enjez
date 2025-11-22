// src/pages/client/Notifications.jsx
import { useMemo } from "react";
import Navbar from "../../components/layout/Navbar.jsx";
import NotificationsList from "../../components/common/notifications/NotificationsList.jsx";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import { useNotifications } from "../../hooks/useNotifications";
import {
  deleteNotification,
  markAllAsRead,
} from "../../config/notificationService.js";
import { db } from "../../config/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { Bell, CheckCheck, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export default function ClientNotifications() {
  const { user, authLoading } = useAuth();

  // --- Loading State ---
  if (authLoading) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center">
          <LoadingSpinner />
          <p className="mt-4 text-slate-500 font-medium animate-pulse">Syncing...</p>
        </main>
      </div>
    );
  }

  // --- No User State ---
  if (!user) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center max-w-md w-full">
             <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <LogIn className="w-8 h-8 text-blue-600" />
             </div>
             <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Restricted</h2>
             <p className="text-slate-500 mb-8">
               Please log in to view your notifications and updates.
             </p>
             <Link 
               to="/login"
               className="block w-full py-3 px-6 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
             >
               Log In Now
             </Link>
          </div>
        </main>
      </div>
    );
  }

  // --- Main Content Logic ---
  const notificationsQuery = useMemo(() => {
    return query(
      collection(db, "notifications"),
      where("role", "==", "user"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
  }, [user.uid]);

  const { notifications, loading } = useNotifications(notificationsQuery);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications]
  );

  const handleMarkAllRead = () => {
    markAllAsRead(notifications);
  };

  const handleDelete = (id) => {
    deleteNotification(id);
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans text-slate-900">
      <Navbar />
      
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Header Section */}
        <div className="flex items-end justify-between mb-8">
          <div>
             <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <Bell className="w-6 h-6 text-blue-600" />
                </div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">
                    Notifications
                </h1>
             </div>
             <p className="text-slate-500 font-medium pl-1">
                Stay updated with your latest activities.
             </p>
          </div>

          {/* Mark All Read Button */}
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="group flex items-center gap-2 px-4 py-2 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <CheckCheck className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              <span className="text-sm font-bold text-slate-600 group-hover:text-blue-700 transition-colors">
                Mark all read
              </span>
            </button>
          )}
        </div>

        {/* Notifications List Container */}
        <section className="relative">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <LoadingSpinner />
              <p className="mt-4 text-slate-400 font-medium text-sm">Loading updates...</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
              
              <NotificationsList
                notifications={notifications}
                onDelete={handleDelete}
                emptyMessage="You are all caught up. New notifications will appear here."
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}