import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ViewDetails = () => {
  const { id } = useParams();
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
            <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 px-4">
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium leading-normal">
                New
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
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Client Name
                  </p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                    Eleanor Vance
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email Address
                  </p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                    eleanor@example.com
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Phone Number
                  </p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                    (555) 123-4567
                  </p>
                </div>
                <div className="flex flex-col gap-1 md:col-span-2">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Client Notes
                  </p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                    Please be aware of a friendly cat in the house. No allergies, just a heads up!
                  </p>
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
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Service Name
                  </p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                    Deep Cleaning Service
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Assigned Staff
                  </p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                    Marcus Holloway
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Date & Time
                  </p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                    October 26, 2023 at 10:00 AM
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Duration
                  </p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                    3 hours
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Price
                  </p>
                  <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                    $150.00
                  </p>
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
                  >
                    <option>New</option>
                    <option>Confirmed</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
                <button className="w-full bg-primary text-white bg-blue-600 font-semibold py-2.5 px-4 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background-dark">
                  Update Status
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