import { useState } from "react";
import Modal from "../ui/Modal";

export default function DeleteClientModal({ client, onClose, onConfirm }) {
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setError("");
    try {
      setDeleting(true);
      await onConfirm(client.id);
      onClose();
    } catch (err) {
      setError("Failed to delete client. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Modal open={!!client} onClose={onClose} title="Delete client">
      <div className="mt-2 space-y-4">
        <p className="text-sm text-slate-700">
          Are you sure you want to delete{" "}
          <span className="font-semibold">
            {client?.username || client?.fullName || client?.email || "this client"}
          </span>
          ? This action cannot be undone.
        </p>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
            disabled={deleting}
          >
            No, cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Yes, delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
