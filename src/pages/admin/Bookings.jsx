import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDocs } from '../../utils/firebaseHelpers.js';
import BookingCard from './BookingCard.jsx';
import BookingStats from './BookingStats.jsx';

const BookingContent = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [requestedDate, setRequestedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const statusCounts = useMemo(() => {
    const counts = {
      new: 0,
      confirmed: 0,
      in_progress: 0,
      completed: 0,
      cancelled: 0,
      all: bookings.length,
    };
    bookings.forEach(booking => {
      const status = booking.status?.toLowerCase() || 'new';
      if (status === 'in progress') {
        counts.in_progress++;
      } else if (counts[status] !== undefined) {
        counts[status]++;
      }
    });
    return counts;
  }, [bookings]);

  const handleViewDetails = (bookingId) => {
    navigate(`/admin/booking/view-details/${bookingId}`);
  };

  // Filter bookings based on search and filters
  useEffect(() => {
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
      result = result.filter(booking => {
        const bookingStatus = (booking.status || 'new').toLowerCase();
        if (selectedStatus === 'in_progress') {
          return bookingStatus === 'in_progress' || bookingStatus === 'in progress';
        }
        if (selectedStatus === 'cancelled') {
            return bookingStatus === 'cancelled' || bookingStatus === 'canceled';
        }
        return bookingStatus === selectedStatus;
      });
    }

    setFilteredBookings(result);
  }, [searchQuery, selectedStatus, requestedDate, bookings]);

  // Effect to load initial data
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const bookingDocs = await getAllDocs('bookings');
        
        const [services, users] = await Promise.all([
          getAllDocs('services'),
          getAllDocs('users')
        ]);

        const serviceMap = new Map(services.map(s => [s.id, s]));
        const userMap = new Map(users.map(u => [u.id, u]));

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
    <div className="relative flex min-h-screen w-full flex-col p-4">
      <div className="flex h-full w-full">
        <main className="flex-1">
          <div className="mx-auto max-w-7xl">
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

            <div className="mt-8">
              <BookingStats counts={statusCounts} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
            </div>

            <div className="mt-8 flex flex-col md:flex-row md:items-center gap-4">
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
              <div className="flex items-center gap-3 ml-0 md:ml-4">
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

            <div className="mt-6">
              {loading ? (
                <div className="p-6 text-center text-gray-500">Loading bookings...</div>
              ) : (
                filteredBookings.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    {bookings.length === 0 ? 'No bookings found.' : 'No bookings match the current filters.'}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredBookings.map((b) => (
                      <BookingCard key={b.id} booking={b} />
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookingContent;