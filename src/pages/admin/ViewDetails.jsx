import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDocById, updateDocById } from '../../utils/firebaseHelpers.js';
import { Timestamp } from 'firebase/firestore';

const ViewDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [service, setService] = useState(null);
  const [agent, setAgent] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [updating, setUpdating] = useState(false);

  const formatDate = (value) => {
    try {
      if (!value) return '—';
      const d = value.toDate ? value.toDate() : new Date(value);
      return d.toLocaleString(undefined, { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
    } catch (e) {
      return String(value);
    }
  };

  const statusLabel = (s) => {
    const st = (s || '').toLowerCase();
    if (st === 'confirmed') return 'Confirmed';
    if (st === 'completed') return 'Completed';
    if (st === 'cancelled' || st === 'canceled') return 'Cancelled';
    if (st === 'in progress' || st === 'in_progress') return 'In Progress';
    return 'New';
  };

  const statusClass = (s) => {
    const st = (s || '').toLowerCase();
    if (st === 'confirmed') return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
    if (st === 'in progress' || st === 'in_progress') return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
    if (st === 'completed') return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    if (st === 'cancelled' || st === 'canceled') return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
    return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
  };

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!id) return;
      try {
        // Load booking first
        const b = await getDocById('bookings', id);
        if (!mounted || !b) return;
        
        // Load all related documents in parallel
        const [serviceDoc, agentDoc, userDoc] = await Promise.all([
          b.serviceId ? getDocById('services', b.serviceId) : null,
          b.agentId ? getDocById('agents', b.agentId) : null,
          b.userId ? getDocById('users', b.userId) : null
        ]);

        if (!mounted) return;

        // Set booking with enriched data
        setBooking({
          ...b,
          serviceName: serviceDoc?.name || '—',
          username: userDoc?.username || '—',
          agentName: agentDoc?.name || '—'
        });
        
        // Keep full documents in state for additional details
        if (serviceDoc) setService(serviceDoc);
        if (agentDoc) setAgent(agentDoc);
        if (userDoc) setUser(userDoc);

      } catch (error) {
        console.error('Error loading booking details:', error);
      }
    };
    load();
    return () => { mounted = false; };
  }, [id]);

  // Extracted update function for status so the button can call it directly
  const handleUpdateStatus = async () => {
    if (!id) return;
    const newStatus = selectedStatus || booking?.status;
    if (!newStatus || newStatus === booking?.status) return;
    try {
      setUpdating(true);
      await updateDocById('bookings', id, { status: newStatus, updatedAt: Timestamp.now() });
      setBooking((prev) => ({ ...(prev || {}), status: newStatus }));
      console.log('Status updated to', newStatus);
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setUpdating(false);
    }
  };
  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs & Page Header */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-wrap gap-2 items-center">
            <Link
              className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal"
              to="/admin/bookings"
            >
              All Bookings
            </Link>
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">
              /
            </span>
            <span className="text-gray-900 dark:text-white text-sm font-medium leading-normal">
              Booking #{id}
            </span>
          </div>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <p className="text-gray-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
              Booking #{id}
            </p>
              <div className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 ${statusClass(booking?.status)}`}>
                <p className="text-sm font-medium leading-normal">
                  {statusLabel(booking?.status)}
                </p>
              </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Booking Details */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Customer Details Card */}
            <div className="bg-white dark:bg-background-dark dark:border dark:border-gray-800 rounded-xl shadow-sm">
              <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                Customer Details
              </h2>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Client Name</p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">{user?.username || '—'}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">{user?.email || booking?.email || '—'}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">{booking?.phone || user?.phone || '—'}</p>
                </div>
                <div className="flex flex-col gap-1 md:col-span-2">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Client Notes</p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">{booking?.notes || '—'}</p>
                </div>
              </div>
            </div>

            {/* Service & Booking Details Card */}
            <div className="bg-white dark:bg-background-dark dark:border dark:border-gray-800 rounded-xl shadow-sm">
              <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                Service & Booking Details
              </h2>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Service Name</p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">{service?.name || booking?.serviceName || booking?.serviceId || '—'}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Assigned Staff</p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">{agent?.name || booking?.agentName || booking?.agentId || '—'}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date & Time</p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">{booking?.date ? `${booking.date}${booking.time ? ` at ${booking.time}` : ''}` : booking?.requestedAt ? formatDate(booking.requestedAt) : '—'}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">{service?.duration || booking?.duration || '—'}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Price</p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">{service?.price ? `$${service.price}` : (booking?.price ? `$${booking.price}` : '—')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Actions */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            {/* Status Update Card */}
            <div className="bg-white dark:bg-background-dark dark:border dark:border-gray-800 rounded-xl shadow-sm">
              <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                Update Status
              </h2>
              <div className="p-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-sm font-medium text-gray-500 dark:text-gray-400"
                    htmlFor="status-select"
                  >
                    Booking Status
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-2  dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-primary"
                    id="status-select"
                    value={selectedStatus || booking?.status || 'new'}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="new">New</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <button
                  onClick={handleUpdateStatus}
                  disabled={updating || (selectedStatus === booking?.status)}
                  className={`w-full font-semibold py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${updating ? 'bg-gray-400 text-white' : 'bg-primary text-white hover:bg-primary/90'} dark:focus:ring-offset-background-dark`}
                >
                  {updating ? 'Updating...' : 'Update Status'}
                </button>
              </div>
            </div>

            {/* Internal Notes Card */}
            <div className="bg-white dark:bg-background-dark dark:border dark:border-gray-800 rounded-xl shadow-sm">
              <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                Internal Notes
              </h2>
              <div className="p-6 flex flex-col gap-4">
                <textarea
                  className="w-full h-24 rounded-lg border border-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-primary focus:ring-primary"
                  placeholder=" Add a private note for your team..." 
                  rows="4"
                ></textarea>
                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-2.5 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-offset-background-dark">
                  Save Note
                </button>
              </div>
            </div>

            {/* History Card */}
            <div className="bg-white dark:bg-background-dark dark:border dark:border-gray-800 rounded-xl shadow-sm">
              <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                History
              </h2>
              <ul className="p-6 flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 size-5 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm text-green-600 dark:text-green-400">
                      check
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      Status changed to{' '}
                      <span className="font-bold text-green-600 dark:text-green-400">
                        Confirmed
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      By Admin Name on Oct 25, 2023
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 size-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm text-gray-600 dark:text-gray-400">
                      note_alt
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      Note added by Jane Doe
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      "Client confirmed via phone. All set."
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 size-5 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm text-blue-600 dark:text-blue-400">
                      fiber_new
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      Booking created
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      By Eleanor Vance on Oct 24, 2023
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ViewDetails;