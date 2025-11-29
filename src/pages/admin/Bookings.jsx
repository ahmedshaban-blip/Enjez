import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDocs } from '../../utils/firebaseHelpers.js';

const BookingContent = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [requestedDate, setRequestedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleViewDetails = (bookingId) => {
    navigate(`/admin/booking/view-details/${bookingId}`);
  };

  const formatDate = (value) => {
    try {
      if (!value) return '—';
      // Firestore Timestamp -> toDate()
      const d = value.toDate ? value.toDate() : new Date(value);
      return d.toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
    } catch (e) {
      return String(value);
    }
  };

  const getStatusBadge = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'confirmed')
      return (<span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/50 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:text-green-300">Confirmed</span>);
    if (s === 'in progress' || s === 'in_progress')
      return (<span className="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900/50 px-2.5 py-0.5 text-xs font-semibold text-yellow-800 dark:text-yellow-300">In Progress</span>);
    if (s === 'completed')
      return (<span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 text-xs font-semibold text-gray-800 dark:text-gray-300">Completed</span>);
    if (s === 'cancelled' || s === 'canceled')
      return (<span className="inline-flex items-center rounded-full bg-red-100 dark:bg-red-900/50 px-2.5 py-0.5 text-xs font-semibold text-red-800 dark:text-red-300">Cancelled</span>);
    return (<span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/50 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:text-blue-300">New</span>);
  };

  // Filter bookings based on search and filters
  const filterBookings = () => {
    let result = [...bookings];

    // Search by service name only
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(booking => 
        booking.serviceName?.toLowerCase().includes(query)
      );
    }

    // Filter by requested date (single date filter)
    if (requestedDate) {
      result = result.filter(booking => {
        if (!booking.date) return false;
        const bookingDate = new Date(booking.date);
        return bookingDate.toDateString() === requestedDate.toDateString();
      });
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      result = result.filter(booking => 
        booking.status?.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    return result;
  };

  // Effect to handle search and filters
  useEffect(() => {
    setFilteredBookings(filterBookings());
  }, [
    searchQuery, 
    selectedStatus, 
    requestedDate
  ]);

  // Effect to load initial data
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const bookingDocs = await getAllDocs('bookings');
        
        // Fetch all services and users first to avoid multiple requests
        const [services, users] = await Promise.all([
          getAllDocs('services'),
          getAllDocs('users')
        ]);

        // Create lookup maps for faster access
        const serviceMap = new Map(services.map(s => [s.id, s]));
        const userMap = new Map(users.map(u => [u.id, u]));

        // Enrich bookings with service and user names
        const enrichedBookings = bookingDocs.map(booking => {
          const service = booking.serviceId ? serviceMap.get(booking.serviceId) : null;
          const user = booking.userId ? userMap.get(booking.userId) : null;

          return {
            ...booking,
            serviceName: service?.name || '—',
            username: user?.username || '—',
          };
        });

        if (!mounted) return;
        setBookings(enrichedBookings || []);
        setFilteredBookings(enrichedBookings || []);
      } catch (error) {
        console.error('Error loading bookings:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);
  
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <div className="flex h-full w-full">
        {/* تم إزالة الـ SideNavBar (aside) من هنا */}

        {/* Main Content */}
        <main className="flex-1"> {/* أصبحت هي العنصر الأساسي */}
          <div className="mx-auto max-w-7xl">
            {/* PageHeading */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex min-w-72 flex-col gap-2">
                <h1 className="text-gray-900 dark:text-gray-50 text-3xl font-bold leading-tight tracking-tight">
                  Manage Booking Requests
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-base font-normal">
                  Review, confirm, and communicate with clients about their booking requests.
                </p>
              </div>
              
            </div>

            {/* Filters */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* SearchBar */}
              <div className="flex-grow">
                <label className="flex flex-col min-w-40 h-12 w-full">
                  <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                    <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center pl-4 rounded-l-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 border-r-0">
                      <span className="material-symbols-outlined">search</span>
                    </div>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-gray-100 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                      placeholder="Search by service name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </label>
              </div>
              {/* Filters */}
              <div className="flex items-center gap-3 ml-4">
                <input
                  type="date"
                  className="h-12 px-4 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700"
                  onChange={(e) => setRequestedDate(e.target.value ? new Date(e.target.value) : null)}
                  placeholder="Request Date"
                />
                <select
                  className="h-12 px-4 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
              <div className="overflow-x-auto">
                <table className="w-full min-w-max text-left">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900/50">
                      {/* <th className="p-4 w-12 text-center">
                        <input
                          className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-2 focus:ring-offset-0 focus:ring-primary/50 dark:focus:ring-offset-gray-800"
                          type="checkbox"
                        />
                      </th> */}
                      <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                        Client Name
                      </th>
                      <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                        Service
                      </th>
                      <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                        Requested Date
                      </th>
                      <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                        Submission Date
                      </th>
                      <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                        Status
                      </th>
                      <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="p-6 text-center text-gray-500">Loading bookings...</td>
                      </tr>
                    ) : (
                      (filterBookings().length === 0) ? (
                        <tr>
                          <td colSpan={7} className="p-6 text-center text-gray-500">
                            {bookings.length === 0 ? 'No bookings found.' : 'No bookings match the current filters.'}
                          </td>
                        </tr>
                      ) : (
                        filterBookings().map((b) => (
                          <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                            {/* <td className="p-4 w-12 text-center">
                              <input
                                className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-2 focus:ring-offset-0 focus:ring-primary/50 dark:focus:ring-offset-gray-800"
                                type="checkbox"
                              />
                            </td> */}
                            <td className="p-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                {/* <div className="h-2 w-2 rounded-full bg-primary"></div> */}
                                {b.username || 'Client'}
                              </div>
                            </td>
                            <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap font-normal">
                              {b.serviceName || b.serviceId || '—'}
                            </td>
                            <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap font-normal">
                              {b.date ? `${b.date}${b.time ? `, ${b.time}` : ''}` : '—'}
                            </td>
                            <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap font-normal">
                              {formatDate(b.createdAt)}
                            </td>
                            <td className="p-4 text-sm whitespace-nowrap">
                              {getStatusBadge(b.status)}
                            </td>
                            <td className="p-4 text-sm whitespace-nowrap text-right">
                              <button
                                onClick={() => handleViewDetails(b.id)}
                                className="text-primary hover:underline font-semibold"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookingContent;