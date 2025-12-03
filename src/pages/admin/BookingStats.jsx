import React from 'react';

const StatCard = ({ label, count, color, onSelect, isSelected }) => (
  <div
    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
      isSelected
        ? `bg-${color}-100 border-${color}-300 ring-2 ring-${color}-500`
        : `bg-white border border-gray-200 hover:bg-gray-50`
    }`}
    onClick={() => onSelect(label.toLowerCase().replace(' ', '_'))}
  >
    <div className="flex justify-between items-center">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <span className={`text-xl font-bold ${isSelected ? `text-${color}-600` : 'text-gray-800'}`}>
        {count}
      </span>
    </div>
  </div>
);

const BookingStats = ({ counts, selectedStatus, setSelectedStatus }) => {
  const stats = [
    { label: 'All', count: counts.all, color: 'gray' },
    { label: 'New', count: counts.new, color: 'blue' },
    { label: 'Confirmed', count: counts.confirmed, color: 'green' },
    { label: 'In Progress', count: counts.in_progress, color: 'yellow' },
    { label: 'Completed', count: counts.completed, color: 'gray' },
    { label: 'Cancelled', count: counts.cancelled, color: 'red' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {stats.map(stat => (
        <StatCard
          key={stat.label}
          label={stat.label}
          count={stat.count}
          color={stat.color}
          onSelect={setSelectedStatus}
          isSelected={selectedStatus === stat.label.toLowerCase().replace(' ', '_')}
        />
      ))}
    </div>
  );
};

export default BookingStats;
