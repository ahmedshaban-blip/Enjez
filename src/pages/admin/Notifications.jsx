//src/pages/admin/Notifications.jsx
import { useMemo } from "react";
import NotificationsList from "../../components/common/notifications/NotificationsList.jsx";

import { useNotifications } from "../../hooks/useNotifications";
import {
  deleteNotification,
  markAllAsRead,
} from "../../config/notificationService.js";
import { db } from "../../config/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";

export default function Notifications() {
  const notificationsQuery = useMemo(() => {
    return query(
      collection(db, "notifications"),
      where("role", "==", "admin"),
      orderBy("createdAt", "desc")
    );
  }, []);

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
    <div className="max-w-5xl">
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
    </div>
  );
}
