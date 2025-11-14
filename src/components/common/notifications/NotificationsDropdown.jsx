// src/components/common/notifications/NotificationsDropdown.jsx

import { useMemo } from "react";
import { Link } from "react-router-dom";
import NotificationsList from "./NotificationsList.jsx";

import { useNotifications } from "../../../hooks/useNotifications";
import {
  deleteNotification,
  markAllAsRead,
} from "../../../config/notificationService.js";
import { db } from "../../../config/firebase";
import { collection, query, where, orderBy, limit } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";

export const mockNotifications = []; 

export default function NotificationsDropdown({
  open,
  onNavigate,
  allNotificationsPath = "/notifications",
}) {
  const { user } = useAuth();

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
    () => notifications.filter((notification) => !notification.read).length,
    [notifications]
  );

  if (!open) return null;

  const handleMarkAllRead = () => {
    if (!notifications.length) return;
    markAllAsRead(notifications);
  };

  const handleDelete = (id) => {
    deleteNotification(id);
  };

  return (
    <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-slate-200 bg-white shadow-xl p-4 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-gray-100">
            Notifications
          </p>
          <p className="text-xs text-slate-500 dark:text-gray-400">
            {loading
              ? "Loading..."
              : unreadCount
              ? `${unreadCount} unread`
              : "All caught up"}
          </p>
        </div>
        <button
          type="button"
          onClick={handleMarkAllRead}
          disabled={!unreadCount}
          className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition ${
            unreadCount
              ? "border-slate-200 text-blue-600 hover:text-blue-700 hover:border-blue-200 dark:border-gray-700"
              : "border-transparent text-slate-400 cursor-not-allowed dark:text-gray-500"
          }`}
        >
          <span className="flex items-center gap-0.5 text-blue-600">
            <span className="material-symbols-outlined text-base">done</span>
            <span className="material-symbols-outlined text-base">done</span>
          </span>
          <span>Mark all as read</span>
        </button>
      </div>

      {loading ? (
        <p className="mt-4 text-xs text-slate-500 dark:text-gray-400">
          Loading notifications...
        </p>
      ) : (
        <NotificationsList
          notifications={notifications}
          onDelete={handleDelete}
          compact
          className="mt-4 max-h-80 overflow-y-auto pr-1"
          emptyMessage="You have no notifications."
        />
      )}

      <Link
        to={allNotificationsPath}
        onClick={onNavigate}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        All Notifications
        <span className="material-symbols-outlined text-base">
          chevron_right
        </span>
      </Link>
    </div>
  );
}
