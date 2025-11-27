import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase.js";

export default function ProvidersSelector({
  serviceData,
  setServiceData,
  resetSearch,
}) {
  const [agents, setAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAgents, setFilteredAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "agents"));
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAgents(list);
        setFilteredAgents(list);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };
    fetchAgents();
  }, []);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    setFilteredAgents(
      agents.filter(
        (a) =>
          a.name?.toLowerCase().includes(lower) ||
          a.email?.toLowerCase().includes(lower)
      )
    );
  }, [searchTerm]);

  // Reset searchTerm when resetSearch changes
  useEffect(() => {
    setSearchTerm("");
  }, [resetSearch]);

  const handleSelectAgent = (agent) => {
    if (!serviceData.agents.includes(agent.id)) {
      setServiceData({
        ...serviceData,
        agents: [...serviceData.agents, agent.id],
      });
    }
  };

  const handleRemoveAgent = (agentId) => {
    setServiceData({
      ...serviceData,
      agents: serviceData.agents.filter((id) => id !== agentId),
    });
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
      <h3 className="text-lg font-bold mb-4">Link Service Agents</h3>

      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          search
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by agent name or email..."
          className="pl-10 form-input w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 h-12"
        />
      </div>

      {searchTerm && (
        <div className="mt-3 border border-gray-200 dark:border-gray-700 rounded-lg max-h-40 overflow-y-auto">
          {filteredAgents.length > 0 ? (
            filteredAgents.map((agent) => (
              <button
                type="button"
                key={agent.id}
                onClick={() => handleSelectAgent(agent)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <p className="font-medium text-sm">{agent.name}</p>
                <p className="text-xs text-gray-500">{agent.email}</p>
              </button>
            ))
          ) : (
            <p className="p-3 text-sm text-gray-500 text-center">
              No providers found.
            </p>
          )}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {serviceData.agents.map((agentId) => {
          const agent = agents.find((a) => a.id === agentId);
          if (!agent) return null;
          return (
            <div
              key={agent.id}
              className="flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 py-1 pl-3 pr-2 text-blue-600 dark:text-blue-400"
            >
              <span className="text-sm font-medium">{agent.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveAgent(agent.id)}
                className="rounded-full hover:bg-black/10 dark:hover:bg-white/20 p-0.5"
              >
                <span className="material-symbols-outlined !text-base">
                  close
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
