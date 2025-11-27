import React, { createContext, useContext, useState } from "react";
import Modal from "../components/ui/Modal";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    visible: false,
    title: "",
    message: "",
    type: "info",
    confirmLabel: "",
    onConfirm: null,
  });

  const showModal = (data) => {
    const {
      title = "",
      message = "",
      type = "info",
      confirmLabel = "",
      onConfirm = null,
    } = data;

    setModal({
      visible: true,
      title,
      message,
      type,
      confirmLabel,
      onConfirm,
    });
  };

  const hideModal = () => {
    setModal({
      visible: false,
      title: "",
      message: "",
      type: "info",
      confirmLabel: "",
      onConfirm: null,
    });
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      <Modal open={modal.visible} onClose={hideModal} title="">
        
        {/* Title */}
        {modal.title && (
          <h2 className="text-lg font-semibold text-black mb-3">
            {modal.title}
          </h2>
        )}

        {/* Message */}
        {modal.message && (
          <p
            className={`text-sm ${
              modal.type === "error"
                ? "text-red-400"
                : modal.type === "success"
                ? "text-green-300"
                : "text-gray-800"
            }`}
          >
            {modal.message}
          </p>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={hideModal}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>

          {modal.confirmLabel && modal.onConfirm && (
            <button
              onClick={() => {
                modal.onConfirm();
                hideModal();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              {modal.confirmLabel}
            </button>
          )}
        </div>
      </Modal>

      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;

