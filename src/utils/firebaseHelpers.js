import { collection, addDoc, getDocs, getDoc, doc, Timestamp } from "firebase/firestore";
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
  services: [] // array of service IDs
};

export const defaultCategory = {
  name: "",
  description: ""
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

// ========== Specific create functions ==========
export const createUser = (data) => createDoc("users", data);
export const createService = (data) => createDoc("services", data);
export const createBooking = (data) => createDoc("bookings", data);
export const createAgent = (data) => createDoc("agents", data);
export const createCategory = (data) => createDoc("categories", data);