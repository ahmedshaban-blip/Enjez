import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDocs } from "../../utils/firebaseHelpers";

// Helper to format price values
const formatPrice = (value) => {
  if (value === undefined || value === null || value === "") return "—";
  const number = Number(value);
  return Number.isFinite(number) ? `$${number.toFixed(2)}` : String(value);
};

// Helper to format duration stored in minutes
const formatDuration = (minutes) => {
  if (!minutes && minutes !== 0) return "—";
  const total = Number(minutes);
  if (!Number.isFinite(total)) return "—";
  const hrs = Math.floor(total / 60);
  const mins = total % 60;
  if (hrs && mins) return `${hrs}h ${mins}m`;
  if (hrs) return `${hrs}h`;
  return `${mins}m`;
};

// Helper to convert Firestore Timestamp/string to readable date
const formatCreatedAt = (value) => {
  if (!value) return "—";
  let date;
  if (value.seconds) {
    date = new Date(value.seconds * 1000);
  } else if (value.toDate) {
    date = value.toDate();
  } else {
    date = new Date(value);
  }
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString();
};

// Top-level page component handles Firestore fetching and state
const ManageServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadServices = async () => {
      try {
        const data = await getAllDocs("services");
        if (!isMounted) return;
        setServices(Array.isArray(data) ? data : []);
        setError("");
      } catch (err) {
        console.error("Failed to load services:", err);
        if (isMounted) setError("Unable to load services. Please try again.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadServices();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden">
      <MainContent services={services} loading={loading} error={error} />
    </div>
  );
};

const MainContent = ({ services, loading, error }) => {
  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">
        <PageHeader />
        <div className="bg-white dark:bg-gray-900/50 rounded-lg sm:rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <ServicesToolbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            services={allServices}
          />
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            <ServicesTable services={services} loading={loading} error={error} />
          </div>
          <Pagination
            total={total}
            perPage={perPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </main>
  );
};

const PageHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="flex flex-col gap-2">
        <p className="text-gray-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
          Manage Services
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
          View, add, edit, and delete services available on the platform.
        </p>
      </div>
      <button
        onClick={() => navigate("/admin/add-service")}
        className="w-full md:w-auto flex items-center justify-center gap-2 overflow-hidden rounded-xl h-14 px-6 bg-blue-600 text-white text-base font-bold leading-normal tracking-[0.015em] shadow-sm hover:bg-blue-700 focus:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
        <span className="truncate">Add New Service</span>
      </button>
    </div>
  );
};

const ServicesToolbar = () => {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search box */}
        <div className="flex-1">
          <label className="flex flex-col w-full">
            <div className="group flex w-full flex-1 items-stretch rounded-lg bg-gray-100 dark:bg-gray-800 transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700">
              <div className="flex items-center justify-center pl-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors duration-200">
                <span className="material-symbols-outlined text-xl">search</span>
              </div>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 flex w-full min-w-0 flex-1 bg-transparent px-4 text-base font-medium text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 border-none rounded-r-lg transition-all duration-200"
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
            className="flex h-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal"
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

// Table now renders Firestore data dynamically while preserving styling
const ServicesTable = ({ services, loading, error }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all"
                  type="checkbox"
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Service
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Duration
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="px-6 py-10 text-center">
                Loading services…
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={7} className="px-6 py-10 text-center text-red-500">
                {error}
              </td>
            </tr>
          ) : services.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-10 text-center">
                No services available.
              </td>
            </tr>
          ) : (
            services.map((service) => {
              const imageSrc =
                (Array.isArray(service.images) && service.images[0]) ||
                service.imageUrl ||
                null;
              const categoryName =
                service._categoryName ||
                service.categoryName ||
                service.category ||
                service.categoryId ||
                "—";
              const isActive =
                service.isActive === undefined ? true : Boolean(service.isActive);

              return (
                <tr
                  key={service.id}
                  className="bg-white dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b dark:border-gray-800"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id={`checkbox-${service.id}`}
                        type="checkbox"
                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor={`checkbox-${service.id}`} className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="flex items-center gap-4">
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={`${service.name || "Service"} thumbnail`}
                          className="h-12 w-12 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                          <span className="material-symbols-outlined">image</span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {service.name || "Untitled service"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Created: {formatCreatedAt(service.createdAt)}
                        </p>
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{categoryName}</td>
                  <td className="px-6 py-4">{formatPrice(service.price)}</td>
                  <td className="px-6 py-4">{formatDuration(service.duration)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

// Pagination UI left untouched (no data wiring yet)
const Pagination = () => {
  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 text-center sm:text-left">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">1-4</span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">100</span>
      </span>
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 h-8 leading-tight border rounded-l-lg flex items-center ${
              currentPage === 1
                ? "cursor-not-allowed opacity-50 text-gray-400 bg-white border-gray-300"
                : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
          >
            Previous
          </button>
        </li>

        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => setCurrentPage(page)}
              className={`px-3 h-8 leading-tight border flex items-center justify-center ${
                currentPage === page
                  ? "z-10 text-primary border-primary bg-primary/10"
                  : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              {page}
            </button>
          </li>
        ))}

<li>
  <button
    onClick={() =>
      currentPage < totalPages && setCurrentPage(currentPage + 1)
    }
    disabled={currentPage === totalPages}
    className={`px-3 h-8 leading-tight border rounded-r-lg flex items-center ${
      currentPage === totalPages
        ? "cursor-not-allowed opacity-50 text-gray-400 bg-white border-gray-300"
        : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    }`}
  >
    <span className="material-symbols-outlined text-sm sm:text-base">
      chevron_right
    </span>
  </button>
</li>


export default ManageServicesPage;
