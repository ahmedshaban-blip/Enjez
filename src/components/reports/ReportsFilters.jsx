import React from "react";
import DateRangeCalendar from "./DateRangeCalendar.jsx";

function ReportsFilters({
  dateRange,
  setDateRange,
  selectedService,
  setSelectedService,
  selectedProvider,
  setSelectedProvider,
  reportType,
  setReportType,
  serviceOptions,
  providerOptions,
  onReset,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <h3 className="text-lg font-bold text-slate-900 px-2 pb-4">Filters</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex items-center justify-center p-4 border border-slate-200 rounded-lg">
          <DateRangeCalendar value={dateRange} onChange={setDateRange} />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="service-filter"
              className="text-sm font-medium text-slate-700"
            >
              Filter by Service
            </label>
            <select
              id="service-filter"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 focus:border-blue-600 focus:ring-blue-600 h-10 px-3 text-sm"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              {serviceOptions.map((svc) => (
                <option key={svc.id} value={svc.id}>
                  {svc.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="provider-filter"
              className="text-sm font-medium text-slate-700"
            >
              Filter by Provider
            </label>
            <select
              id="provider-filter"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 focus:border-blue-600 focus:ring-blue-600 h-10 px-3 text-sm"
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
            >
              {providerOptions.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="report-type"
              className="text-sm font-medium text-slate-700"
            >
              Report Type
            </label>
            <select
              id="report-type"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 focus:border-blue-600 focus:ring-blue-600 h-10 px-3 text-sm"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="booking_trends">Booking Trends</option>
              <option value="service_performance">Service Performance</option>
              <option value="client_activity">Client Activity</option>
              <option value="provider_stats">Provider Statistics</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button
              type="button"
              className="flex-1 h-10 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700"
            >
              Apply Filters
            </button>
            <button
              type="button"
              className="flex-1 h-10 rounded-lg border border-slate-200 bg-slate-50 text-sm font-bold text-slate-800 hover:bg-slate-100"
              onClick={onReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsFilters;
