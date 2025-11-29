import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../config/firebase.js";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useModal } from "../../context/ModalContext.jsx";
import { useLoading } from "../../context/LoadingContext.jsx";

export default function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { showLoading, hideLoading } = useLoading();

  const [categories, setCategories] = useState([]);
  const [agents, setAgents] = useState([]);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    agentId: "",
    isActive: true,
    images: [],
  });

  const [newImages, setNewImages] = useState([]);

  // ----------------------
  // Fetch categories + agents
  // ----------------------
  const loadMeta = async () => {
    const categoriesSnap = await getDocs(collection(db, "categories"));
    const agentsSnap = await getDocs(collection(db, "agents"));

    setCategories(categoriesSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setAgents(agentsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  // ----------------------
  // Load current service data
  // ----------------------
  const loadService = async () => {
    const serviceRef = doc(db, "services", id);
    const snap = await getDoc(serviceRef);

    if (snap.exists()) {
      setData(snap.data());
    } else {
      showModal({
        title: "Error",
        message: "Service not found",
        type: "error",
      });
      navigate("/services");
    }
  };

  useEffect(() => {
    loadMeta();
    loadService();
  }, []);

  // ----------------------
  // Handle change
  // ----------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ----------------------
  // Delete existing image
  // ----------------------
  const handleDeleteImage = (imgUrl) => {
    showModal({
      title: "Delete Image",
      message: "Are you sure you want to delete this image?",
      type: "error",
      confirmLabel: "Delete",
      onConfirm: () => {
        setData((prev) => ({
          ...prev,
          images: prev.images.filter((img) => img !== imgUrl),
        }));
      },
    });
  };

  // ----------------------
  // Submit
  // ----------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading();

    try {
      const updatedImages = [...data.images];

      // Upload new images if any
      for (let img of newImages) {
        const storageRef = ref(storage, `services/${Date.now()}_${img.name}`);
        await uploadBytes(storageRef, img);
        const url = await getDownloadURL(storageRef);
        updatedImages.push(url);
      }

      await updateDoc(doc(db, "services", id), {
        ...data,
        images: updatedImages,
      });

      showModal({
        title: "Success",
        message: "Service updated successfully!",
        type: "success",
        confirmLabel: "OK",
        onConfirm: () => navigate("/services"),
      });
    } catch (err) {
      console.error(err);
      showModal({
        title: "Error",
        message: "Failed to update service.",
        type: "error",
      });
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Service</h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6"
      >
        {/* Name */}
        <div>
          <label className="block text-gray-700 mb-1">Service Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-3 rounded-lg border"
            value={data.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            rows="4"
            className="w-full p-3 rounded-lg border"
            value={data.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 mb-1">Price</label>
          <input
            type="number"
            name="price"
            className="w-full p-3 rounded-lg border"
            value={data.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 mb-1">Category</label>
          <select
            name="categoryId"
            className="w-full p-3 rounded-lg border"
            value={data.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Agent */}
        <div>
          <label className="block text-gray-700 mb-1">Agent</label>
          <select
            name="agentId"
            className="w-full p-3 rounded-lg border"
            value={data.agentId}
            onChange={handleChange}
            required
          >
            <option value="">Select Agent</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        {/* Active Status */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isActive"
            checked={data.isActive}
            onChange={handleChange}
          />
          <label className="text-gray-700">Active</label>
        </div>

        {/* Current Images */}
        <div>
          <label className="block text-gray-700 mb-2">Existing Images</label>

          <div className="flex flex-wrap gap-4">
            {data.images?.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  className="w-28 h-28 rounded-lg object-cover border"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(img)}
                  className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded"
                >
                  X
                </button>
              </div>
            ))}

            {data.images?.length === 0 && (
              <p className="text-gray-500">No images uploaded.</p>
            )}
          </div>
        </div>

        {/* Upload new images */}
        <div>
          <label className="block text-gray-700 mb-1">Add New Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setNewImages([...e.target.files])}
            className="border p-2 rounded-lg"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Update Service
        </button>
      </form>
    </div>
  );
}