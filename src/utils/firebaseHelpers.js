// src/utils/firebaseHelpers.js
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, Timestamp, query, where } from "firebase/firestore";
import { db } from "../config/firebase.js";

// ===== Default structures =====

export const defaultService = {
  name: "",
  description: "",
  images: [],
  categoryId: "", // reference to category (Another Collection) / each service belongs to one category
  price: 0,
  agents: [], // array of agent IDs (Another Collection)
  duration: "",
  isActive: true,
  reviews: [], // array of review IDs (Another Collection)
  createdAt: Timestamp,
  updatedAt: Timestamp
};

export const defaultBooking = {
  userId: "",
  serviceId: "",
  agentId: "",
  date: "",
  time: "",
  address: "",
  phone: "",
  notes: "",
  status: "pending",
  referenceID: "",
  createdAt: Timestamp,
  updatedAt: Timestamp
};

export const defaultAgent = {
  name: "",
  email: "",
  phone: "",
  services: [], // array of service IDs
  createdAt: Timestamp.now(),
};

export const defaultCategory = {
  name: "",
  createdAt: Timestamp.now(),
};

// ========== CRUD helpers ==========
export const createDoc = async (collectionName, data) => {
  const docRef = await addDoc(collection(db, collectionName), data);
  console.log(`${collectionName} created with ID: ${docRef.id}`);
  return docRef.id;
};

export const getAllDocs = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Get single document by ID
export const getDocById = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    console.warn(`No document found in ${collectionName} with ID: ${id}`);
    return null;
  }
};

// Get by field
export async function getDocsByField(collectionName, field, value) {
  try {
    const q = query(collection(db, collectionName), where(field, "==", value));
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return docs;
  } catch (error) {
    console.error("Error fetching filtered documents:", error);
    throw error;
  }
}

// Update a document by ID in a collection
export const updateDocById = async (collectionName, id, data) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    console.error(`Error updating document in ${collectionName} with ID ${id}:`, error);
    throw error;
  }
};

// Delete
export const deleteDocById = async (collectionName, id) => {
  const ref = doc(db, collectionName, id);
  return await deleteDoc(ref);
};

// ========== Specific create functions ==========
export const createUser = (data) => createDoc("users", data);
export const createService = (data) => createDoc("services", data);
export const createBooking = (data) => createDoc("bookings", data);
export const createAgent = (data) => createDoc("agents", data);
export const createCategory = (data) => createDoc("categories", data);
export const createMessage = (data) => createDoc("messages", data);

// category

export const getAllCategories = () => getAllDocs("categories");
export const addCategory = (name) =>
  createDoc("categories", { name: name.trim() });

export const updateCategoryById = (id, name) =>
  updateDocById("categories", id, { name });

export const deleteCategoryById = (id) =>
  deleteDocById("categories", id);

// agents

export const getAllAgents = () => getAllDocs("agents");
// export const addAgent = (name, email, phone, services = []) =>
//   createDoc("agents", {
//     name: name.trim(),
//     email: email.trim(),
//     phone: phone.trim(),
//     services,
//     createdAt: Timestamp.now(),
//   }

// );

export const addAgent = async (name, email, phone, services = []) => {
  const id = await createDoc("agents", {
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    services,
    createdAt: Timestamp.now(),
  });

  return { id }; // ← الصفحة مستنية ده
};

export const updateAgentById = (id, data) =>
  updateDocById("agents", id, data);

export const deleteAgentById = (id) =>
  deleteDocById("agents", id);


export const getAllServices = () => getAllDocs("services");
