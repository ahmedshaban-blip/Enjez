"use client";
import React from "react";

const Pagination = ({ total, perPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(total / perPage) || 1;

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
      {/* Showing numbers */}
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 text-center sm:text-left">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {(currentPage - 1) * perPage + 1}-
          {Math.min(currentPage * perPage, total)}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {total}
        </span>
      </span>

      {/* Pagination buttons */}
      <ul className="inline-flex items-center -space-x-px">
        {/* Previous */}
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

        {/* Pages */}
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => setCurrentPage(page)}
              className={`px-3 h-8 leading-tight border flex items-center justify-center ${
                currentPage === page
                  ? "z-10 text-blue-600 border-blue-600 bg-blue-100 dark:bg-blue-900/40 dark:text-white"
                  : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Next */}
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
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
