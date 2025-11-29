import React from "react";

export default function AdminStatsCards({ loading, stats }) {
  const {
    newBookingsToday,
    pendingRequests,
    activeClients,
    totalServices,
  } = stats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* New Bookings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-2">
        <p className="text-sm font-medium text-slate-500">New Bookings</p>
        <p className="text-3xl font-bold text-slate-900 tracking-tight">
          {loading ? "..." : newBookingsToday}
        </p>
        <p className="text-sm font-medium text-emerald-500">
          +10% from yesterday
        </p>
      </div>

      {/* Pending Requests */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-2">
        <p className="text-sm font-medium text-slate-500">
          Pending Requests
        </p>
        <p className="text-3xl font-bold text-slate-900 tracking-tight">
          {loading ? "..." : pendingRequests}
        </p>
        <p className="text-sm font-medium text-amber-500">
          Requires attention
        </p>
      </div>

      {/* Active Clients */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-2">
        <p className="text-sm font-medium text-slate-500">Active Clients</p>
        <p className="text-3xl font-bold text-slate-900 tracking-tight">
          {loading ? "..." : activeClients}
        </p>
        <p className="text-sm font-medium text-emerald-500">
          +1% from last week
        </p>
      </div>

      {/* Total Services */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-2">
        <p className="text-sm font-medium text-slate-500">Total Services</p>
        <p className="text-3xl font-bold text-slate-900 tracking-tight">
          {loading ? "..." : totalServices}
        </p>
        <p className="text-sm font-medium text-slate-500">No change</p>
      </div>
    </div>
  );
}
