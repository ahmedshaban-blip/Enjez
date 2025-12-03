import { useEffect, useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { getAllDocs, createUser, createAuthUser } from "../utils/firebaseHelpers.js";
import { db } from "../config/firebase.js";

export function useClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadClients = async () => {
      try {
        const data = await getAllDocs("users");

        if (!isMounted) return;

        if (Array.isArray(data)) {
          setClients(data);
          setError("");
        } else {
          setClients([]);
          setError("No users found in Firestore.");
        }
      } catch (err) {
        console.error("Failed to load clients:", err);
        if (isMounted) {
          setError("Unable to load clients. Please try again later.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadClients();

    return () => {
      isMounted = false;
    };
  }, []);

  const addClient = async (clientData) => {
    try {
      // 1. Create Auth User (Secondary App)
      // We assume clientData has email and password.
      // If password is not provided, we might need to generate one or handle it.
      // For now, assuming the form provides it.
      if (!clientData.email || !clientData.password) {
        throw new Error("Email and password are required to create a client.");
      }

      const newUid = await createAuthUser(clientData.email, clientData.password);

      // 2. Create Firestore Document with the SAME UID
      const createdAt = new Date().toISOString(); // Use ISO string for consistency with Signup.jsx
      const newUserData = {
        username: clientData.username,
        email: clientData.email,
        role: clientData.role || "user",
        status: "active",
        createdAt,
        // We don't store password in Firestore
      };

      await createUser(newUserData, newUid);

      setClients((prev) => [...prev, { id: newUid, ...newUserData }]);
      return newUid;
    } catch (err) {
      console.error("Error adding client:", err);
      throw err;
    }
  };

  const deleteClient = async (clientId) => {
    await deleteDoc(doc(db, "users", clientId));
    setClients((prev) => prev.filter((c) => c.id !== clientId));
  };

  return {
    clients,
    loading,
    error,
    addClient,
    deleteClient,
  };
}
