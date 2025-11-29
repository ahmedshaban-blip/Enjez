import React, { useState } from "react";

export default function AdminBookingTrends({
  loading,
  weeklyStats,
  monthlyStats,
}) {
  const [chartMode, setChartMode] = useState("weekly"); // 'weekly' | 'monthly'

  const currentChartData =
    chartMode === "weekly" ? weeklyStats : monthlyStats;

  return (
    <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">
          Booking Trends
        </h2>
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 text-sm">
          <button
            className={`px-3 py-1 rounded-md font-medium ${
              chartMode === "weekly"
                ? "bg-white text-blue-600"
                : "text-slate-500"
            }`}
            onClick={() => setChartMode("weekly")}
          >
            Weekly
          </button>
          <button
            className={`px-3 py-1 rounded-md font-medium ${
              chartMode === "monthly"
                ? "bg-white text-blue-600"
                : "text-slate-500"
            }`}
            onClick={() => setChartMode("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="w-full h-80 rounded-lg bg-slate-50 p-4 flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
            Loading chart...
          </div>
        ) : !currentChartData || currentChartData.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
            No bookings data yet.
          </div>
        ) : (
          <div className="flex-1 flex items-end gap-3">
            {currentChartData.map((item) => (
              <div
                key={item.key}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div className="w-full h-40 bg-slate-200 rounded-full overflow-hidden flex items-end">
                  <div
                    className="w-full rounded-full bg-blue-500 transition-all"
                    style={{ height: `${item.height || 0}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500">
                  {item.label}
                </span>
                <span className="text-xs font-medium text-slate-700">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
