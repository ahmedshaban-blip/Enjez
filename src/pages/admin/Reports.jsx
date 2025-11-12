import React, { useEffect, useMemo, useState } from "react";
import { getAllDocs } from "../../utils/firebaseHelpers.js";

import StatsCards from "../../components/reports/StatsCards.jsx";
import ReportsFilters from "../../components/reports/ReportsFilters.jsx";
import ReportsChart from "../../components/reports/ReportsChart.jsx";

// helpers
function parseDate(value) {
  if (!value) return null;
  if (typeof value.toDate === "function") {
    const d = value.toDate();
    return isNaN(d?.getTime?.()) ? null : d;
  }
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? null : value;
  }
  if (typeof value === "string") {
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

function formatCurrency(value) {
  const n = Number(value || 0);
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function calcChangeLabel(thisVal, lastVal) {
  if (!lastVal || lastVal === 0) {
    return {
      label: "No previous data",
      className: "text-slate-500",
    };
  }
  const diffPct = ((thisVal - lastVal) / lastVal) * 100;
  const rounded = diffPct.toFixed(1);
  const sign = diffPct > 0 ? "+" : "";
  const isPositive = diffPct >= 0;
  return {
    label: `${sign}${rounded}% vs last month`,
    className: isPositive ? "text-green-600" : "text-red-600",
  };
}

export default function Reports() {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [agents, setAgents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedService, setSelectedService] = useState("all");
  const [selectedProvider, setSelectedProvider] = useState("all");
  const [reportType, setReportType] = useState("booking_trends");
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const [bookingDocs, serviceDocs, agentDocs] = await Promise.all([
          getAllDocs("bookings"),
          getAllDocs("services"),
          getAllDocs("agents"),
        ]);

        if (!mounted) return;

        setBookings(bookingDocs || []);
        setServices(serviceDocs || []);
        setAgents(agentDocs || []);
        setError("");
      } catch (err) {
        console.error("Error loading reports data:", err);
        if (!mounted) return;
        setError("Failed to load reports data. Please try again.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredBookings = useMemo(() => {
    let result = [...bookings];

    if (selectedService !== "all") {
      result = result.filter((b) => b.serviceId === selectedService);
    }

    if (selectedProvider !== "all") {
      result = result.filter((b) => b.agentId === selectedProvider);
    }

    if (dateRange.start || dateRange.end) {
      const startTime = dateRange.start
        ? new Date(
            dateRange.start.getFullYear(),
            dateRange.start.getMonth(),
            dateRange.start.getDate(),
            0,
            0,
            0,
            0
          ).getTime()
        : null;
      const endTime = dateRange.end
        ? new Date(
            dateRange.end.getFullYear(),
            dateRange.end.getMonth(),
            dateRange.end.getDate(),
            23,
            59,
            59,
            999
          ).getTime()
        : null;

      result = result.filter((b) => {
        const d = parseDate(b.date || b.createdAt);
        if (!d) return true;
        const t = d.getTime();
        if (startTime && t < startTime) return false;
        if (endTime && t > endTime) return false;
        return true;
      });
    }

    return result;
  }, [bookings, selectedService, selectedProvider, dateRange]);

  const {
    totalRevenue,
    revenueChangeLabel,
    revenueChangeClass,
    bookingsThisMonth,
    bookingsChangeLabel,
    bookingsChangeClass,
    topServiceName,
    topServicePercent,
    activeClients,
    activeClientsChangeLabel,
    activeClientsChangeClass,
    bookingsByDay,
    servicePerformance,
  } = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
    const lastMonth = lastMonthDate.getMonth();
    const lastMonthYear = lastMonthDate.getFullYear();

    const serviceMap = new Map(services.map((s) => [s.id, s]));

    let thisMonthBookings = 0;
    let lastMonthBookings = 0;
    let thisMonthRevenue = 0;
    let lastMonthRevenue = 0;

    const clientsThisMonth = new Set();
    const clientsLastMonth = new Set();

    const perDayMap = new Map();
    const serviceCountThisMonth = new Map();

    for (const b of filteredBookings) {
      const d = parseDate(b.date || b.createdAt);
      if (!d) continue;

      const year = d.getFullYear();
      const month = d.getMonth();
      const service = serviceMap.get(b.serviceId);
      const price = Number(service?.price || 0) || 0;

      const dayKey = d.toISOString().slice(0, 10);
      const prev = perDayMap.get(dayKey) || { count: 0, revenue: 0 };
      prev.count += 1;
      prev.revenue += price;
      perDayMap.set(dayKey, prev);

      const isThisMonth = year === currentYear && month === currentMonth;
      const isLastMonth = year === lastMonthYear && month === lastMonth;

      if (isThisMonth) {
        thisMonthBookings += 1;
        thisMonthRevenue += price;
        if (b.userId) clientsThisMonth.add(b.userId);

        if (b.serviceId) {
          const prevCount = serviceCountThisMonth.get(b.serviceId) || 0;
          serviceCountThisMonth.set(b.serviceId, prevCount + 1);
        }
      } else if (isLastMonth) {
        lastMonthBookings += 1;
        lastMonthRevenue += price;
        if (b.userId) clientsLastMonth.add(b.userId);
      }
    }

    const revenueChange = calcChangeLabel(thisMonthRevenue, lastMonthRevenue);
    const bookingsChange = calcChangeLabel(thisMonthBookings, lastMonthBookings);
    const activeClientsChange = calcChangeLabel(
      clientsThisMonth.size,
      clientsLastMonth.size
    );

    let topId = null;
    let topCount = 0;
    let totalCount = 0;
    for (const [id, count] of serviceCountThisMonth.entries()) {
      totalCount += count;
      if (count > topCount) {
        topCount = count;
        topId = id;
      }
    }

    const topService =
      topId && serviceMap.get(topId)
        ? serviceMap.get(topId).name || "Unnamed Service"
        : "No data";
    const topPercent =
      totalCount > 0 ? Math.round((topCount / totalCount) * 100) : 0;

    const bookingsByDayArr = Array.from(perDayMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, data]) => ({ date, count: data.count, revenue: data.revenue }));

    const servicePerformanceArr = Array.from(serviceCountThisMonth.entries())
      .map(([id, count]) => ({
        name: serviceMap.get(id)?.name || "Unnamed",
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    return {
      totalRevenue: thisMonthRevenue,
      revenueChangeLabel: revenueChange.label,
      revenueChangeClass: revenueChange.className,
      bookingsThisMonth: thisMonthBookings,
      bookingsChangeLabel: bookingsChange.label,
      bookingsChangeClass: bookingsChange.className,
      topServiceName: topService,
      topServicePercent: topPercent,
      activeClients: clientsThisMonth.size,
      activeClientsChangeLabel: activeClientsChange.label,
      activeClientsChangeClass: activeClientsChange.className,
      bookingsByDay: bookingsByDayArr,
      servicePerformance: servicePerformanceArr,
    };
  }, [filteredBookings, services]);

  const handleReset = () => {
    setSelectedService("all");
    setSelectedProvider("all");
    setReportType("booking_trends");
    setDateRange({ start: null, end: null });
  };

  const handleExportCSV = () => {
    if (!filteredBookings.length) return;

    const serviceMap = new Map(services.map((s) => [s.id, s]));
    const rows = [
      ["BookingID", "Date", "Service", "ProviderId", "UserId", "Price"],
    ];

    filteredBookings.forEach((b) => {
      const service = serviceMap.get(b.serviceId);
      const price = Number(service?.price || 0) || 0;
      const d = parseDate(b.date || b.createdAt);
      const dateStr = d ? d.toISOString() : "";
      rows.push([
        b.id || "",
        dateStr,
        service?.name || "",
        b.agentId || "",
        b.userId || "",
        price.toString(),
      ]);
    });

    const csvContent = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const serviceOptions = [{ id: "all", name: "All Services" }].concat(
    services.map((s) => ({ id: s.id, name: s.name || "Unnamed Service" }))
  );

  const providerOptions = [{ id: "all", name: "All Providers" }].concat(
    agents.map((a) => ({
      id: a.id,
      name: a.name || a.email || "Unnamed Provider",
    }))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Reports &amp; Analytics
          </h1>
          <p className="text-slate-500 text-base">
            View and analyze key business metrics.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="flex items-center gap-2 h-10 px-4 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          <span className="material-symbols-outlined text-base">download</span>
          <span>Export as CSV</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        <>
          <StatsCards
            totalRevenue={totalRevenue}
            bookingsThisMonth={bookingsThisMonth}
            topServiceName={topServiceName}
            topServicePercent={topServicePercent}
            activeClients={activeClients}
            revenueChangeLabel={revenueChangeLabel}
            revenueChangeClass={revenueChangeClass}
            bookingsChangeLabel={bookingsChangeLabel}
            bookingsChangeClass={bookingsChangeClass}
            activeClientsChangeLabel={activeClientsChangeLabel}
            activeClientsChangeClass={activeClientsChangeClass}
            formatCurrency={formatCurrency}
          />

          <ReportsFilters
            dateRange={dateRange}
            setDateRange={setDateRange}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            selectedProvider={selectedProvider}
            setSelectedProvider={setSelectedProvider}
            reportType={reportType}
            setReportType={setReportType}
            serviceOptions={serviceOptions}
            providerOptions={providerOptions}
            onReset={handleReset}
          />

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {reportType === "booking_trends"
                ? "Booking Volume Over Time"
                : reportType === "service_performance"
                ? "Service Performance"
                : "Report"}
            </h3>
            <ReportsChart
              reportType={reportType}
              bookingsByDay={bookingsByDay}
              servicePerformance={servicePerformance}
            />
          </div>
        </>
      )}
    </div>
  );
}
