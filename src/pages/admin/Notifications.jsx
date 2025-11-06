/* TODO: Replace mock notifications with data from backend */
const mockNotifications = [
  {
    id: "1",
    title: "Booking Confirmed",
    message: "Deep Home Cleaning booking is confirmed for Nov 15 at 9:00 AM.",
    time: "2h ago",
    unread: true,
    icon: "calendar_add_on",
  },
  {
    id: "2",
    title: "New Service Review",
    message: "Emily Carter rated Premium Spa Treatment with 5 stars.",
    time: "5h ago",
    unread: false,
    icon: "star",
  },
  {
    id: "3",
    title: "Provider Assigned",
    message: "Mike Ross has been assigned to Deluxe Gardening.",
    time: "1 day ago",
    unread: false,
    icon: "group",
  },
  {
    id: "4",
    title: "Payout Ready",
    message: "Weekly payout is ready for review.",
    time: "3 days ago",
    unread: false,
    icon: "account_balance",
  },
];

export default function Notifications() {
  const unreadCount = mockNotifications.filter((item) => item.unread).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Notifications
          </h1>
          <p className="text-slate-500 mt-1">
            You have {unreadCount} unread notification
            {unreadCount === 1 ? "" : "s"}
          </p>
        </div>
        <button
          type="button"
          className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm hover:border-blue-200 hover:text-blue-600 transition"
        >
          <span className="material-symbols-outlined text-base">done_all</span>
          Mark all as read {"\u2705\u2705"}
        </button>
      </div>

      {/* Notifications list */}
      <div className="space-y-4">
        {mockNotifications.map((notification) => {
          const baseClasses =
            "flex flex-col gap-3 rounded-xl border shadow-sm px-5 py-4 transition hover:border-blue-200 hover:bg-blue-50/60";
          const stateClasses = notification.unread
            ? "bg-blue-50 border-blue-100"
            : "bg-white border-slate-200";

          return (
            <div key={notification.id} className={`${baseClasses} ${stateClasses}`}>
              <div className="flex items-start gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <span className="material-symbols-outlined text-2xl">
                    {notification.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-slate-900">
                        {notification.title}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {notification.message}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <span className="material-symbols-outlined text-lg">
                        delete
                      </span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
