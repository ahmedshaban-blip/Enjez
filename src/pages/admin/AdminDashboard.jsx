// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { getAllDocs } from "../../utils/firebaseHelpers.js";
import { buildDashboardData } from "../../utils/adminDashboardUtils.js";
import { auth } from "../../config/firebase.js";

import AdminStatsCards from "../../components/admin/AdminStatsCards.jsx";
import AdminBookingTrends from "../../components/admin/AdminBookingTrends.jsx";
import AdminRecentActivity from "../../components/admin/AdminRecentActivity.jsx";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [stats, setStats] = useState({
    newBookingsToday: 0,
    pendingRequests: 0,
    activeClients: 0,
    totalServices: 0,
  });

  const [weeklyStats, setWeeklyStats] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);

  const [userName, setUserName] = useState("Admin");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        // ---- اسم اليوزر من Firebase Auth ----
        const currentUser = auth.currentUser;
        if (currentUser && isMounted) {
          const nameFromAuth =
            currentUser.displayName ||
            currentUser.fullName ||
            currentUser.name ||
            (currentUser.email
              ? currentUser.email.split("@")[0]
              : "Admin");

          setUserName(nameFromAuth);
        }

        // ---- البيانات من Firestore ----
        const [bookings, users, services] = await Promise.all([
          getAllDocs("bookings"),
          getAllDocs("users"),
          getAllDocs("services"),
        ]);

        if (!isMounted) return;

        const data = buildDashboardData(bookings, users, services);

        setStats(data.stats);
        setWeeklyStats(data.weeklyStats);
        setMonthlyStats(data.monthlyStats);
        setRecentBookings(data.recentBookings);
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("Failed to load dashboard data.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Headline */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Welcome back, {userName}!
        </h1>
        <p className="text-slate-500 mt-2">
          Here&apos;s a summary of your platform&apos;s activity today.
        </p>
        {error && (
          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>

      {/* Stats cards */}
      <AdminStatsCards loading={loading} stats={stats} />

      {/* Chart + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AdminBookingTrends
          loading={loading}
          weeklyStats={weeklyStats}
          monthlyStats={monthlyStats}
        />

        <AdminRecentActivity
          loading={loading}
          recentBookings={recentBookings}
        />
      </div>
    </div>
  );
}
