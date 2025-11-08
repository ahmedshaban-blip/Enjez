/* Shared notifications dropdown */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import NotificationsList from "./NotificationsList.jsx";

export const mockNotifications = [
  {
    id: "1",
    title: "Booking confirmed",
    message: "Your booking for Deep Home Cleaning was confirmed.",
    time: "2h ago",
    read: false,
    icon: "event_available",
  },
  {
    id: "2",
    title: "New review",
    message: "Emily Carter left a 5-star review on Premium Spa Treatment.",
    time: "5h ago",
    read: false,
    icon: "star",
  },
  {
    id: "3",
    title: "Reminder",
    message: "Remember to rate your last booking with Mike Ross.",
    time: "1d ago",
    read: true,
    icon: "notifications",
  },
  {
    id: "4",
    title: "Payment processed",
    message: "Your payment for Deep Cleaning has been processed.",
    time: "3d ago",
    read: true,
    icon: "credit_score",
  },
  {
    id: "5",
    title: "Limited offer",
    message: "Get 15% off gardening services this week.",
    time: "5d ago",
    read: false,
    icon: "local_offer",
  },
  {
    id: "6",
    title: "Profile tip",
    message: "Add a phone number to receive SMS updates.",
    time: "1w ago",
    read: true,
    icon: "call",
  },
];

export default function NotificationsDropdown({
  open,
  onNavigate,
  allNotificationsPath = "/notifications",
}) {
  const [notifications, setNotifications] = useState(() =>
    mockNotifications.map((item) => ({ ...item }))
  );

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications]
  );

  if (!open) return null;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })));
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-slate-200 bg-white shadow-xl p-4 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-gray-100">Notifications</p>
          <p className="text-xs text-slate-500 dark:text-gray-400">
            {unreadCount ? `${unreadCount} unread` : "All caught up"}
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

      <NotificationsList
        notifications={notifications}
        onDelete={handleDelete}
        compact
        className="mt-4 max-h-80 overflow-y-auto pr-1"
        emptyMessage="You have no notifications."
      />

      <Link
        to={allNotificationsPath}
        onClick={onNavigate}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        All Notifications
        <span className="material-symbols-outlined text-base">chevron_right</span>
      </Link>
    </div>
  );
}
