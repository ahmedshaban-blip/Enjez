import { useEffect, useState } from "react";
import Pagination from "../../components/common/admin/AdminPagination.jsx";
import {
  addCategory,
  updateCategoryById,
  deleteCategoryById,
  getAllCategoriesWithCount
} from "../../utils/firebaseHelpers.js";
import { useLoading } from "../../context/LoadingContext.jsx";
import { useModal } from "../../context/ModalContext.jsx";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  // ===== Load categories =====
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    showLoading("Loading Categories...");
    const data = await getAllCategoriesWithCount();
    setCategories(data);
    hideLoading();
  };

  // ===== Add or Edit =====
  const handleSave = async () => {
    if (!name.trim()) {
      return showModal({
        title: "Missing Name",
        message: "Please enter a category name.",
        type: "warning",
        confirmLabel: "OK",
      });
    }
    showLoading(editId ? "Updating category..." : "Adding category...");
    if (editId) {
      await updateCategoryById(editId, name);
    } else {
      await addCategory(name);
    }
    setName("");
    setEditId("");
    await loadData();
    hideLoading();
  };

  const handleEdit = (cat) => {
    setEditId(cat.id);
    setName(cat.name);
  };

  // ===== Delete with confirm modal =====
  const confirmDelete = async (id) => {
    showLoading("Deleting category...");
    await deleteCategoryById(id);
    await loadData();
    hideLoading();
  };

  const handleDelete = (id) => {
    showModal({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this category?",
      type: "error",
      confirmLabel: "Delete",
      onConfirm: () => confirmDelete(id),
    });
  };

  // ===== Pagination Logic =====
  const start = (currentPage - 1) * perPage;
  const paginated = categories.slice(start, start + perPage);
  const total = categories.length;

  return (
    <div className="px-6 py-4 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>

      {/* ===== Add / Edit Form ===== */}
      <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border mb-6">
        <h2 className="text-lg font-semibold mb-3">
          {editId ? "Edit Category" : "Add New Category"}
        </h2>

        <div className="flex gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name..."
            className="flex-1 h-12 px-4 rounded-lg bg-gray-100 dark:bg-gray-800"
          />

          <button
            onClick={handleSave}
            className="px-6 h-12 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Save
          </button>
        </div>

        {editId && (
          <button
            onClick={() => {
              setEditId("");
              setName("");
            }}
            className="mt-3 text-sm text-gray-500 hover:text-gray-800"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* ===== Categories Table ===== */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Services</th>
              <th className="px-6 py-3">Created</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-8 text-gray-400">
                  No categories found.
                </td>
              </tr>
            ) : (
              paginated.map((cat) => (
                <tr
                  key={cat.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4">{cat.name}</td>

                  <td className="px-6 py-4">{cat.servicesCount}</td>

                  <td className="px-6 py-4">
                    {cat.createdAt?.seconds
                      ? new Date(
                          cat.createdAt.seconds * 1000
                        ).toLocaleDateString()
                      : "—"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Categories;
