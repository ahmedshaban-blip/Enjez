// src/hooks/useNotificationSoundListener.js
import { useEffect, useRef } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { playNotificationSound } from "../utils/playNotificationSound";

const useNotificationSoundListener = (mode = "user") => {
  const { user } = useAuth();
  const firstLoadRef = useRef(true);

  useEffect(() => {
    if (mode === "user" && (!user || !user.uid)) {
      return;
    }

    let q;
    try {
      if (mode === "user") {
        q = query(
          collection(db, "notifications"),
          where("role", "==", "user"),
          where("userId", "==", user.uid)
        );
      } else if (mode === "admin") {
        q = query(
          collection(db, "notifications"),
          where("role", "==", "admin")
        );
      } else {
        return;
      }
    } catch (err) {
      console.error(
        "Error building notifications query in sound listener:",
        err
      );
      return;
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (firstLoadRef.current) {
          firstLoadRef.current = false;
          return;
        }

        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            console.log("[sound] new notification → play");
            playNotificationSound();
          }
        });
      },
      (error) => {
        console.error(
          "Error in useNotificationSoundListener onSnapshot:",
          error
        );
      }
    );

    return () => unsubscribe();
  }, [mode, user?.uid]);
};

export default useNotificationSoundListener;
