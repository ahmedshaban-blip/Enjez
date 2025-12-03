// src/utils/firebaseHelpers.js
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  setDoc, // Added setDoc
  Timestamp,
  query,
  where,
} from "firebase/firestore";
import { deleteApp } from "firebase/app"; // Added deleteApp for cleanup
import { db } from "../config/firebase.js";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseConfig } from "../config/firebase.js";

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
  updatedAt: Timestamp,
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
  updatedAt: Timestamp,
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
    console.error(
      `Error updating document in ${collectionName} with ID ${id}:`,
      error
    );
    throw error;
  }
};

// Delete
export const deleteDocById = async (collectionName, id) => {
  const ref = doc(db, collectionName, id);
  return await deleteDoc(ref);
};

// ========== Specific create functions ==========
// ========== Specific create functions ==========
export const createUser = (data, customId = null) => {
  if (customId) {
    // If we have a custom ID (like Auth UID), use setDoc
    return setDoc(doc(db, "users", customId), data).then(() => customId);
  }
  return createDoc("users", data);
};

// Helper to create Auth user without logging out the current admin
export const createAuthUser = async (email, password) => {
  let secondaryApp;
  try {
    // 1. Initialize a secondary app instance
    secondaryApp = initializeApp(firebaseConfig, "Secondary");
    const secondaryAuth = getAuth(secondaryApp);

    // 2. Create the user in the secondary app
    const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
    const user = userCredential.user;

    // 3. Sign out immediately to avoid any session conflicts (though secondary app shouldn't affect main)
    await signOut(secondaryAuth);

    return user.uid;
  } catch (error) {
    console.error("Error creating auth user:", error);
    throw error;
  } finally {
    // 4. Delete the secondary app to clean up
    if (secondaryApp) {
      await deleteApp(secondaryApp);
    }
  }
};
export const createService = (data) => createDoc("services", data);
export const createBooking = async (data) => {
  const docRef = await addDoc(collection(db, "bookings"), data);
  return docRef.id;
};
export const createAgent = (data) => createDoc("agents", data);
export const createCategory = (data) => createDoc("categories", data);
export const createMessage = (data) => createDoc("messages", data);

// category

export const getAllCategories = () => getAllDocs("categories");

export const addCategory = (name) =>
  createDoc("categories", {
    name: name.trim(),
    createdAt: Timestamp.now(),
  });

export const updateCategoryById = (id, name) =>
  updateDocById("categories", id, { name });

export const deleteCategoryById = (id) => deleteDocById("categories", id);

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

export const updateAgentById = (id, data) => updateDocById("agents", id, data);

export const deleteAgentById = (id) => deleteDocById("agents", id);

export const getAllServices = () => getAllDocs("services");
export const deleteServiceById = (id) => deleteDocById("services", id);


export const getUserBookings = (userId) =>
  getDocsByField("bookings", "userId", userId);

// 
export const getServicesCountByCategory = async (categoryId) => {
  const q = query(
    collection(db, "services"),
    where("categoryId", "==", categoryId)
  );
  const snapshot = await getDocs(q);
  return snapshot.size;
};

//
export const getAllCategoriesWithCount = async () => {
  const catsSnap = await getDocs(collection(db, "categories"));
  const categories = [];

  for (let doc of catsSnap.docs) {
    const data = doc.data();
    const count = await getServicesCountByCategory(doc.id);

    categories.push({
      id: doc.id,
      ...data,
      servicesCount: count,
    });
  }

  return categories;
};
