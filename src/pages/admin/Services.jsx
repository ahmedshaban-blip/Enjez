import { useEffect, useState, useMemo } from "react";
import { getAllDocs, deleteServiceById } from "../../utils/firebaseHelpers";
import { useLoading } from "../../context/LoadingContext.jsx";
import { useModal } from "../../context/ModalContext.jsx";
import MainContent from "../../components/common/admin/MainContent";

const ManageServicesPage = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  // Load services + merge category names
  const loadData = async () => {
    try {
      showLoading("Loading services...");
      const servicesData = await getAllDocs("services");
      const categoriesData = await getAllDocs("categories");

      const catMap = {};
      categoriesData.forEach((c) => {
        catMap[c.id] = c.name;
      });

      const merged = servicesData.map((s) => ({
        ...s,
        categoryName: catMap[s.categoryId] || "Unknown",
      }));

      if (merged.length > 0) {
        setServices(merged);
        setError("");
      } else {
        setError("No services found.");
      }
    } catch (err) {
      console.error("Failed to load services:", err);
      setError("Unable to load services. Please try again later.");
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredServices = useMemo(() => {
    let list = services;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (s) =>
          s.name?.toLowerCase().includes(q) ||
          s.categoryName?.toLowerCase().includes(q)
      );
    }

    if (categoryFilter) {
      const selected = categoryFilter.toLowerCase().trim();
      list = list.filter(
        (s) => s.categoryName?.toLowerCase().trim() === selected
      );
    }

    return list;
  }, [services, searchTerm, categoryFilter]);

  // Delete service
  const confirmDelete = async (id) => {
    try {
      showLoading("Deleting service...");
      await deleteServiceById(id);
      await loadData();
    } finally {
      hideLoading();
    }
  };

  const handleDelete = (id) => {
    showModal({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this service?",
      type: "error",
      confirmLabel: "Delete",
      onConfirm: () => confirmDelete(id),
    });
  };

  const total = filteredServices.length;
  const start = (currentPage - 1) * perPage;
  const paginated = filteredServices.slice(start, start + perPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter]);

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden">
      <MainContent
        services={paginated}
        error={error}
        allServices={services}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        total={total}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        perPage={perPage}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ManageServicesPage;

