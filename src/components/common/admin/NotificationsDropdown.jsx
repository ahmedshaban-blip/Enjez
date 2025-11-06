import { Link } from "react-router-dom";
import { useMemo } from "react";

/* TODO: Replace mock notifications with real data */
const mockNotifications = [
  {
    id: "1",
    title: "Booking Confirmed",
    message: "Deep Home Cleaning booked for Nov 15 at 9:00 AM.",
    time: "2h ago",
    unread: true,
    icon: "calendar_add_on",
  },
  {
    id: "2",
    title: "New Review Received",
    message: "Emily Carter rated Hot Stone Massage 5 stars.",
    time: "5h ago",
    unread: false,
    icon: "star",
  },
  {
    id: "3",
    title: "Provider Assigned",
    message: "Mike Ross assigned to Premium Gardening.",
    time: "1 day ago",
    unread: false,
    icon: "group",
  },
  {
    id: "4",
    title: "Payout Ready",
    message: "Weekly payout summary is available for review.",
    time: "3 days ago",
    unread: false,
    icon: "account_balance",
  },
];

export default function NotificationsDropdown({ open }) {
  const unreadCount = useMemo(
    () => mockNotifications.filter((item) => item.unread).length,
    []
  );

  if (!open) return null;

  return (
    <div className="absolute right-0 top-12 w-80 rounded-xl border border-slate-200 bg-white shadow-xl p-4 z-50">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Notifications
          </p>
          <p className="text-xs text-slate-500">
            {unreadCount} unread
          </p>
        </div>
        <button
          type="button"
          className="text-xs font-medium text-blue-600 hover:text-blue-700 transition"
        >
          Mark all as read {"\u2705\u2705"}
        </button>
      </div>

      {/* List */}
      <div className="mt-4 flex flex-col gap-2 max-h-96 overflow-y-auto pr-1">
        {mockNotifications.map((notification) => {
          const baseClasses =
            "flex items-start gap-3 rounded-lg border px-3 py-2 transition hover:border-blue-200 hover:bg-blue-50/60";
          const stateClasses = notification.unread
            ? "bg-blue-50 border-blue-100"
            : "bg-white border-slate-200";

          return (
            <div
              key={notification.id}
              className={`${baseClasses} ${stateClasses}`}
            >
              <span className="material-symbols-outlined text-blue-600 text-xl shrink-0">
                {notification.icon}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">
                  {notification.title}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {notification.message}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {notification.time}
                </p>
              </div>
              <button
                type="button"
                className="text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined text-base">
                  delete
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <Link
        to="/admin/notifications"
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        All Notifications
        <span className="material-symbols-outlined text-base">chevron_right</span>
      </Link>
    </div>
  );
}
