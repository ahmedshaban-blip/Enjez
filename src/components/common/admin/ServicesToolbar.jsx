import { useMemo } from "react";

export const ServicesToolbar = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  services,
}) => {
  const categories = useMemo(() => {
    const unique = new Set(
      services.map((s) => s.categoryName).filter(Boolean)
    );
    return Array.from(unique);
  }, [services]);

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 border border-gray-700 rounded-lg">
          <label>
            <div className="group flex items-stretch rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
              <div className="flex items-center justify-center pl-4 text-gray-400">
                <span className="material-symbols-outlined text-xl">search</span>
              </div>

              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full bg-transparent px-4 text-base text-gray-900 dark:text-white border-0 focus:ring-0"
                placeholder="Search by service name..."
              />
            </div>
          </label>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-10 rounded-lg bg-gray-100 dark:bg-gray-800 px-4 text-gray-800 dark:text-gray-200 text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
