import React from "react";

function ReportsChart({ reportType, bookingsByDay, servicePerformance }) {
  if (reportType !== "booking_trends" && reportType !== "service_performance") {
    return (
      <div className="h-80 w-full bg-slate-50 rounded-lg flex items-center justify-center text-sm text-slate-500">
        This report type will be available soon. Try "Booking Trends" or "Service Performance".
      </div>
    );
  }

  if (
    (reportType === "booking_trends" && bookingsByDay.length === 0) ||
    (reportType === "service_performance" && servicePerformance.length === 0)
  ) {
    return (
      <div className="h-80 w-full bg-slate-50 rounded-lg flex items-center justify-center text-sm text-slate-500">
        No data for the selected filters.
      </div>
    );
  }

  if (reportType === "service_performance") {
    const max = Math.max(...servicePerformance.map((s) => s.count || 0)) || 1;
    return (
      <div className="h-80 w-full bg-slate-50 rounded-lg flex items-end gap-4 p-4 overflow-x-auto">
        {servicePerformance.map((svc) => (
          <div
            key={svc.name}
            className="flex flex-col items-center justify-end min-w-[72px] flex-1"
          >
            <div
              className="w-full rounded-t-lg bg-blue-600"
              style={{ height: `${(svc.count / max) * 100 || 0}%` }}
            />
            <span className="mt-2 text-xs font-medium text-slate-800 truncate w-full text-center">
              {svc.name}
            </span>
            <span className="text-[11px] text-slate-500">
              {svc.count} bookings
            </span>
          </div>
        ))}
      </div>
    );
  }

  const max = Math.max(...bookingsByDay.map((d) => d.count || 0)) || 1;
  return (
    <div className="h-80 w-full bg-slate-50 rounded-lg flex items-end gap-2 p-4 overflow-x-auto">
      {bookingsByDay.map((point) => {
        const dateLabel = new Date(point.date);
        const day = dateLabel.getDate();
        const monthShort = dateLabel.toLocaleDateString(undefined, {
          month: "short",
        });

        return (
          <div
            key={point.date}
            className="flex flex-col items-center justify-end min-w-[32px] flex-1"
          >
            <div
              className="w-full rounded-t-lg bg-blue-600"
              style={{ height: `${(point.count / max) * 100 || 0}%` }}
            />
            <span className="mt-2 text-[11px] text-slate-700">{day}</span>
            <span className="text-[10px] text-slate-400">{monthShort}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ReportsChart;
