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

export default function ClientNotifications() {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="bg-white dark:bg-background-dark min-h-screen flex flex-col text-slate-900 dark:text-gray-100">
        <Navbar />
        <main className="w-full max-w-4xl mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-center text-sm text-slate-600 dark:text-gray-300">
            Loading...
          </p>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white dark:bg-background-dark min-h-screen flex flex-col text-slate-900 dark:text-gray-100">
        <Navbar />
        <main className="w-full max-w-4xl mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-center text-sm text-slate-600 dark:text-gray-300">
            Please log in to view your notifications.
          </p>
        </main>
      </div>
    );
  }

  const notificationsQuery = useMemo(() => {
    return query(
      collection(db, "notifications"),
      where("role", "==", "user"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
  }, [user.uid]);

  const { notifications, loading } = useNotifications(notificationsQuery);
  console.log("user uid:", user.uid);
  console.log("notifications:", notifications);

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
    <div className="bg-white dark:bg-background-dark min-h-screen flex flex-col text-slate-900 dark:text-gray-100">
      <Navbar />
      <main className="w-full max-w-4xl mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-10">
        <header className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Your Notifications</h1>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              Mark all as read
            </button>
          )}
        </header>

        <section className="mt-8">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <LoadingSpinner />
            </div>
          ) : (
            <NotificationsList
              notifications={notifications}
              onDelete={handleDelete}
              emptyMessage="You are all caught up. New notifications will appear here."
            />
          )}
        </section>
      </main>
    </div>
  );
}
