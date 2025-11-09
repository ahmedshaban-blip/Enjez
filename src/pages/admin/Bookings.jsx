import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookingContent = () => {
  const navigate = useNavigate();
  
  const handleViewDetails = (bookingId) => {
    navigate(`/admin/booking/view-details/${bookingId}`);
  };
  
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <div className="flex h-full w-full">
        {/* تم إزالة الـ SideNavBar (aside) من هنا */}

        {/* Main Content */}
        <main className="flex-1 p-8"> {/* أصبحت هي العنصر الأساسي */}
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
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90">
                <span className="material-symbols-outlined">add</span>
                <span className="truncate">Add New Booking</span>
              </button>
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
                      placeholder="Search by client name or booking ID"
                      defaultValue="" 
                    />
                  </div>
                </label>
              </div>
              {/* Chips */}
              <div className="flex gap-3">
                <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">
                    calendar_today
                  </span>
                  <p className="text-gray-800 dark:text-gray-200 text-sm font-medium">
                    Date Range
                  </p>
                  <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">
                    expand_more
                  </span>
                </button>
                <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">
                    sell
                  </span>
                  <p className="text-gray-800 dark:text-gray-200 text-sm font-medium">Status</p>
                  <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">
                    expand_more
                  </span>
                </button>
                <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">
                    cases
                  </span>
                  <p className="text-gray-800 dark:text-gray-200 text-sm font-medium">
                    Service Type
                  </p>
                  <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">
                    expand_more
                  </span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
              <div className="overflow-x-auto">
                <table className="w-full min-w-max text-left">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900/50">
                      <th className="p-4 w-12 text-center">
                        <input
                          className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-2 focus:ring-offset-0 focus:ring-primary/50 dark:focus:ring-offset-gray-800"
                          type="checkbox"
                        />
                      </th>
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
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 font-bold text-gray-900 dark:text-gray-50">
                      <td className="p-4 w-12 text-center">
                        <input
                          className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-2 focus:ring-offset-0 focus:ring-primary/50 dark:focus:ring-offset-gray-800"
                          type="checkbox"
                        />
                      </td>
                      <td className="p-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>Jane Doe
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap font-normal">
                        Initial Consultation
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap font-normal">
                        Oct 28, 2023, 10:00 AM
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap font-normal">
                        Oct 26, 2023
                      </td>
                      <td className="p-4 text-sm whitespace-nowrap">
                        <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/50 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:text-blue-300">
                          New
                        </span>
                      </td>
                      <td className="p-4 text-sm whitespace-nowrap text-right">
                        <button 
                          onClick={() => handleViewDetails('1')}
                          className="text-primary hover:underline font-semibold"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td className="p-4 w-12 text-center">
                        <input
                          className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-2 focus:ring-offset-0 focus:ring-primary/50 dark:focus:ring-offset-gray-800"
                          type="checkbox"
                        />
                      </td>
                      <td className="p-4 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
                        John Smith
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        Full Day Package
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        Nov 5, 2023, 09:00 AM
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        Oct 25, 2023
                      </td>
                      <td className="p-4 text-sm whitespace-nowrap">
                        <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/50 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:text-green-300">
                          Confirmed
                        </span>
                      </td>
                      <td className="p-4 text-sm whitespace-nowrap text-right">
                        <button 
                          onClick={() => handleViewDetails('2')}
                          className="text-primary hover:underline font-semibold"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td className="p-4 w-12 text-center">
                        <input
                          className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-2 focus:ring-offset-0 focus:ring-primary/50 dark:focus:ring-offset-gray-800"
                          type="checkbox"
                        />
                      </td>
                      <td className="p-4 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
                        Emily White
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        Follow-up Session
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        Nov 1, 2023, 02:00 PM
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        Oct 24, 2023
                      </td>
                      <td className="p-4 text-sm whitespace-nowrap">
                        <span className="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900/50 px-2.5 py-0.5 text-xs font-semibold text-yellow-800 dark:text-yellow-300">
                          In Progress
                        </span>
                      </td>
                      <td className="p-4 text-sm whitespace-nowrap text-right">
                        <button 
                          onClick={() => handleViewDetails('3')}
                          className="text-primary hover:underline font-semibold"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td className="p-4 w-12 text-center">
                        <input
                          className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-2 focus:ring-offset-0 focus:ring-primary/50 dark:focus:ring-offset-gray-800"
                          type="checkbox"
                        />
                      </td>
                      <td className="p-4 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
                        Michael Brown
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        Initial Consultation
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        Oct 30, 2023, 11:00 AM
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        Oct 22, 2023
                      </td>
                      <td className="p-4 text-sm whitespace-nowrap">
                        <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 text-xs font-semibold text-gray-800 dark:text-gray-300">
                          Completed
                        </span>
                      </td>
                      <td className="p-4 text-sm whitespace-nowrap text-right">
                        <button 
                          onClick={() => handleViewDetails('4')}
                          className="text-primary hover:underline font-semibold"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <td className="p-4 w-12 text-center">
                        <input
                          className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-2 focus:ring-offset-0 focus:ring-primary/50 dark:focus:ring-offset-gray-800"
                          type="checkbox"
                        />
                      </td>
                      <td className="p-4 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
                        Jessica Green
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        Full Day Package
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        Nov 10, 2023, 09:00 AM
                      </td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        Oct 21, 2023
                      </td>
                      <td className="p-4 text-sm whitespace-nowrap">
                        <span className="inline-flex items-center rounded-full bg-red-100 dark:bg-red-900/50 px-2.5 py-0.5 text-xs font-semibold text-red-800 dark:text-red-300">
                          Cancelled
                        </span>
                      </td>
                      <td className="p-4 text-sm whitespace-nowrap text-right">
                        <button 
                          onClick={() => handleViewDetails('5')}
                          className="text-primary hover:underline font-semibold"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
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