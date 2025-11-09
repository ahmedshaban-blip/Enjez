export const formatDate = (value) => {
  if (!value) return "—";

  let date;
  if (value?.seconds) date = new Date(value.seconds * 1000);
  else if (typeof value?.toDate === "function") date = value.toDate();
  else date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};

export const getStatusClasses = (status) => {
  switch ((status || "active").toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-700";
    case "suspended":
      return "bg-yellow-100 text-yellow-700";
    case "deleted":
    case "inactive":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};
