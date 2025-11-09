/* Client notifications page */
import { useMemo, useState } from "react";
import Navbar from "../../components/layout/Navbar.jsx";
import NotificationsList from "../../components/common/notifications/NotificationsList.jsx";
import { mockNotifications } from "../../components/common/notifications/NotificationsDropdown.jsx";

export default function ClientNotifications() {
  const [notifications, setNotifications] = useState(() =>
    mockNotifications.map((item) => ({ ...item }))
  );

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications]
  );

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <div className="bg-white dark:bg-background-dark min-h-screen flex flex-col text-slate-900 dark:text-gray-100">
      <Navbar />
      <main className="w-full max-w-4xl mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-slate-500 dark:text-gray-400 mt-2">
                You have {unreadCount} unread notifications
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleMarkAllRead}
            disabled={!unreadCount}
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition ${
              unreadCount
                ? "border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-200 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-400"
                : "border-slate-100 text-slate-400 cursor-not-allowed dark:border-gray-800 dark:text-gray-500"
            }`}
          >
            <span className="flex items-center gap-1 text-blue-600">
              <span className="material-symbols-outlined text-base">done</span>
              <span className="material-symbols-outlined text-base">done</span>
            </span>
            Mark all as read
          </button>
        </header>

        <section className="mt-8">
          <NotificationsList
            notifications={notifications}
            onDelete={handleDelete}
            emptyMessage="You are all caught up. New notifications will appear here."
          />
        </section>
      </main>
    </div>
  );
}
