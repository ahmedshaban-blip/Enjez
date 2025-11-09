export default function ClientsPagination({ shown, total }) {
  return (
    <nav
      className="flex items-center justify-between p-4 border-t border-slate-200 bg-slate-50"
      aria-label="Table navigation"
    >
      <span className="text-sm text-slate-600">
        Showing{" "}
        <span className="font-semibold text-slate-900">
          {shown > 0 ? `1-${shown}` : 0}
        </span>{" "}
        of <span className="font-semibold text-slate-900">{total}</span>
      </span>
    </nav>
  );
}
