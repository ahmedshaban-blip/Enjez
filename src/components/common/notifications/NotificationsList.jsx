//src/pages/admin/Notifications.jsx

/* Shared notifications list */
export function NotificationCard({
  notification,
  onDelete,
  onBookingSeen,   
  compact = false,
}) {
  const stateClasses = notification.read
    ? "bg-white border-slate-200 dark:bg-background-dark dark:border-gray-800"
    : "bg-blue-50 border-blue-100 dark:bg-blue-950/30 dark:border-blue-900";

  const containerClasses = compact
    ? "flex items-start gap-3 rounded-xl border px-3 py-2 transition hover:border-blue-200 hover:bg-blue-50/70 dark:hover:border-blue-500/40 dark:hover:bg-blue-950/50"
    : "flex flex-col gap-3 rounded-2xl border px-5 py-4 shadow-sm transition hover:border-blue-200 hover:bg-blue-50/40 dark:hover:border-blue-500/40 dark:hover:bg-blue-950/30";

  const iconWrapperClasses = compact
    ? "size-10 text-base"
    : "size-12 text-2xl";

  const titleClasses = compact ? "text-sm" : "text-base";
  const messageClasses = compact
    ? "text-xs text-slate-600 dark:text-gray-400 leading-relaxed"
    : "text-sm text-slate-600 dark:text-gray-400 leading-relaxed";

  return (
    <article className={`${containerClasses} ${stateClasses}`}>
      <div className="flex items-start gap-3">
        <div
          className={`flex ${iconWrapperClasses} items-center justify-center rounded-full bg-blue-100 text-blue-600`}
        >
          <span className="material-symbols-outlined">
            {notification.icon || "notifications"}
          </span>
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-1">
              <p className={`${titleClasses} font-semibold text-slate-900 dark:text-gray-100`}>
                {notification.title}
              </p>
              <p className={messageClasses}>{notification.message}</p>

           
              {onBookingSeen &&
                notification.type === "booking_created" &&
                !notification.adminSaw && (
                  <button
                    type="button"
                    onClick={() => onBookingSeen(notification)}
                    className="mt-2 inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-slate-900"
                  >
                    <span className="material-symbols-outlined text-sm">
                      done_all
                    </span>
                    <span>The booking was received</span>
                  </button>
                )}
            </div>

            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(notification.id)}
                aria-label="Delete notification"
                className="text-slate-400 hover:text-slate-600 transition dark:text-gray-500 dark:hover:text-gray-200"
              >
                <span className="material-symbols-outlined text-base">delete</span>
              </button>
            )}
          </div>

          <p className="text-xs text-slate-500 dark:text-gray-500 mt-2">
            {notification.time}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function NotificationsList({
  notifications,
  onDelete,
  onBookingSeen, 
  emptyMessage = "You are all caught up. New notifications will appear here.",
  className = "",
  compact = false,
}) {
  const containerClasses = compact ? "flex flex-col gap-2" : "space-y-4";

  if (!notifications.length) {
    return (
      <div className={className}>
        <p className="py-16 text-center text-sm font-medium text-slate-500 dark:text-gray-400">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className={`${containerClasses} ${className}`.trim()}>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onDelete={onDelete}
          onBookingSeen={onBookingSeen} 
          compact={compact}
        />
      ))}
    </div>
  );
}
