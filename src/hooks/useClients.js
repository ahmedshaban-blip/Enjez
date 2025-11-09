import { useEffect, useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { getAllDocs, createUser } from "../utils/firebaseHelpers.js";
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
    const createdAt = new Date();
    const newUserData = {
      ...clientData,
      status: "active",
      createdAt,
    };

    const newId = await createUser(newUserData);
    setClients((prev) => [...prev, { id: newId, ...newUserData }]);
    return newId;
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
