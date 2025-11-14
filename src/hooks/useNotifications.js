// src/hooks/useNotifications.js
import { useState, useEffect } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";
import { playNotificationSound } from "../utils/playNotificationSound";

export const useNotifications = (firestoreQuery) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firestoreQuery) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      firestoreQuery,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching notifications:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestoreQuery]);

  return { notifications, loading };
};
