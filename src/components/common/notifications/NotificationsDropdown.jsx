import { useMemo } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuth } from "../../../context/AuthContext";
import { useNotifications } from "../../../hooks/useNotifications";
import { deleteNotification, markAllAsRead } from "../../../config/notificationService.js";
import NotificationsList from "./NotificationsList.jsx";

export const mockNotifications = [];

export default function NotificationsDropdown({ open, onNavigate, allNotificationsPath = "/notifications" }) {
  const { user } = useAuth();
  
  // Create Firestore query for user notifications
  const notificationsQuery = useMemo(() => query(collection(db, "notifications"), where("role", "==", "user"), where("userId", "==", user.uid), orderBy("createdAt", "desc")), [user.uid]);
  
  // Fetch notifications
  const { notifications, loading } = useNotifications(notificationsQuery);
  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  if (!open) return null;

  return (
    
    <div className={`
      fixed top-24 left-1/2 -translate-x-1/2 z-50 w-[85vw] sm:w-96
      md:absolute md:top-14 md:right-0 md:left-auto md:translate-x-0
      origin-top md:origin-top-right rounded-2xl bg-white shadow-2xl shadow-blue-900/10 
      ring-1 ring-black/5 focus:outline-none animate-in fade-in zoom-in-95 duration-200 overflow-hidden
    `}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 bg-white">
        <div>
          <h3 className="text-base font-bold text-slate-900">Notifications</h3>
          <p className="text-xs font-medium text-slate-500 mt-0.5">{loading ? "Checking..." : unreadCount ? <span className="text-blue-600 font-semibold">You have {unreadCount} unread messages</span> : "You're all caught up"}</p>
        </div>
        <button type="button" onClick={() => notifications.length && markAllAsRead(notifications)} disabled={!unreadCount} className={`group flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${unreadCount ? "text-blue-600 hover:bg-blue-50 cursor-pointer" : "text-slate-300 cursor-default"}`} title="Mark all as read">
          <span className={`material-symbols-outlined text-[18px] ${unreadCount ? "text-blue-600" : "text-slate-300"}`}>done_all</span><span className={unreadCount ? "group-hover:underline" : ""}>Mark read</span>
        </button>
      </div>

      {/* List Body */}
      <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent bg-white">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12"><div className="h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /><p className="mt-3 text-xs font-medium text-slate-400">Loading updates...</p></div>
        ) : (
          <NotificationsList notifications={notifications} onDelete={(id) => deleteNotification(id)} compact className="divide-y divide-slate-50" emptyMessage="No new notifications at the moment." />
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 bg-slate-50 p-2">
        <Link to={allNotificationsPath} onClick={onNavigate} className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-blue-600 hover:text-white hover:ring-blue-600 hover:shadow-md active:scale-[0.98]">View All Notifications <span className="material-symbols-outlined text-lg">arrow_forward</span></Link>
      </div>
    </div>
  );
}