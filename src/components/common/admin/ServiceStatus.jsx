import React from "react";

export default function ServiceStatus({ serviceData, setServiceData }) {
  const handleCheckbox = (e) => {
    setServiceData(prev => ({ ...prev, isActive: e.target.checked }));
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
      <h3 className="text-lg font-bold mb-4">Status</h3>
      <div className="flex items-center justify-between">
        <p className="font-medium">Service Status</p>
        <label className="relative inline-flex cursor-pointer items-center">
          <input type="checkbox" checked={serviceData.isActive} onChange={handleCheckbox} className="peer sr-only" />
          <div
            className="peer h-6 w-11 rounded-full bg-gray-200 dark:bg-gray-700
              after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full 
              after:border after:border-gray-300 after:bg-white after:transition-all 
              peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"
          ></div>
        </label>
      </div>
      <p className={`text-sm mt-2 ${serviceData.isActive ? "text-blue-600" : "text-gray-500"}`}>
        {serviceData.isActive
          ? "Service is active and available for booking."
          : "Service is inactive and hidden from users."}
      </p>
    </div>
  );
}
