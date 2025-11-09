export default function ClientsSearchBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}) {
  const filterButtons = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "suspended", label: "Suspended" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
      {/* Search */}
      <div className="flex-grow w-full md:w-auto">
        <label className="flex flex-col min-w-40 h-11 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="flex items-center justify-center pl-3.5 rounded-l-lg border border-slate-200 bg-slate-50 border-r-0">
              <span className="material-symbols-outlined text-slate-400">
                search
              </span>
            </div>
            <input
              className="flex w-full min-w-0 flex-1 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 border border-slate-200 bg-white h-full px-3 rounded-l-none border-l-0 text-sm"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </label>
      </div>

      {/* Filters */}
      <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
        {filterButtons.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => onStatusFilterChange(filter.value)}
            className={`inline-flex h-9 items-center justify-center rounded-lg border px-3 text-sm ${
              statusFilter === filter.value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
