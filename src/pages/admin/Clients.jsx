import { useState } from "react";
import { useClients } from "../../hooks/useClients.js";
import { useClientFilters } from "../../hooks/useClientFilters";
import ClientsHeader from "../../components/Clients/ClientsHeader.jsx";
import ClientsSearchBar from "../../components/Clients/ClientsSearchBar";
import ClientsTable from "../../components/Clients/ClientsTable";
import ClientsPagination from "../../components/Clients/ClientsPagination";
import AddClientModal from "../../components/Clients/AddClientModal";
import DeleteClientModal from "../../components/Clients/DeleteClientModal";

export default function Clients() {
  const { clients, loading, error, addClient, deleteClient } = useClients();
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredClients,
  } = useClientFilters(clients);

  const [successMessage, setSuccessMessage] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  const handleAddClient = async (formData) => {
    await addClient(formData);
    setSuccessMessage("Client created successfully.");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleDeleteClient = async (clientId) => {
    await deleteClient(clientId);
    setSuccessMessage("Client deleted successfully.");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const total = clients.filter(
    (client) => (client.role || "user").toLowerCase() !== "admin"
  ).length;

  return (
    <div className="max-w-7xl mx-auto">
      <ClientsHeader onAddClick={() => setIsAddOpen(true)} />

      {successMessage && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
          {successMessage}
        </div>
      )}

      <ClientsSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <ClientsTable
        clients={filteredClients}
        loading={loading}
        error={error}
        onDeleteClick={setClientToDelete}
      />

      <ClientsPagination shown={filteredClients.length} total={total} />

      <AddClientModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddClient}
      />

      <DeleteClientModal
        client={clientToDelete}
        onClose={() => setClientToDelete(null)}
        onConfirm={handleDeleteClient}
      />
    </div>
  );
}
