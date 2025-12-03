import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();

  const getStatusInfo = (status) => {
    const s = (status || 'new').toLowerCase();
    switch (s) {
      case 'confirmed':
        return {
          badge: 'bg-green-100 text-green-800 border-green-200',
          text: 'Confirmed',
        };
      case 'in progress':
      case 'in_progress':
        return {
          badge: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          text: 'In Progress',
        };
      case 'completed':
        return {
          badge: 'bg-gray-100 text-gray-800 border-gray-200',
          text: 'Completed',
        };
      case 'cancelled':
      case 'canceled':
        return {
          badge: 'bg-red-100 text-red-800 border-red-200',
          text: 'Cancelled',
        };
      default:
        return {
          badge: 'bg-blue-100 text-blue-800 border-blue-200',
          text: 'New Request',
        };
    }
  };

  const { badge, text: statusText } = getStatusInfo(booking.status);

  const formatDate = (value) => {
    try {
      if (!value) return 'Not set';
      const d = value.toDate ? value.toDate() : new Date(value);
      return d.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch (e) {
      return String(value);
    }
  };

  const handleViewDetails = () => {
    navigate(`/admin/booking/view-details/${booking.id}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-3">
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${badge}`}
          >
            {statusText}
          </span>
          <p className="text-xs text-gray-500">#{booking.id.slice(0, 6)}</p>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
          {booking.serviceName || 'Service Not Found'}
        </h3>
        <p className="text-sm text-gray-600 font-medium flex items-center mb-4">
          <User className="w-4 h-4 mr-2 text-gray-400" />
          {booking.username || 'Client Not Found'}
        </p>

        <div className="space-y-3 text-sm">
          <div className="flex items-center text-gray-700">
            <Calendar className="w-4 h-4 mr-2.5 text-gray-400" />
            <span className="font-semibold">
              {booking.date ? `${booking.date}${booking.time ? `, ${booking.time}` : ''}` : 'Date TBD'}
            </span>
          </div>
          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-2.5 text-gray-400" />
            Submitted on {formatDate(booking.createdAt)}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 bg-gray-50 p-4 rounded-b-lg">
        <button
          onClick={handleViewDetails}
          className="w-full flex items-center justify-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 group"
        >
          View Details
          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default BookingCard;