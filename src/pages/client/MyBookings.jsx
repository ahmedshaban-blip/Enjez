import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDocsByField, getAllDocs } from "../../utils/firebaseHelpers.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useLoading } from "../../context/LoadingContext.jsx";
import Navbar from "../../components/layout/Navbar.jsx";
import Footer from "../../components/layout/Footer.jsx"; 

export default function MyBookings() {
  const { user } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      showLoading("Loading your bookings...");

      try {
        // Fetch bookings for the current user
        const userBookings = await getDocsByField("bookings", "userId", user.uid);
        const allServices = await getAllDocs("services");
        const allAgents = await getAllDocs("agents");

        const enriched = userBookings.map((b) => {
          const service = allServices.find((s) => s.id === b.serviceId);
          const agent = allAgents.find((a) => a.id === b.agentId);

          return {
            ...b,
            serviceName: service?.name || "Unknown Service",
            providerName: agent?.name || "Unknown Provider",
            price: service?.price || "N/A",
          };
        });

        setBookings(enriched);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        hideLoading();
      }
    };

    fetchBookings();
  }, [user]);

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      !search ||
      b.serviceName?.toLowerCase().includes(search.toLowerCase()) ||
      b.providerName?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      b.status?.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
  const startIndex = (currentPage - 1) * bookingsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, startIndex + bookingsPerPage);

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    new: "bg-yellow-100 text-yellow-800",
  };

  return (
    // Refactored layout for Sticky Footer
    <div className="min-h-screen flex flex-col bg-white dark:bg-background-dark text-gray-900 dark:text-white font-sans">
      
      <Navbar />

      {/* Main Content Wrapper */}
      <main className="flex-grow container mx-auto px-4 sm:px-16 py-8">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Booking Requests</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">View and manage all your past and upcoming service bookings.</p>
          </div>
          <button
            onClick={() => navigate("/services")}
            className="flex min-w-[84px] items-center justify-center gap-2 rounded-lg h-10 bg-blue-600 px-4 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            <span className="truncate">Book New Service</span>
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center mb-8">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined text-xl">search</span>
            <input
              type="text"
              placeholder="Search by service or provider"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  filter === status
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table */}
        {currentBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 border border-dashed border-gray-300 rounded-xl bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700">
            <span className="material-symbols-outlined text-5xl mb-4 text-gray-400">event_busy</span>
            <p className="font-medium">No bookings found.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <tr className="text-left text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                    <th className="px-6 py-4">Service Details</th>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Cost</th>
                    <th className="px-6 py-4 text-right"><span className="sr-only">Action</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {currentBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{b.serviceName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{b.providerName}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="font-medium">{b.date}</div>
                        <div className="text-xs text-gray-500">{b.time}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${
                          statusColor[b.status?.toLowerCase()] || "bg-gray-100 text-gray-700"
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">${b.price}</td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <button
                          onClick={() => navigate(`/booking/details/${b.id}`)}
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                        >
                          <span>Details</span>
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <nav className="flex items-center justify-between border-t border-gray-200 px-6 py-4 bg-gray-50 dark:bg-gray-800/30 dark:border-gray-700">
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(startIndex + bookingsPerPage, filteredBookings.length)}</span> of <span className="font-medium">{filteredBookings.length}</span> results
                </p>
              </div>
              <div className="flex flex-1 justify-end gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Previous
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Next
                </button>
              </div>
            </nav>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

