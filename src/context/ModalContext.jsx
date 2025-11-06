import React, { createContext, useContext, useState } from "react";
import Modal from "../components/ui/Modal";

const ModalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export  const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    visible: false,
    title: "",
    message: "",
    type: "info", // "info" | "error" | "success"
    actionLabel: "",
    onAction: null,
  });

  const showModal = (dataOrTitle, message) => {
    if (typeof dataOrTitle === "object") {
      const {
        title,
        message,
        type = "info",
        actionLabel = "",
        onAction = null,
      } = dataOrTitle;

      setModal({
        visible: true,
        title: title || "",
        message: message || "",
        type,
        actionLabel,
        onAction,
      });
      return;
    }

    setModal({
      visible: true,
      title: dataOrTitle || "",
      message: message || "",
      type: "info",
      actionLabel: "",
      onAction: null,
    });
  };

  const hideModal = () => {
    setModal({
      visible: false,
      title: "",
      message: "",
      type: "info",
      actionLabel: "",
      onAction: null,
    });
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {/* نبعت title فاضي عشان المودال نفسه ما يرسمش عنوانه */}
      <Modal open={modal.visible} onClose={hideModal} title="">
        {/* العنوان بأبيض */}
        {modal.title && (
          <h2 className="text-lg font-semibold text-white mb-3">
            {modal.title}
          </h2>
        )}

        {/* الرسالة */}
        {modal.message && (
          <p
            className={`text-sm font-medium ${
              modal.type === "error"
                ? "text-red-500"
                : modal.type === "success"
                ? "text-green-600"
                : "text-gray-200"
            }`}
          >
            {modal.message}
          </p>
        )}

        {/* زرار action */}
        {modal.actionLabel && modal.onAction && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                modal.onAction();
                hideModal();
              }}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {modal.actionLabel}
            </button>
          </div>
        )}
      </Modal>

      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
