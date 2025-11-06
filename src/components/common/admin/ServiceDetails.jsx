import React from "react";

export default function ServiceDetails({ serviceData, setServiceData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Service Details</h3>
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          Save Service
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <label>
          <p className="pb-2 font-medium">Service Name</p>
          <input
            type="text"
            name="name"
            value={serviceData.name}
            onChange={handleChange}
            placeholder="e.g. Deep Tissue Massage"
            className="form-input w-full rounded-lg border px-4 h-12"
            required
          />
        </label>

        <label>
          <p className="pb-2 font-medium">Description</p>
          <textarea
            name="description"
            value={serviceData.description}
            onChange={handleChange}
            className="form-input w-full rounded-lg border p-4 min-h-30"
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label>
            <p className="pb-2 font-medium">Price</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                type="number"
                min="0"
                name="price"
                value={serviceData.price}
                onChange={handleChange}
                className="pl-8 form-input w-full rounded-lg border h-12"
              />
            </div>
          </label>

          <label>
            <p className="pb-2 font-medium">Duration</p>
            <div className="flex gap-2">
              <input
                type="number"
                name="durationValue"
                min="0"
                value={serviceData.durationValue || ""}
                onChange={(e) =>
                  setServiceData({
                    ...serviceData,
                    durationValue: e.target.value,
                  })
                }
                className="form-input w-full rounded-lg border h-12 px-2"
              />
              <select
                name="durationUnit"
                value={serviceData.durationUnit || "minutes"}
                onChange={(e) =>
                  setServiceData({
                    ...serviceData,
                    durationUnit: e.target.value,
                  })
                }
                className="form-select rounded-lg border h-12 px-3"
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </select>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
