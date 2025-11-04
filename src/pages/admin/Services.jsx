import React from 'react';

const ManageServicesPage = () => {
  return (
    <div className="relative flex min-h-screen w-full overflow-hidden">
      <MainContent />
    </div>
  );
};




const MainContent = () => {
  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">
        <PageHeader />
        <div className="bg-white dark:bg-gray-900/50 rounded-lg sm:rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <ServicesToolbar />
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            <ServicesTable />
          </div>
          <Pagination />
        </div>
      </div>
    </main>
  );
};


const PageHeader = () => {
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
      <button className="w-full md:w-auto flex items-center justify-center gap-2 overflow-hidden rounded-xl h-14 px-6 bg-blue-600 text-white text-base font-bold leading-normal tracking-[0.015em] shadow-sm hover:bg-blue-700 focus:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all">
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
        <div className="flex-1">
             <label className="flex flex-col w-full">
            <div className="group flex w-full flex-1 items-stretch rounded-lg bg-gray-100 dark:bg-gray-800 transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700">
              <div className="flex items-center justify-center pl-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors duration-200">
                <span className="material-symbols-outlined text-xl">search</span>
              </div>
              <input
                className="h-10 flex w-full min-w-0 flex-1 bg-transparent px-4 text-base font-medium text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 border-none rounded-r-lg transition-all duration-200"
                placeholder="Search by service name..."
                defaultValue=""
              />
            </div>
          </label>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button className="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors md:w-auto w-full">
            <p className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal">
              Category
            </p>
            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-xl">
              expand_more
            </span>
          </button>
          <button className="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors md:w-auto w-full">
            <p className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal">
              Status
            </p>
            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-xl">
              expand_more
            </span>
          </button>
          <button className="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors md:w-auto w-full">
            <p className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal">
              Visibility
            </p>
            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-xl">
              expand_more
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};


const ServicesTable = () => {
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
              Service Name
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
          <tr className="bg-white dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b dark:border-gray-800">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-1"
                  type="checkbox"
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-table-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Deep Tissue Massage
            </th>
            <td className="px-6 py-4">Wellness</td>
            <td className="px-6 py-4">$120</td>
            <td className="px-6 py-4">60 min</td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Active
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
          <tr className="bg-white dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b dark:border-gray-800">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-2"
                  type="checkbox"
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-table-2" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Business Consultation
            </th>
            <td className="px-6 py-4">Consulting</td>
            <td className="px-6 py-4">$250/hr</td>
            <td className="px-6 py-4">60 min</td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Active
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
          <tr className="bg-white dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b dark:border-gray-800">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-3"
                  type="checkbox"
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-table-3" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Yoga Class (Group)
            </th>
            <td className="px-6 py-4">Fitness</td>
            <td className="px-6 py-4">$25</td>
            <td className="px-6 py-4">75 min</td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                Inactive
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
          <tr className="bg-white dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-4"
                  type="checkbox"
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-table-4" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Web Design Package
            </th>
            <td className="px-6 py-4">Digital</td>
            <td className="px-6 py-4">$1500</td>
            <td className="px-6 py-4">Project</td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                Pending
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
        </tbody>
      </table>
    </div>
  );
};

// أزرار التنقل بين الصفحات
const Pagination = () => {
  return (
    <nav
      className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 text-center sm:text-left">
        Showing{' '}
        <span className="font-semibold text-gray-900 dark:text-white">1-4</span>{' '}
        of{' '}
        <span className="font-semibold text-gray-900 dark:text-white">100</span>
      </span>
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <a
            href="#"
            className="px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white flex items-center"
          >
            Previous
          </a>
        </li>
        <li>
          <a
            href="#"
            className="px-2 sm:px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white flex items-center"
          >
            1
          </a>
        </li>
        <li>
          <a
            href="#"
            className="z-10 px-2 sm:px-3 h-8 leading-tight text-primary border border-primary bg-primary/10 hover:bg-primary/20 dark:border-gray-700 dark:bg-gray-700 dark:text-white flex items-center"
            aria-current="page"
          >
            2
          </a>
        </li>
        <li>
          <a
            href="#"
            className="px-2 sm:px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white flex items-center"
          >
            3
          </a>
        </li>
        <li>
          <a
            href="#"
            className="px-2 sm:px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white flex items-center"
          >
            <span className="material-symbols-outlined text-sm sm:text-base">chevron_right</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default ManageServicesPage;