# BlackBox 1000x Estimator System

## ✅ Overview
The BlackBox Estimator is an AI-driven, full-scope estimating tool designed for FF&E, installations, logistics, and construction-related businesses. It auto-generates highly detailed quotes, predicts cost, time, labor, tools, risk, and output — with no guesswork.

---

## 🔧 Key Features

- 🔍 **Live Adaptive Quote Engine**
- 🧠 **AI Crew Builder Bot**
- 📦 **Auto-loaded Tools, Materials & Per Diem**
- 📊 **Predictive Win Rate + Risk Score**
- 🎯 **Scope Visualizer for Clients**
- 🛠 **Job DNA Tracker**
- 🗂 **Quote Vault + Audit Trail**
- ⚙️ **Built-in Deal Closer + Follow-up Intelligence**
- 🌎 **Smart Regional Forecast Plugin**

---

## 🧱 Stack
- Frontend: React + TailwindCSS
- Backend: Node.js + Express + MongoDB
- AI Logic: Modular Python / JS prompt modules
- Docs & Export: JSON-to-PDF logic

---

## 🚀 Setup Instructions

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### MongoDB Connection (.env)
```
MONGO_URI=your_mongodb_string
PORT=5000
```

---

## 📦 API Modules
- `/api/estimate`: Accepts scope input, returns full output with costs, labor, and risk
- `/api/crew`: Returns required crew roles based on job type
- `/api/tools`: Returns required tools + loadout checklist
- `/api/export`: Generates downloadable PDF quote
