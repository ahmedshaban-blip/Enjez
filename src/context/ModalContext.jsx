import React, { createContext, useContext, useState } from "react";
import Modal from "../components/ui/Modal";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    visible: false,
    title: "",
    message: "",
    type: "info", // default
  });

  const showModal = (dataOrTitle, message) => {
    if (typeof dataOrTitle === "object") {
      const { title, message, type = "info" } = dataOrTitle;
      setModal({ visible: true, title, message, type });
    } else {
      setModal({ visible: true, title: dataOrTitle, message, type: "info" });
    }
  };

  const hideModal = () => {
    setModal({ visible: false, title: "", message: "", type: "info" });
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      <Modal open={modal.visible} onClose={hideModal} title={modal.title}>
        <p
          className={`text-sm font-medium ${
            modal.type === "error"
              ? "text-red-500"
              : modal.type === "success"
              ? "text-green-600"
              : "text-gray-700"
          }`}
        >
          {modal.message}
        </p>
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};

