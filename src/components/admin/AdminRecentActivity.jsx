import React from "react";

export default function AdminRecentActivity({ loading, recentBookings }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-4">
        Recent Activity
      </h2>
      <div className="flex flex-col gap-4 text-sm">
        {loading ? (
          <p className="text-slate-400 text-sm">Loading activity...</p>
        ) : recentBookings.length === 0 ? (
          <p className="text-slate-400 text-sm">
            No recent bookings yet.
          </p>
        ) : (
          <>
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center gap-4"
              >
                <div className="flex items-center justify-center size-10 rounded-full bg-blue-50 text-blue-600">
                  <span className="material-symbols-outlined text-xl">
                    calendar_add_on
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">
                    New Booking: &quot;{booking.serviceName}&quot;
                  </p>
                  <p className="text-xs text-slate-500">
                    {booking.clientName} · {booking.timeAgo}
                  </p>
                </div>
              </div>
            ))}

            <button className="mt-2 text-sm font-medium text-blue-600 hover:underline self-start">
              View All Activity
            </button>
          </>
        )}
      </div>
    </div>
  );
}
