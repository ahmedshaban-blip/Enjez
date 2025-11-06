import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllDocs } from "../../utils/firebaseHelpers.js";

export default function MyBookings() {
  const { id } = useParams(); // userId
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const allBookings = await getAllDocs("bookings");
      const userBookings = allBookings.filter((b) => b.userId === id);
      setBookings(userBookings);
    };

    fetchBookings();
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li
              key={booking.id}
              className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800"
            >
              <p><strong>Service:</strong> {booking.serviceId}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
