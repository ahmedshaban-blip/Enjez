<div align="center">
  <img src="src/assets/logo 2.png" alt="Enjez Logo" width="200"/>
  
  # Enjez Platform
  
  ### 🎯 Your Complete Service Booking Solution
  
  [![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/ahmedshaban-blip/Enjez)
  
  <p align="center">
    A comprehensive service booking platform built with modern web technologies
    <br />
    Seamlessly connecting clients with service providers through intelligent automation
  </p>
</div>

---

📸 Screenshots
<div align="center">
  <table>
    <tr>
      <td align="center" style="padding: 10px;">
        <img src="src/assets/Screenshots/11.png" alt="Screenshot 1" width="100%" style="border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border: 2px solid #e5e7eb;"/>
      </td>
      <td align="center" style="padding: 10px;">
        <img src="src/assets/Screenshots/22.png" alt="Screenshot 2" width="100%" style="border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border: 2px solid #e5e7eb;"/>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 10px;">
        <img src="src/assets/Screenshots/33.png" alt="Screenshot 3" width="100%" style="border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border: 2px solid #e5e7eb;"/>
      </td>
      <td align="center" style="padding: 10px;">
        <img src="https://github.com/ahmedshaban-blip/Enjez/blob/main/src/assets/Screenshots/44.png?raw=true" alt="Screenshot 4" width="100%" style="border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border: 2px solid #e5e7eb;"/>
      </td>
    </tr>
  </table>
</div>

---

## 🌟 Overview

Enjez is a comprehensive service booking platform that bridges the gap between clients and service providers. Built with React, Vite, and Firebase, it delivers a seamless experience through a dual-interface system featuring real-time notifications, integrated payments, and an intelligent AI chatbot powered by Google Gemini.

---

## ✨ Features

### 👥 Client Portal
- **🔍 Service Discovery**: Browse a rich catalog of services with detailed descriptions, pricing, and image galleries
- **🤖 AI-Powered Chatbot**: Get instant, intelligent answers about services through RAG technology
- **🔐 User Authentication**: Secure sign-up, login, and password recovery
- **📅 Smart Booking System**: Schedule appointments with service providers, dates, and time slots
- **💳 Payment Integration**: Secure PayPal payment processing
- **📊 Personalized Dashboard**: Track and manage all bookings in one place
- **🔔 Real-time Notifications**: Instant updates on booking status changes
- **⚙️ Profile Management**: Manage account details and security settings

### 🎛️ Admin Dashboard
- **📈 Analytics Dashboard**: Real-time statistics on bookings, clients, and services
- **📋 Booking Management**: Comprehensive booking oversight with status updates and notes
- **👤 Client Management**: Complete client database with advanced search and filters
- **🛠️ Service Management (CRUD)**: Full control over service listings with image uploads
- **🏷️ Category & Agent Management**: Organize services and manage providers efficiently
- **📊 Reporting System**: Generate detailed business insights with customizable filters
- **⚡ Real-time Notifications**: Instant alerts for new booking requests

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | React • Vite • Tailwind CSS • Framer Motion |
| **Backend** | Firebase (Firestore, Authentication) • Supabase (Storage) |
| **AI & ML** | Google Generative AI (Gemini Flash) • Text Embeddings |
| **Payments** | PayPal SDK |
| **Routing** | React Router |
| **UI/UX** | Lucide React Icons |

</div>

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v20.x or later)
- **npm** or compatible package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahmedshaban-blip/Enjez.git
   cd Enjez
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### ⚙️ Configuration

Create a `.env` file in the project root with your API keys:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=enjez-b141a.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=enjez-b141a
VITE_FIREBASE_STORAGE_BUCKET=enjez-b141a.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=6567...
VITE_FIREBASE_APP_ID=1:6567...

# Supabase Configuration (for image storage)
VITE_SUPABASE_URL=https://pfsvoyhmakmrnlqylcsc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...

