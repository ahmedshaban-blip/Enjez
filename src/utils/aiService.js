import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../config/firebase.js";
import { collection, getDocs, doc, setDoc, limit, query } from "firebase/firestore";

// 🔴 IMPORTANT: Replace this with your valid Gemini API Key
const API_KEY = "AIzaSyAH2aHhrD3HmIzwNBijnSqSIDPKWR4Kbow"; 

const genAI = new GoogleGenerativeAI(API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });
const llmModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Compute cosine similarity between two vectors
 */
function cosineSimilarity(vecA, vecB) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    magA += vecA[i] * vecA[i];
    magB += vecB[i] * vecB[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

/**
 * Generate embeddings for a given text
 */
export async function generateEmbedding(text) {
  try {
    const result = await embeddingModel.embedContent(text);
    return result.embedding.values;
  } catch (err) {
    console.error("Error generating embedding:", err);
    throw err;
  }
}

/**
 * Fetch all chatbot documents from Firestore
 */
export async function getChatbotDocuments() {
  try {
    const chatbotCollectionRef = collection(db, "chatbot");
    const snapshot = await getDocs(chatbotCollectionRef);
    const docs = [];
    snapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() });
    });
    return docs;
  } catch (err) {
    console.error("Error fetching chatbot documents:", err);
    throw err;
  }
}

/**
 * Query the AI (RAG Process)
 */
export async function queryAI(userQuery, topK = 3) {
  try {
    // 1. Auto-init if empty (Fail-safe)
    const initCheck = await checkAndInitializeChatbot();
    if (initCheck.status === "processed") {
       console.log("System just initialized. Proceeding with query...");
    }

    // 2. Embed user query
    const queryEmbedding = await generateEmbedding(userQuery);

    // 3. Fetch docs
    const chatbotDocs = await getChatbotDocuments();

    if (chatbotDocs.length === 0) {
      return {
        answer: "System is initializing the database. Please ask again in a few seconds.",
        sources: [],
      };
    }

    // 4. Compute similarity
    const scored = [];
    for (const doc of chatbotDocs) {
      if (doc.embedding && Array.isArray(doc.embedding)) {
        const score = cosineSimilarity(queryEmbedding, doc.embedding);
        if (score > 0.35) {
            scored.push({ ...doc, score });
        }
      }
    }

    // 5. Sort & Top-K
    scored.sort((a, b) => b.score - a.score);
    const topResults = scored.slice(0, topK);

    if (topResults.length === 0) {
        return {
            answer: "Sorry, I couldn't find any service matching your request.",
            sources: []
        };
    }

    // 6. Generate Answer
    let answer = null;
    try {
      const contextText = topResults
        .map((t, i) => `Service ${i + 1}: ${t.text}`)
        .join("\n\n");

      const prompt = `
      You are a smart assistant for the "Enjez" platform. Use the following service information to answer the customer's question.
      
      Top Services:
      ${contextText}
      
      Customer Question: ${userQuery}
      
      Answer politely and concisely in English, and mention the service name and price if available.
      `;

      const response = await llmModel.generateContent(prompt);
      answer = response.response.text() || null;
    } catch (llmErr) {
      console.warn("Could not generate answer with LLM:", llmErr);
      answer = null;
    }

    return {
      answer,
      sources: topResults
    };
  } catch (err) {
    console.error("Error in queryAI:", err);
    return { answer: "An error occurred while processing your request.", sources: [] };
  }
}

/**
 * Generate Embeddings from Services Collection (The Worker Function)
 */
export async function generateServiceEmbeddings() {
  try {
    console.log("Starting embedding generation...");
    const servicesCollectionRef = collection(db, "services");
    const snapshot = await getDocs(servicesCollectionRef);

    if (snapshot.empty) {
      console.log("No services found in the services collection.");
      return { success: false, message: "No services found", processed: 0 };
    }

    let processed = 0;

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      const id = docSnap.id;
      const text = `Service Name: ${data.name || ""}\nDescription: ${data.description || ""}\nPrice: ${data.price || ""} EGP`;

      try {
        const embedding = await generateEmbedding(text);
        await setDoc(doc(db, "chatbot", id), {
            serviceId: id,
            text: text,
            embedding: embedding,
            metadata: {
                name: data.name || null,
                price: data.price || null,
            },
            createdAt: new Date().toISOString()
        });
        processed++;
      } catch (embErr) {
        console.error(`Failed to process service ${id}:`, embErr);
      }
    }
    
    return { success: true, processed };
  } catch (err) {
    console.error("Error in generateServiceEmbeddings:", err);
    throw err;
  }
}

/**
 * ✅ NEW FUNCTION: Auto-Initialize Chatbot
 * Checks if the 'chatbot' collection is empty. If so, it runs the embedding generation automatically.
 */
export async function checkAndInitializeChatbot() {
  try {
    // Check if we have at least one document
    const q = query(collection(db, "chatbot"), limit(1));
    const snapshot = await getDocs(q);

    // If empty, start processing
    if (snapshot.empty) {
      console.log("⚠️ Chatbot DB is empty. Starting auto-processing...");
      const result = await generateServiceEmbeddings();
      return { status: "processed", count: result.processed };
    } else {
      // Already ready
      return { status: "ready" };
    }
  } catch (error) {
    console.error("Auto-init failed:", error);
    return { status: "error" };
  }
}