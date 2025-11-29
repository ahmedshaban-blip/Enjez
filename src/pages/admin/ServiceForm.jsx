import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, db as firestoreDb } from "../../config/firebase.js";
import { createService, getAllDocs } from "../../utils/firebaseHelpers.js";
import uploadImage, { deleteFile } from "../../utils/uploadImage.js";
import { useLoading } from "../../context/LoadingContext.jsx";
import { useModal } from "../../context/ModalContext.jsx";

import ProvidersSelector from "../../components/common/admin/AgentsComponents.jsx";
import ServiceDetails from "../../components/common/admin/ServiceDetails.jsx";
import ServiceStatus from "../../components/common/admin/ServiceStatus.jsx";
import ServiceCategory from "../../components/common/admin/ServiceCategory.jsx";
import ServiceMedia from "../../components/common/admin/ServiceMedia.jsx";

export default function ServiceForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    agents: [],
    durationValue: "",
    durationUnit: "",
    isActive: true,
    images: [], // array of { url, path|null }
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);

  // Load categories
  useEffect(() => {
    (async () => {
      try {
        const cats = await getAllDocs("categories");
        setCategories(cats);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  // Load service if editing
  useEffect(() => {
    if (!isEdit) {
      setLoadingInitial(false);
      return;
    }

    const load = async () => {
      showLoading();
      try {
        const ref = doc(db, "services", id);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          await showModal({
            title: "Not found",
            message: "Service not found",
            type: "error",
          });
          navigate("/admin/services");
          return;
        }

        const data = snap.data();
        let durationValue = data.duration ?? "";
        let durationUnit = "minutes";
        if (data.duration >= 60 && data.duration < 1440) {
          durationValue = data.duration / 60;
          durationUnit = "hours";
        } else if (data.duration >= 1440) {
          durationValue = data.duration / (60 * 24);
          durationUnit = "days";
        }

        const imagesFromDb = (data.images || []).map((img) =>
          typeof img === "string" ? { url: img, path: null } : img
        );

        setServiceData({
          name: data.name || "",
          description: data.description || "",
          price: data.price || "",
          categoryId: data.categoryId || "",
          agents: data.agents || [],
          durationValue,
          durationUnit,
          isActive: typeof data.isActive === "boolean" ? data.isActive : true,
          images: imagesFromDb,
        });
      } catch (err) {
        console.error(err);
        await showModal({
          title: "Error",
          message: "Failed to load service data.",
          type: "error",
        });
      } finally {
        hideLoading();
        setLoadingInitial(false);
      }
    };

    load();
  }, [id]);

  // Delete existing image
  const handleDeleteExistingImage = (imageIndex) => {
    const image = serviceData.images[imageIndex];

    showModal({
      title: "Confirm Delete",
      message: "Do you really want to delete this image?",
      type: "warning",
      confirmLabel: "Delete",
      onConfirm: async () => {
        if (image?.path) {
          showLoading();
          const deleted = await deleteFile(image.path);
          hideLoading();
          if (!deleted) {
            showModal({
              title: "Delete failed",
              message: "Could not delete image from storage.",
              type: "error",
            });
            return;
          }
        }

        // إزالة من local state
        setServiceData((prev) => {
          const images = prev.images.filter((_, i) => i !== imageIndex);
          return { ...prev, images };
        });
      },
    });
  };

  // Delete new file (before upload)
  const handleDeleteNewFile = (index) => {
    const file = selectedFiles[index];

    showModal({
      title: "Confirm Delete",
      message: "Do you really want to remove this image?",
      type: "warning",
      confirmLabel: "Remove",
      onConfirm: () => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
      },
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!serviceData.name.trim())
      return showModal({
        title: "Missing Field",
        message: "Enter service name",
        type: "error",
      });
    if (!serviceData.description.trim())
      return showModal({
        title: "Missing Field",
        message: "Enter service description",
        type: "error",
      });
    if (!serviceData.price || parseFloat(serviceData.price) <= 0)
      return showModal({
        title: "Invalid Price",
        message: "Enter a valid price",
        type: "error",
      });
    if (!serviceData.categoryId)
      return showModal({
        title: "Missing Category",
        message: "Select category",
        type: "error",
      });
    if (!serviceData.durationValue || parseInt(serviceData.durationValue) <= 0)
      return showModal({
        title: "Invalid Duration",
        message: "Enter duration",
        type: "error",
      });
    if (!serviceData.durationUnit)
      return showModal({
        title: "Missing Duration Unit",
        message: "Choose duration unit",
        type: "error",
      });
    if (serviceData.agents.length === 0)
      return showModal({
        title: "No Providers",
        message: "Add at least one provider",
        type: "error",
      });
    if ((serviceData.images?.length || 0) + (selectedFiles?.length || 0) === 0)
      return showModal({
        title: "No Images",
        message: "Upload at least one image",
        type: "error",
      });

    showLoading();
    try {
      const uploaded = [];
      for (const file of selectedFiles) {
        const res = await uploadImage(file);
        if (!res) continue;
        uploaded.push(
          typeof res === "string"
            ? { url: res, path: null }
            : { url: res.url, path: res.path ?? null }
        );
      }

      const normalizedExisting = (serviceData.images || []).map((img) =>
        typeof img === "string"
          ? { url: img, path: null }
          : { url: img.url, path: img.path ?? null }
      );

      const finalImages = [...normalizedExisting, ...uploaded];

      let totalMinutes = parseInt(serviceData.durationValue || 0);
      if (serviceData.durationUnit === "hours") totalMinutes *= 60;
      if (serviceData.durationUnit === "days") totalMinutes *= 60 * 24;

      const payload = {
        name: serviceData.name,
        description: serviceData.description,
        price: parseFloat(serviceData.price),
        categoryId: serviceData.categoryId,
        agents: serviceData.agents,
        duration: totalMinutes,
        images: finalImages,
        isActive: serviceData.isActive,
        updatedAt: new Date(),
      };

      let serviceId;
      if (isEdit) {
        await updateDoc(doc(db, "services", id), payload);
        serviceId = id;

        for (const agentId of serviceData.agents) {
          try {
            await updateDoc(doc(firestoreDb, "agents", agentId), {
              services: arrayUnion(serviceId),
            });
          } catch (err) {
            console.warn("Failed updating agent services:", err);
          }
        }

        await showModal({
          title: "Updated",
          message: "Service updated successfully.",
          type: "success",
        });
      } else {
        const newServiceId = await createService({
          ...payload,
          createdAt: new Date(),
        });
        serviceId = newServiceId;

        for (const agentId of serviceData.agents) {
          try {
            await updateDoc(doc(firestoreDb, "agents", agentId), {
              services: arrayUnion(serviceId),
            });
          } catch (err) {
            console.warn("Failed updating agent services:", err);
          }
        }

        await showModal({
          title: "Created",
          message: "Service created successfully.",
          type: "success",
        });
      }

      navigate("/admin/services");
    } catch (err) {
      console.error(err);
      await showModal({
        title: "Error",
        message: err.message || "Failed to save service",
        type: "error",
      });
    } finally {
      hideLoading();
    }
  };

  if (loadingInitial) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <div className="lg:col-span-2 flex flex-col gap-6">
        <ServiceDetails
          serviceData={serviceData}
          setServiceData={setServiceData}
        />
        <ProvidersSelector
          serviceData={serviceData}
          setServiceData={setServiceData}
        />
      </div>
      <div className="flex flex-col gap-6">
        <ServiceStatus
          serviceData={serviceData}
          setServiceData={setServiceData}
        />
        <ServiceCategory
          serviceData={serviceData}
          setServiceData={setServiceData}
          categories={categories}
        />
        <ServiceMedia
          existingImages={serviceData.images}
          onDeleteExistingImage={handleDeleteExistingImage}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          onDeleteNewFile={handleDeleteNewFile}
        />
      </div>
    </form>
  );
}