# Google Generative AI API Key (for chatbot)
VITE_GEMINI_API_KEY=AIzaSy...

# PayPal Client ID
VITE_PAYPAL_CLIENT_ID=ASMNSon_...
```

### ▶️ Running the Application

Start the development server:

```bash
npm run dev
```

🌐 Application will be available at `http://localhost:5173`  
🔧 Admin dashboard accessible at `/admin`

---

## 🤖 Chatbot Setup

The AI chatbot uses Google Generative AI with RAG (Retrieval-Augmented Generation) to provide intelligent service information.

### One-Time Setup

After starting the application, generate embeddings for your services:

1. Open browser developer console
2. Run the following command:

```javascript
import { generateServiceEmbeddings } from './src/utils/aiService.js';
await generateServiceEmbeddings();
```

This populates the `chatbot` collection in Firestore, enabling AI-powered responses.

---

## 📂 Project Structure

```
src/
├── assets/          # Static assets (images, logos)
├── components/      # Reusable UI components
│   ├── admin/       # Admin-specific components
│   ├── client/      # Client-facing components
│   ├── common/      # Shared components
│   └── layout/      # Layout components
├── config/          # Firebase & Supabase configuration
├── context/         # React contexts (Auth, Loading, Modal)
├── hooks/           # Custom hooks for business logic
├── pages/           # Page-level components
│   ├── admin/       # Admin pages
│   ├── auth/        # Authentication pages
│   └── client/      # Client pages
└── utils/           # Helper functions & AI service
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Lint codebase with ESLint |
| `npm run preview` | Preview production build |

---
---

## 👥 Team Members

<div align="center">

| **Ahmed Shaban** | **Jovany Wahba** | **Youshia Zakaria** |
|:---:|:---:|:---:|
| 📧 [ahmed.shabaan.dev@gmail.com](mailto:ahmed.shabaan.dev@gmail.com) | 📧 [Jovywahba@gmail.com](mailto:Jovywahba@gmail.com) | 📧 [youshiaz@gmail.com](mailto:youshiaz@gmail.com) |
| Team Leader & Front-end & Cross-Platform Developer | Front-end & Mobile Developer | Front-end & Mobile Developer |
| [![GitHub](https://img.shields.io/badge/GitHub-ahmedshaban--blip-black?style=flat&logo=github)](https://github.com/ahmedshaban-blip) | [![GitHub](https://img.shields.io/badge/GitHub-jovywahba-black?style=flat&logo=github)](https://github.com/jovywahba) | [![GitHub](https://img.shields.io/badge/GitHub-YouShiaZ-black?style=flat&logo=github)](https://github.com/YouShiaZ) |

| **Tassnem Abd Elrazik** | **Maram Ahmed** | **Doha Abo Elkassem** |
|:---:|:---:|:---:|
| 📧 [tasneem.ar.work@gmail.com](mailto:tasneem.ar.work@gmail.com) | 📧 [maramahmed1818@gmail.com](mailto:maramahmed1818@gmail.com) | 📧 [Kassemhossam878@gmail.com](mailto:Kassemhossam878@gmail.com) |
| Front-end & Mobile Developer | Front-end & Mobile Developer | Front-end & Mobile Developer |
| [![GitHub](https://img.shields.io/badge/GitHub-tasneem--abdelrazek-black?style=flat&logo=github)](https://github.com/tasneem-abdelrazek) | [![GitHub](https://img.shields.io/badge/GitHub-MaramAhmed18-black?style=flat&logo=github)](https://github.com/MaramAhmed18) | [![GitHub](https://img.shields.io/badge/GitHub-Doha--AboElkasem-black?style=flat&logo=github)](https://github.com/Doha-AboElkasem) |

</div>

---

<div align="center">
  
  ### ⭐ If you find this project useful, please consider giving it a star!
  
  **Made with ❤️ by the Enjez Team**
  
</div>
