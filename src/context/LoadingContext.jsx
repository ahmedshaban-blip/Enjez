import React, { createContext, useContext, useState } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState({ visible: false, text: "" });

  const showLoading = (text = "Loading...") => {
    setLoading({ visible: true, text });
  };

  const hideLoading = () => {
    setLoading({ visible: false, text: "" });
  };

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {loading.visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <LoadingSpinner text={loading.text} size="lg" />
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};
