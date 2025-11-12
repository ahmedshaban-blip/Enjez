import { doc, deleteDoc, updateDoc, writeBatch } from "firebase/firestore";
import { db } from "../config/firebase";

export const deleteNotification = async (id) => {
  try {
    await deleteDoc(doc(db, "notifications", id));
  } catch (error) {
    console.error("Error deleting notification: ", error);
  }
};

export const markAllAsRead = async (notifications) => {
  const batch = writeBatch(db);

  notifications.forEach((notification) => {
    if (!notification.read) {
      const docRef = doc(db, "notifications", notification.id);
      batch.update(docRef, { read: true });
    }
  });

  try {
    await batch.commit();
  } catch (error) {
    console.error("Error marking all as read: ", error);
  }
};
