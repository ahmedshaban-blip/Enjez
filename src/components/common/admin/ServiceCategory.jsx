import React from "react";

export default function ServiceCategory({ serviceData, setServiceData, categories }) {
  const handleChange = (e) => {
    setServiceData(prev => ({ ...prev, categoryId: e.target.value }));
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
      <h3 className="text-lg font-bold mb-4">Category</h3>
      <select
        name="categoryId"
        value={serviceData.categoryId}
        onChange={handleChange}
        className="form-select w-full rounded-lg border px-4 h-12"
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
    </div>
  );
}
