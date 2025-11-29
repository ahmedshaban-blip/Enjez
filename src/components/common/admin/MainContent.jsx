import React from "react";
import { PageHeader } from "./PageHeader";
import { ServicesToolbar } from "./ServicesToolbar";
import { ServicesTable } from "./ServicesTable";
import Pagination from "./AdminPagination";

const MainContent = ({
  services,
  error,
  allServices,
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  total,
  currentPage,
  setCurrentPage,
  perPage,
  handleDelete,
}) => {
  return (
    <main className="flex-1">
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
            <ServicesTable
              services={services}
              error={error}
              handleDelete={handleDelete}
            />
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

export default MainContent;
