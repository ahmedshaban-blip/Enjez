// src/utils/adminDashboardUtils.js

const toJsDate = (value) => {
  if (!value) return null;
  try {
    if (value instanceof Date) return value;
    if (typeof value.toDate === "function") return value.toDate();
    if (typeof value === "string") return new Date(value);
    if (typeof value === "object" && typeof value.seconds === "number") {
      return new Date(value.seconds * 1000);
    }
    return new Date(value);
  } catch {
    return null;
  }
};

const startOfDay = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const buildWeeklyStatsInternal = (bookings = []) => {
  const today = new Date();
  const todayStart = startOfDay(today);

  const days = [];
  const indexByKey = new Map();

  for (let offset = 6; offset >= 0; offset--) {
    const dayDate = new Date(todayStart);
    dayDate.setDate(todayStart.getDate() - offset);
    const keyNum = startOfDay(dayDate).getTime();
    const key = String(keyNum);
    const label = dayDate.toLocaleDateString(undefined, {
      weekday: "short",
    });

    indexByKey.set(keyNum, days.length);
    days.push({ key, label, date: dayDate, count: 0 });
  }

  bookings.forEach((b) => {
    const created = toJsDate(b.createdAt);
    if (!created) return;
    const bucketKey = startOfDay(created).getTime();
    const idx = indexByKey.get(bucketKey);
    if (idx === undefined) return;
    days[idx].count += 1;
  });

  const max = Math.max(0, ...days.map((d) => d.count));
  return days.map((d) => ({
    ...d,
    height: max ? Math.max(8, (d.count / max) * 100) : 0,
  }));
};

const buildMonthlyStatsInternal = (bookings = []) => {
  const today = new Date();
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const buckets = [];
  const indexByKey = new Map();

  for (let offset = 5; offset >= 0; offset--) {
    const d = new Date(
      currentMonthStart.getFullYear(),
      currentMonthStart.getMonth() - offset,
      1
    );
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const label = d.toLocaleDateString(undefined, { month: "short" });

    indexByKey.set(key, buckets.length);
    buckets.push({ key, label, count: 0 });
  }

  bookings.forEach((b) => {
    const created = toJsDate(b.createdAt);
    if (!created) return;
    const key = `${created.getFullYear()}-${created.getMonth()}`;
    const idx = indexByKey.get(key);
    if (idx === undefined) return;
    buckets[idx].count += 1;
  });

  const max = Math.max(0, ...buckets.map((b) => b.count));
  return buckets.map((b) => ({
    ...b,
    height: max ? Math.max(8, (b.count / max) * 100) : 0,
  }));
};

const formatTimeAgo = (date) => {
  if (!date) return "";
  const now = new Date();
  const diffMs = now - date;
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
};

export const buildDashboardData = (bookings = [], users = [], services = []) => {
  const now = new Date();
  const todayStart = startOfDay(now);

  // ---- Stats ----
  const newBookingsToday = bookings.filter((b) => {
    const created = toJsDate(b.createdAt);
    return created && created >= todayStart;
  }).length;

  const pendingRequests = bookings.filter((b) => {
    const status = (b.status || "").toLowerCase();
    return status === "pending" || status === "new";
  }).length;

  const activeClients = users.filter((u) => {
    const role = (u.role || "user").toLowerCase();
    return role === "user";
  }).length;

  const totalServices = services.filter((s) => {
    if (typeof s.isActive === "boolean") return s.isActive;
    return true;
  }).length;

  const stats = {
    newBookingsToday,
    pendingRequests,
    activeClients,
    totalServices,
  };

  // ---- Charts ----
  const weeklyStats = buildWeeklyStatsInternal(bookings);
  const monthlyStats = buildMonthlyStatsInternal(bookings);

  // ---- Recent Activity ----
  const userIndex = {};
  users.forEach((u) => {
    const id = u.id || u.userId || u.uid;
    if (!id) return;
    userIndex[id] =
      u.fullName ||
      u.name ||
      u.username ||
      u.displayName ||
      u.email ||
      "Client";
  });

  const recentBookings = bookings
    .map((b) => {
      const createdDate = toJsDate(b.createdAt) || new Date(0);
      const userNameFromMap =
        (b.userId && userIndex[b.userId]) ||
        b.username ||
        b.clientName ||
        b.fullName ||
        b.name ||
        b.email ||
        "Client";

      return {
        id: b.id,
        serviceName: b.serviceName || "Service",
        createdDate,
        timeAgo: formatTimeAgo(createdDate),
        clientName: userNameFromMap,
      };
    })
    .sort((a, b) => b.createdDate - a.createdDate)
    .slice(0, 4);

  return {
    stats,
    weeklyStats,
    monthlyStats,
    recentBookings,
  };
};
