export default function ClientsHeader({ onAddClick }) {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Client Management
        </h1>
        <p className="text-sm text-slate-500">
          View, manage, and search all registered clients on the platform.
        </p>
      </div>

      <button
        type="button"
        onClick={onAddClick}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 h-10 shadow-sm transition-colors"
      >
        <span className="material-symbols-outlined text-base">add</span>
        <span>Add New Client</span>
      </button>
    </div>
  );
}
