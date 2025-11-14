
import { useMemo } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNotifications } from "../../hooks/useNotifications";
import NotificationsList from "../../components/common/notifications/NotificationsList";
import {
  deleteNotification,
  markAllAsRead,
} from "../../config/notificationService.js";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";

export default function AdminNotificationsPage() {
  const notificationsQuery = useMemo(() => {
    return query(
      collection(db, "notifications"),
      where("role", "==", "admin"),
      orderBy("createdAt", "desc")
    );
  }, []);

const { notifications, loading } = useNotifications(notificationsQuery);

  const handleBookingSeen = async (notification) => {
    try {
      console.log("clicked notification:", notification);

      const bookingId = notification.bookingId;
      const userId = notification.userId;

      if (!bookingId) {
        console.warn("notification has no bookingId");
      }

      if (!userId) {
        console.warn("notification has no userId");
      }

      const adminNotificationRef = doc(db, "notifications", notification.id);

      await updateDoc(adminNotificationRef, {
        adminSaw: true,
        adminSawAt: serverTimestamp(),
      });

      if (bookingId) {
        const bookingRef = doc(db, "bookings", bookingId);
        const bookingSnap = await getDoc(bookingRef);

        if (bookingSnap.exists()) {
          const bookingData = bookingSnap.data();

          if (!bookingData.adminSeen) {
            await updateDoc(bookingRef, {
              adminSeen: true,
              adminSeenAt: serverTimestamp(),
              status: bookingData.status || "seen_by_admin",
            });
          }
        } else {
          console.warn("Booking doc not found, skipping booking update");
        }
      }

      if (userId) {
        const serviceName =
          notification.serviceName ||
          notification.bookingSnapshot?.serviceName ||
          "your service";

        await addDoc(collection(db, "notifications"), {
          role: "user",
          userId,
          bookingId: bookingId || null,
          type: "booking_seen_by_admin",
          title: "Your booking was received by admin",
          message: `Your booking for "${serviceName}" was received. Our team will contact you as soon as possible.`,
          read: false,
          createdAt: serverTimestamp(),
        });

      } else {
        console.warn("No userId found on notification, cannot notify user");
      }

    } catch (error) {
    }
  };
    const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const handleMarkAllRead = () => {
    if (!notifications.length) return;
    markAllAsRead(notifications);
  };

  const handleDelete = (id) => {
    deleteNotification(id);
  };

 return (
  <div className="p-4">
    <div className="mb-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold">Notifications</h1>

      <button
        type="button"
        onClick={handleMarkAllRead}
        disabled={!unreadCount}
        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition ${
          unreadCount
            ? "border-slate-200 text-blue-600 hover:text-blue-700 hover:border-blue-300"
            : "border-slate-100 text-slate-400 cursor-not-allowed"
        }`}
      >
        <span className="material-symbols-outlined text-sm">done_all</span>
        <span>
          Mark all as read{unreadCount ? ` (${unreadCount})` : ""}
        </span>
      </button>
    </div>

    {loading ? (
      <div className="flex items-center justify-center h-32">
        <LoadingSpinner />
      </div>
    ) : (
      <NotificationsList
        notifications={notifications}
        onBookingSeen={handleBookingSeen}
      />
    )}
  </div>
);

}
