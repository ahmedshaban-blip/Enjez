// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": "ASMNSon_EWlL012WLGlpjgxbt6mdFWLDxgM1G2CqXszk13KJ66774zXDj0mnIiIwHYsct9URNS8tSWkW", 
  currency: "USD", 
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <ModalProvider>
          <PayPalScriptProvider options={initialOptions}>
            <App />
          </PayPalScriptProvider>
        </ModalProvider>
      </AuthProvider>
    </LoadingProvider>
  </React.StrictMode>
);
