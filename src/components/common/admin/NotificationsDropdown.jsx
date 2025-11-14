// src/components/common/admin/NotificationsDropdown.jsx
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useNotifications } from "../../../hooks/useNotifications";
import NotificationsList from "../notifications/NotificationsList.jsx";

export default function AdminNotificationsDropdown({
  open,
  onNavigate,
  allNotificationsPath = "/admin/notifications",
}) {
  const baseQuery = useMemo(() => {
    return query(
      collection(db, "notifications"),
      where("role", "==", "admin"),
      orderBy("createdAt", "desc"),
      limit(10)
    );
  }, []);

  const { notifications, loading } = useNotifications(baseQuery);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  if (!open) return null;

  const hasNotifications = notifications.length > 0;

  return (
    <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-slate-200 bg-white shadow-xl p-4 dark:bg-gray-900 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-gray-100">
            Admin notifications
          </p>
          <p className="text-xs text-slate-500 dark:text-gray-400">
            {loading
              ? "Loading..."
              : unreadCount
              ? `${unreadCount} unread`
              : "All caught up"}
          </p>
        </div>
      </div>

      {/* List */}
      <div className="mt-4 max-h-80 overflow-y-auto pr-1">
        {loading ? (
          <p className="py-4 text-xs text-slate-500">Loading...</p>
        ) : hasNotifications ? (
          <NotificationsList
            notifications={notifications}
            compact
            className=""
            emptyMessage="No notifications for admin."
          />
        ) : (
          <p className="py-4 text-xs text-slate-500">
            No notifications for admin.
          </p>
        )}
      </div>

      {/* Footer link */}
      <Link
        to={allNotificationsPath}
        onClick={onNavigate}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        All notifications
        <span className="material-symbols-outlined text-base">
          chevron_right
        </span>
      </Link>
    </div>
  );
}
