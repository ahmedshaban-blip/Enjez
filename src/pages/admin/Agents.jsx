import { useEffect, useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../config/firebase.js";
import Pagination from "../../components/common/admin/AdminPagination.jsx";
import {
  getAllAgents,
  addAgent,
  updateAgentById,
  deleteAgentById,
  getAllServices,
} from "../../utils/firebaseHelpers.js";
import { useLoading } from "../../context/LoadingContext.jsx";
import { useModal } from "../../context/ModalContext.jsx";
import ServicesComponents from "../../components/common/admin/ServicesComponents.jsx";

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [services, setServices] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [editId, setEditId] = useState("");

  const [agentData, setAgentData] = useState({
    services: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const [resetSearch, setResetSearch] = useState(false);

  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  // Load agents + services
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    showLoading("Loading Agents...");
    const agentsData = await getAllAgents();
    const serviceData = await getAllServices();
    setAgents(agentsData);
    setServices(serviceData);
    hideLoading();
  };

  // Sync logic for Service.agents array
  const syncServiceAgents = async (agentId, newServices, oldServices = []) => {
    const removed = oldServices.filter((s) => !newServices.includes(s));
    const added = newServices.filter((s) => !oldServices.includes(s));

    // Remove agent from removed services
    for (const srvId of removed) {
      const serviceRef = doc(db, "services", srvId);
      await updateDoc(serviceRef, {
        agents: arrayRemove(agentId),
      });
    }

    // Add agent to added services
    for (const srvId of added) {
      const serviceRef = doc(db, "services", srvId);
      await updateDoc(serviceRef, {
        agents: arrayUnion(agentId),
      });
    }
  };

  // Save agent
  const handleSave = async () => {
    if (!name.trim()) return alert("Enter agent name");

    const newServices = agentData.services;

    showLoading(editId ? "Updating agent..." : "Adding agent...");

    let agentId = editId;
    let oldServices = [];

    if (editId) {
      // Fetch old data
      const oldAgent = agents.find((a) => a.id === editId);
      oldServices = oldAgent?.services || [];

      await updateAgentById(editId, {
        name,
        email,
        phone,
        services: newServices,
      });
    } else {
      const newAgent = await addAgent(name, email, phone, newServices);
      agentId = newAgent.id;
    }

    // Sync services → agents
    await syncServiceAgents(agentId, newServices, oldServices);

    resetForm();
    await loadData();
    hideLoading();

    showModal({
      title: "Success",
      message: editId ? "Agent updated." : "Agent added.",
      type: "success",
    });
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAgentData({ services: [] });
    setEditId("");
    setResetSearch((prev) => !prev);
  };

  const handleEdit = (agent) => {
    setEditId(agent.id);
    setName(agent.name);
    setEmail(agent.email || "");
    setPhone(agent.phone || "");
    setAgentData({ services: agent.services || [] });
  };

  const confirmDelete = async (id) => {
    showLoading("Deleting agent...");

    // إزالة الـ Agent من كل Service مسجل فيها
    const agent = agents.find((a) => a.id === id);
    if (agent?.services) {
      for (const srvId of agent.services) {
        const serviceRef = doc(db, "services", srvId);
        await updateDoc(serviceRef, {
          agents: arrayRemove(id),
        });
      }
    }

    await deleteAgentById(id);
    await loadData();
    hideLoading();
  };

  const handleDelete = (id) => {
    showModal({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this agent?",
      type: "error",
      confirmLabel: "Delete",
      onConfirm: () => confirmDelete(id),
    });
  };

  // Pagination
  const start = (currentPage - 1) * perPage;
  const paginated = agents.slice(start, start + perPage);

  return (
    <div className="px-6 py-2 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Agents</h1>

      {/* FORM */}
      <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold mb-3">
            {editId ? "Edit Agent" : "Add New Agent"}
          </h2>
          <button
            onClick={handleSave}
            className="px-6 h-12  bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Save Agent
          </button>
        </div>
        <div className="flex gap-3">
          <input
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Agent name..."
            className="h-12 px-4 flex-1 rounded-lg bg-gray-100 dark:bg-gray-800"
          />

          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email..."
            className="h-12 px-4 flex-1 rounded-lg bg-gray-100 dark:bg-gray-800"
          />

          <input
            value={phone}
            type="tel"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone..."
            className="h-12 px-4 flex-1 rounded-lg bg-gray-100 dark:bg-gray-800"
          />
        </div>

        {/* SERVICES SELECTOR */}
        <div className="mt-6">
          <ServicesComponents
            agentData={agentData}
            setAgentData={setAgentData}
            resetSearch={resetSearch}
          />

          {editId && (
            <button
              onClick={resetForm}
              className="mt-3 text-sm text-gray-500 hover:text-gray-800"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Services</th>
              <th className="px-6 py-3">Created</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-400">
                  No agents found.
                </td>
              </tr>
            ) : (
              paginated.map((agent) => {
                const serviceNames =
                  agent.services?.map(
                    (srvId) =>
                      services.find((s) => s.id === srvId)?.name || "Unknown"
                  ) || [];

                return (
                  <tr
                    key={agent.id}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4">{agent.name}</td>
                    <td className="px-6 py-4">{agent.email || "—"}</td>
                    <td className="px-6 py-4">{agent.phone || "—"}</td>

                    <td className="px-6 py-4">
                      {serviceNames.length > 0
                        ? serviceNames.join(", ")
                        : "No services"}
                    </td>

                    <td className="px-6 py-4">
                      {agent.createdAt?.seconds
                        ? new Date(
                            agent.createdAt.seconds * 1000
                          ).toLocaleDateString()
                        : "—"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(agent)}
                          className="text-gray-500 hover:text-blue-600"
                        >
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </button>

                        <button
                          onClick={() => handleDelete(agent.id)}
                          className="text-gray-500 hover:text-red-600"
                        >
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        total={agents.length}
        perPage={perPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Agents;
