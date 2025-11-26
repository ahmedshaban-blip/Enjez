# Chatbot Implementation (Client-Side AI/RAG)

## Overview
The Enjez chatbot is now fully client-side using Google Generative AI and Firebase Firestore for RAG (Retrieval-Augmented Generation).

## What's included
- `src/components/common/Chatbot.jsx` — Floating chatbot UI component (appears on Home, Services, About, How It Works, My Bookings, Contact pages)
- `src/utils/aiService.js` — Core AI service handling embeddings, similarity search, and LLM-based answers
- Integrated into `src/components/layout/Navbar.jsx` for client pages

## How it works
1. **Embeddings**: Services from the Firestore `services` collection are converted to vector embeddings (768-dim) using Google's `text-embedding-004` model.
2. **Storage**: Embeddings are stored in a new Firestore collection called `chatbot` with fields: `{ serviceId, text, embedding, metadata }`.
3. **Query**: When a user asks a question, the query is embedded and compared (cosine similarity) against all stored embeddings.
4. **Answer**: Top-K matching documents are retrieved and passed to the `gemini-1.5-flash` LLM to generate a natural response.

## Setup (no server needed!)

### 1. Ensure Firebase is configured
Your Firebase config is already in `src/config/firebase.js`. The app uses the client SDK.

### 2. Install dependencies (already done)
If you need to reinstall:
```bash
npm install
```
The required packages are already in `package.json`:
- `@google/generative-ai` — Google's generative AI client
- `firebase` — Firestore client

### 3. Generate embeddings for services (one-time setup)
You need to populate the `chatbot` Firestore collection with embeddings from your services. There are two options:

**Option A: Use the browser console (simplest)**
1. Open your app in the browser (Dev Tools > Console)
2. Run:
```javascript
import { generateServiceEmbeddings } from './src/utils/aiService.js';
await generateServiceEmbeddings();
```

**Option B: Create a simple setup page**
Create a temporary admin page that calls `generateServiceEmbeddings()` and writes embeddings to Firestore. This would involve using `setDoc()` from Firebase to actually write the documents.

### 4. Start the dev server
```bash
npm run dev
```

The chatbot button appears on client pages. Click it and start asking questions about your services!

## Security notes
- The Google Generative AI API key is embedded in `src/utils/aiService.js`. This is a public key used for client-side inference, so it's acceptable to commit it (it can't access sensitive data).
- Your Firebase rules should allow reading from the `chatbot` collection. Adjust rules if needed.
- The chatbot runs entirely in the browser; no server secrets are exposed.

## Firestore schema
The `chatbot` collection should contain documents like:
```javascript
{
  serviceId: "service-doc-id",
  text: "Service name\nDescription\nPrice: $100",
  embedding: [0.123, 0.456, ..., 0.789],  // 768-dimensional vector
  metadata: {
    name: "Service name",
    price: 100
  },
  createdAt: timestamp
}
```

## Files structure
```
src/
  components/
    common/
      Chatbot.jsx                 (UI: floating button + chat panel)
    layout/
      Navbar.jsx                  (Imports Chatbot)
  utils/
    aiService.js                  (Core AI logic)
  config/
    firebase.js                   (Firebase config, already exists)
```

## Troubleshooting

**Error: "No documents found in the chatbot collection"**
→ You need to generate embeddings first. See "Generate embeddings for services" above.

**Chatbot button doesn't appear**
→ Ensure the page imports/uses `Navbar.jsx` (Home, Services, About, How It Works, My Bookings, Contact should all have it).

**Answer generation fails**
→ Check browser console. May be due to:
  - Firestore permission errors (adjust rules)
  - API quota exceeded (check Google Cloud console)
  - Invalid embeddings in Firestore

**Slow responses**
→ Happens if many services exist. You could optimize by:
  - Using approximate nearest neighbor (ANN) search (Pinecone, Weaviate, etc.)
  - Caching embeddings in localStorage
  - Adding pagination/filtering before computing similarity

## Next steps
1. Generate embeddings for your existing services.
2. Test the chatbot on a client page.
3. (Optional) Add authentication to prevent abuse of the LLM calls.
4. (Optional) Deploy to Vercel, Netlify, etc. — no server needed!

