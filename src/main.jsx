// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Context Providers
import { AuthProvider } from "./context/AuthContext.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadingProvider>
      <AuthProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
      </AuthProvider> 
    </LoadingProvider> 
  </React.StrictMode>
);
