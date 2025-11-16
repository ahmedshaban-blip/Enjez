import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";

export default function ServicesSelector({
  agentData,
  setAgentData,
  resetSearch,
}) {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);

  // Load services from Firestore
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snapshot = await getDocs(collection(db, "services"));
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServices(list);
        setFilteredServices(list);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  // Filter search
  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    setFilteredServices(
      services.filter(
        (s) => s.name?.toLowerCase().includes(lower)
      )
    );
  }, [searchTerm]);

  // Reset search when parent triggers reset
  useEffect(() => {
    setSearchTerm("");
  }, [resetSearch]);

  // Add service to agentData
  const handleSelectService = (service) => {
    if (!agentData.services.includes(service.id)) {
      setAgentData({
        ...agentData,
        services: [...agentData.services, service.id],
      });
    }
  };

  // Remove service chip
  const handleRemoveService = (id) => {
    setAgentData({
      ...agentData,
      services: agentData.services.filter((s) => s !== id),
    });
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
      <h3 className="text-lg font-bold mb-4">Assign Services to Agent</h3>

      {/* Search */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          search
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search services..."
          className="pl-10 form-input w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 h-12"
        />
      </div>

      {/* Dropdown List */}
      {searchTerm && (
        <div className="mt-3 border border-gray-200 dark:border-gray-700 rounded-lg max-h-40 overflow-y-auto">
          {filteredServices.length > 0 ? (
            filteredServices.map((srv) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => handleSelectService(srv)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <p className="font-medium text-sm">{srv.name}</p>
              </button>
            ))
          ) : (
            <p className="p-3 text-sm text-center text-gray-500">
              No services found.
            </p>
          )}
        </div>
      )}

      {/* Selected Services Chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {agentData.services.map((srvId) => {
          const service = services.find((s) => s.id === srvId);
          if (!service) return null;

          return (
            <div
              key={service.id}
              className="flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-900/30 py-1 pl-3 pr-2 text-green-700 dark:text-green-400"
            >
              <span className="text-sm font-medium">{service.name}</span>

              <button
                onClick={() => handleRemoveService(service.id)}
                className="rounded-full hover:bg-black/10 dark:hover:bg-white/20 p-0.5"
              >
                <span className="material-symbols-outlined !text-base">
                  close
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
