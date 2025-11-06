import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase.js";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import { createService, getAllDocs } from "../../utils/firebaseHelpers.js";
import uploadImage from "../../utils/uploadImage.js";
import { useLoading } from "../../context/LoadingContext.jsx";
import { useModal } from "../../context/ModalContext.jsx";
import ProvidersSelector from "../../components/common/admin/AgentsComponents.jsx";
import ServiceDetails from "../../components/common/admin/ServiceDetails.jsx";
import ServiceStatus from "../../components/common/admin/ServiceStatus.jsx";
import ServiceCategory from "../../components/common/admin/ServiceCategory.jsx";
import ServiceMedia from "../../components/common/admin/ServiceMedia.jsx";

export default function AddService() {
  const { showLoading, hideLoading } = useLoading();
  const { showModal } = useModal();

  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    agents: [],
    duration: "",
    isActive: true,
    images: [],
  });

  const [categories, setCategories] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [resetSearch, setResetSearch] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getAllDocs("categories");
        setCategories(cats);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoading();

    try {
      const uploadedUrls = [];
      for (const file of selectedFiles) {
        const url = await uploadImage(file);
        if (url) uploadedUrls.push(url);
      }

      let totalMinutes = parseInt(serviceData.durationValue || 0);
      if (serviceData.durationUnit === "hours") totalMinutes *= 60;
      if (serviceData.durationUnit === "days") totalMinutes *= 60 * 24;

      const newService = {
        ...serviceData,
        price: parseFloat(serviceData.price),
        duration: totalMinutes,
        images: uploadedUrls,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const serviceId = await createService(newService);

      for (const agentId of serviceData.agents) {
        const agentRef = doc(db, "agents", agentId);
        await updateDoc(agentRef, {
          services: arrayUnion(serviceId),
        });
      }

      showModal({
        title: "✅ Service Added",
        message: `Service "${serviceData.name}" created successfully.`,
        type: "success",
      });

      // Reset
      setServiceData({
        name: "",
        description: "",
        price: "",
        categoryId: "",
        agents: [],
        duration: "",
        isActive: true,
        images: [],
      });
      setSelectedFiles([]);
      setResetSearch(prev => !prev);
    } catch (err) {
      console.error(err);
      showModal({
        title: "❌ Error",
        message: `Failed to add service: ${err.message}`,
        type: "error",
      });
    } finally {
      hideLoading();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      {/* Left Column */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <ServiceDetails
          serviceData={serviceData}
          setServiceData={setServiceData}
        />
        <ProvidersSelector
          serviceData={serviceData}
          setServiceData={setServiceData}
          resetSearch={resetSearch}
        />
      </div>

      {/* Right Column */}
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
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
        />
      </div>
    </form>
  );
}
