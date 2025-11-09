import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function AddClientModal({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in username, email, and password.");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit(formData);
      setFormData({ username: "", email: "", password: "", role: "user" });
      onClose();
    } catch (err) {
      setError("Failed to create client. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Add new client">
      <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
        <Input
          id="new-client-name"
          label="Full name"
          placeholder="Jane Doe"
          value={formData.username}
          onChange={(e) => handleChange("username", e.target.value)}
          required
        />
        <Input
          id="new-client-email"
          label="Email"
          type="email"
          placeholder="client@example.com"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
        <Input
          id="new-client-password"
          label="Password"
          type="password"
          placeholder="********"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
        />
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Role
          </label>
          <select
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-300"
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Administrator</option>
          </select>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
            disabled={submitting}
          >
            Cancel
          </button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Create client"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
