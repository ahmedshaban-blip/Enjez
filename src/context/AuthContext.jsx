import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useLoading } from "./LoadingContext.jsx";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // Loading local for auth
  const { showLoading, hideLoading } = useLoading();
  const auth = getAuth();

  useEffect(() => {
    showLoading("Checking authentication...");

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
      setAuthLoading(false);
      hideLoading();
    });

    return () => unsubscribe();
  }, [auth]);

  if (authLoading) {
    return null; // Loading screen appear from LoadingProvider
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
