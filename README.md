# Healthcare Doctor–Patient Translation Web Application

A full-stack web application that acts as a real-time multilingual communication bridge between doctors and patients. The system supports text-based translation, audio message recording, persistent conversation logging, keyword search, and AI-assisted conversation summaries.

This project was built as part of a take-home assignment to demonstrate system design, full-stack development, and integration of AI-powered services.

---

## 🔗 Live Links

Frontend (Vercel):  
https://healthcare-doctor-patient-translati-liart.vercel.app/

Backend (Render):  
https://healthcare-backend-3wfv.onrender.com/

---

## 🚀 Features

- Role-based chat (Doctor / Patient)
- Multilingual text translation
- Real-time messaging
- Persistent conversation history
- Audio recording and playback
- Keyword-based conversation search
- AI-assisted conversation summary generation
- Mobile-friendly responsive UI

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Axios
- HTML / CSS / JavaScript

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Multer (audio uploads)

### AI / Translation
- MyMemory Translation API (free public API)

---

## 📐 System Architecture

Frontend (React) → Backend (Express) → MongoDB  
Frontend communicates with backend through REST APIs.  
Backend handles translation, storage, search, audio uploads, and summary generation.


---

## ⚙️ API Endpoints

- POST /api/translate  
- GET /api/messages  
- GET /api/messages/search?q=keyword  
- POST /api/audio  
- GET /api/summary  

---

## 🧠 Known Limitations & Trade-offs

Due to API quota and billing constraints, the project uses a free public translation API (MyMemory) instead of a paid large language model such as OpenAI or Gemini. As a result, some translations may occasionally be inaccurate or less context-aware.

With access to paid LLM-based translation services, the system could achieve higher translation accuracy, better medical terminology handling, and more consistent multilingual performance.

---

## 🔮 Future Improvements

- Replace free translation API with LLM-based translation
- Speech-to-text for audio messages
- Voice-to-voice translation
- User authentication
- Conversation export (PDF)
- Doctor/patient session management

---

## 🧪 Running Locally

### Backend

-cd server
-npm install
-npm run dev

### FRONTEND
-cd client
-npm install
-npm run dev


