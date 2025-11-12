import React from "react";

function StatsCards({
  totalRevenue,
  bookingsThisMonth,
  topServiceName,
  topServicePercent,
  activeClients,
  revenueChangeLabel,
  revenueChangeClass,
  bookingsChangeLabel,
  bookingsChangeClass,
  activeClientsChangeLabel,
  activeClientsChangeClass,
  formatCurrency,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-slate-200">
        <p className="text-sm font-medium text-slate-500">
          Total Revenue (this month)
        </p>
        <p className="text-3xl font-bold tracking-tight text-slate-900">
          ${formatCurrency(totalRevenue)}
        </p>
        <p className={`text-sm font-medium ${revenueChangeClass}`}>
          {revenueChangeLabel}
        </p>
      </div>

      <div className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-slate-200">
        <p className="text-sm font-medium text-slate-500">
          Bookings this Month
        </p>
        <p className="text-3xl font-bold tracking-tight text-slate-900">
          {bookingsThisMonth}
        </p>
        <p className={`text-sm font-medium ${bookingsChangeClass}`}>
          {bookingsChangeLabel}
        </p>
      </div>

      <div className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-slate-200">
        <p className="text-sm font-medium text-slate-500">
          Top Performing Service
        </p>
        <p className="text-2xl font-bold tracking-tight text-slate-900">
          {topServiceName}
        </p>
        <p className="text-sm font-medium text-slate-500">
          {topServicePercent}% of bookings this month
        </p>
      </div>

      <div className="flex flex-col gap-2 rounded-xl p-6 bg-white border border-slate-200">
        <p className="text-sm font-medium text-slate-500">
          Active Clients (this month)
        </p>
        <p className="text-3xl font-bold tracking-tight text-slate-900">
          {activeClients}
        </p>
        <p className={`text-sm font-medium ${activeClientsChangeClass}`}>
          {activeClientsChangeLabel}
        </p>
      </div>
    </div>
  );
}

export default StatsCards;
