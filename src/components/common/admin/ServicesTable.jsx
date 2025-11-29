import { useNavigate } from "react-router-dom";
import { formatPrice, formatDuration, formatCreatedAt } from "../../../utils/helpers.js";

export const ServicesTable = ({ services, error, handleDelete }) => {
  const navigate = useNavigate();

  if (error) {
    return <div className="py-10 text-center text-yellow-500">{error}</div>;
  }

  if (services.length === 0) {
    return (
      <div className="py-10 text-center text-gray-400">
        No matching services found.
      </div>
    );
  }

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800">
        <tr>
          <th className="px-6 py-3">Service</th>
          <th className="px-6 py-3">Category</th>
          <th className="px-6 py-3">Price</th>
          <th className="px-6 py-3">Duration</th>
          <th className="px-6 py-3">Status</th>
          <th className="px-6 py-3">Actions</th>
        </tr>
      </thead>

      <tbody>
        {services.map((service) => {
          const isActive =
            service.isActive === "Pending"
              ? "pending"
              : service.isActive
              ? "active"
              : "inactive";

          const stateClass =
            isActive === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : isActive === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800";

          const imageSrc =
            (Array.isArray(service.images) && service.images[0]) ||
            service.imageUrl ||
            null;

          return (
            <tr
              key={service.id}
              className="bg-white dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b"
            >
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                <div className="flex items-center gap-4">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={service.name}
                      className="h-12 w-12 rounded-lg object-cover border"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                      <span className="material-symbols-outlined">image</span>
                    </div>
                  )}

                  <div>
                    <p className="font-semibold">{service.name}</p>
                    <p className="text-xs text-gray-500">
                      Created: {formatCreatedAt(service.createdAt)}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4">{service.categoryName || "—"}</td>

              <td className="px-6 py-4">{formatPrice(service.price)}</td>

              <td className="px-6 py-4">{formatDuration(service.duration)}</td>

              <td className="px-6 py-4">
                <span
                  className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${stateClass}`}
                >
                  {isActive === "pending"
                    ? "Pending"
                    : isActive === "active"
                    ? "Active"
                    : "Inactive"}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      navigate(`/admin/edit-service/${service.id}`)
                    }
                    className="text-gray-500 hover:text-blue-600"
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(service.id)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
