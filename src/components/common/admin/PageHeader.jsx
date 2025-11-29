import { useNavigate } from "react-router-dom";

export const PageHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="flex flex-col gap-2">
        <p className="text-gray-900 dark:text-white text-3xl md:text-4xl font-black">
          Manage Services
        </p>
        <p className="text-gray-500 dark:text-gray-400">
          View, add, edit, and delete services available on the platform.
        </p>
      </div>

      <button
        onClick={() => navigate("/admin/add-service")}
        className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl h-14 px-6 bg-blue-600 text-white font-bold hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
        <span>Add New Service</span>
      </button>
    </div>
  );
};
