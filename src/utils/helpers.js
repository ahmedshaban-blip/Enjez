// src/utils/helpers.js
export const formatPrice = (value) => {
  if (value === undefined || value === null || value === "") return "—";
  const number = Number(value);
  return Number.isFinite(number) ? `$${number.toFixed(2)}` : String(value);
};

export const formatDuration = (minutes) => {
  if (!minutes && minutes !== 0) return "—";
  const total = Number(minutes);
  if (!Number.isFinite(total)) return "—";
  const hrs = Math.floor(total / 60);
  const mins = total % 60;
  if (hrs && mins) return `${hrs}h ${mins}m`;
  if (hrs) return `${hrs}h`;
  return `${mins}m`;
};

export const formatCreatedAt = (value) => {
  if (!value) return "—";
  let date;
  if (value.seconds) date = new Date(value.seconds * 1000);
  else if (value.toDate) date = value.toDate();
  else date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString();
};
