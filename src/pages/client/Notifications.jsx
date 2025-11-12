import { useMemo } from "react";
import Navbar from "../../components/layout/Navbar.jsx";
import NotificationsList from "../../components/common/notifications/NotificationsList.jsx";

import { useNotifications } from "../../hooks/useNotifications";
import {
  deleteNotification,
  markAllAsRead,
} from "../../config/notificationService.js";
import { db } from "../../config/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

export default function ClientNotifications() {
  const { currentUser } = useAuth();

  const notificationsQuery = useMemo(() => {
    if (!currentUser) return null;
    return query(
      collection(db, "notifications"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );
  }, [currentUser]);

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
    <div className="bg-white dark:bg-background-dark min-h-screen flex flex-col text-slate-900 dark:text-gray-100">
      <Navbar />
      <main className="w-full max-w-4xl mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-10">
        <header></header>

        <section className="mt-8">
          {loading ? (
            <p>Loading notifications...</p>
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
