import { useMemo, useState } from "react";

export function useClientFilters(clients) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredClients = useMemo(() => {
    let result = clients.filter(
      (client) => (client.role || "user").toLowerCase() !== "admin"
    );

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter((client) => {
        const fullName = client.fullName || client.name || client.username || "";
        const email = client.email || "";
        const phone = client.phone || client.phoneNumber || "";
        return (
          fullName.toLowerCase().includes(q) ||
          email.toLowerCase().includes(q) ||
          phone.toLowerCase().includes(q)
        );
      });
    }

    if (statusFilter !== "all") {
      result = result.filter(
        (client) => (client.status || "active").toLowerCase() === statusFilter
      );
    }

    return result;
  }, [clients, searchTerm, statusFilter]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredClients,
  };
}
