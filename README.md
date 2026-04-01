<div align="center">
  <h1>🛫 AEROLYTIX AI</h1>
  <p><strong>AI-Powered Airport Cargo Intelligence Platform</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Status-Hackathon_Ready-00F3FF?style=for-the-badge" alt="Status" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI" />
    <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Threejs" />
  </p>
</div>

---

## 📖 Overview

**AEROLYTIX AI** is an intelligent, AI-powered airport cargo command center designed to optimize cargo logistics, energy usage, sustainability, and security operations in modern airports. 

By unifying disjointed systems into a single **real-time digital twin dashboard**, AEROLYTIX AI provides terminal operators with autonomous predictive analytics and deep AI insights—empowering them to make faster, smarter, and safer decisions in high-stakes environments.

---

## 🛑 Problem Statement

Modern airport cargo terminals face immense pressure from surging international e-commerce demand, tightening sustainability regulations, and sophisticated global security threats. Current infrastructure heavily relies on reactive, siloed legacy software resulting in:
- **Inefficient Capacity Planning:** Millions lost due to sudden operational bottlenecks and truck congestion.
- **High Carbon Footprints:** Wasted energy in warehouses operating during peak energy pricing.
- **Security Vulnerabilities:** Slow, manual NLP parsing of air waybills leading to missed hazardous cargo declarations.

## 💡 Our Solution

Transform airport cargo operations using **AI forecasting, actionable sustainability analytics, and dynamic 3D digital twin visualization.** AEROLYTIX AI proactively identifies anomalies before they become catastrophic bottlenecks, acting as a force multiplier for terminal managers.

---

## ✨ Key Features

### 1. 🎛️ Command Center Dashboard
* **Real-time overview** of cargo operations, live throughput, and total tonnage.
* **System status monitoring** across all connected AI engines.
* **Live AI operational insights** injected dynamically based on backend data.

### 2. 🌱 Sustainability Engine
* **Energy monitoring** with anomaly detection algorithms.
* **Carbon footprint tracking** estimating kg CO2 emissions.
* **Optimization recommendations** (e.g., shifting chillers to off-peak pricing).

### 3. 📈 Demand Forecasting
* **AI-powered cargo demand prediction** utilizing historical and synthetic future datasets.
* **Trend analysis** plotted natively to predict volumetric congestion.
* **Capacity planning support** alerting operators to high-risk logistics overloads.

### 4. 🛡️ Cargo Security (PLACI)
* **Risk analysis** utilizing a heuristic NLP risk engine on Advanced Cargo Information.
* **Security alerts monitoring** highlighting explosive or hazardous keywords automatically.
* **Intelligent cargo screening insights** prioritizing which shipments require manual inspection.

### 5. 🌐 Digital Twin Matrix
* **Live 3D visualization** of warehouse operations powered by React Three Fiber.
* **Warehouse capacity monitoring** using floating HTML data nodes representing IoT sensors.
* **Real-time infrastructure insights** including autonomous truck routing and radar sweeps.

### 6. 🧠 AI Insights Panel & Copilot
* **AI-generated operational recommendations** triggered instantly by dataset heuristics.
* **Anomaly detection alerts** categorized by Danger, Warning, and Optimization modes.
* **Local offline AI Copilot** simulating conversational queries (e.g., "Why is energy high?") natively.

### 7. 🚀 Judge Demo Mode
* **Hackathon demo optimized experience** accessible via the Topbar.
* **Faster data refresh** (1s polling vs 5s) for instant reactivity.
* **Enhanced animations** speeding up the 3D twin and AI generation sequentially to impress judges.

---

## 🖥️ Screenshots

> *(Replace these placeholders with actual screenshots of your dashboard)*

| Command Center & Digital Twin | Sustainability Heatmap |
| :---: | :---: |
| <img width="1920" height="1502" alt="screencapture-aerolytix-ai-vercel-app-dashboard-2026-04-01-18_17_00" src="https://github.com/user-attachments/assets/dc0729a4-619c-4a6a-9ee9-3d6c93155da2" />|

| Demand Forecasting | Security Risk Analysis (PLACI) |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x350/0B0F1A/00F3FF?text=Demand+Screenshot" alt="Demand" /> | <img src="https://via.placeholder.com/600x350/0B0F1A/00F3FF?text=Security+Screenshot" alt="Security" /> |

---

## 🛠️ Tech Stack

**Frontend**
- **React & Vite**: Extremely fast and scalable user interface.
- **Vanilla CSS (Glassmorphism & Particles)**: Ultra-premium futuristic aesthetic. 
- **Framer Motion**: Smooth component page entry and alert transitions.
- **Three.js / @react-three/fiber**: Industrial-grade automated 3D rendering.
- **Recharts**: Responsive timeline forecasting and analytical graphing.

**Backend & AI Context**
- **FastAPI / Python**: High-performance REST APIs generating operational logic.
- **Synthetic Data Generation**: Simulates enterprise-grade IoT terminal data streams.
- **Rule-based NLP Engine**: Local copilot answering engine requiring no external API keys.

---

## ⚙️ Installation & Setup

You can run AEROLYTIX AI completely offline locally.

### Prerequisites
- Node.js (v16+)
- Python (3.9+)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/aerolytix-ai.git
cd aerolytix-ai
```

### 2. Start the FastAPI Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
*(Backend runs on http://localhost:8000)*

### 3. Start the React Frontend
```bash
# Open a new terminal window
cd frontend
npm install
npm run dev
```
*(Frontend runs on http://localhost:5173)*

---

## 📂 Project Structure

```text
AEROLYTIX AI/
├── backend/
│   └── main.py              # FastAPI server & synthetic data endpoints
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI (Scene3D, AICopilot, Sidebar, Topbar)
│   │   ├── context/         # React Context (DemoContext for global simulation speed)
│   │   ├── pages/           # Logic Modules (Dashboard, Demand, Security, etc.)
│   │   ├── App.jsx          # React Router & Theme Wrappers
│   │   └── index.css        # Global Design System (Neon, Glassmorphism, Particles)
│   └── package.json
└── README.md
```

---

## 🔮 Future Improvements

- **Real Hardware IoT Integration:** Connect real physical airport energy sensors into the Python parsing pipeline.
- **Live LLM Integration:** Upgrade the rules-based copilot to a secure private instance of Llama-3 for deeper interactive analysis.
- **Digital Twin Extension:** Dynamically map the Three.js mesh to represent imported architectural CAD files of specific real-world terminals.

---

## 🏆 Hackathon Value Proposition

AEROLYTIX AI differentiates itself by prioritizing **instant usability, striking futuristic aesthetics, and verifiable local deployment**. By building a comprehensive system devoid of paywalled APIs, it proves that complex terminal optimization and AI intelligence can be deployed safely, sustainably, and efficiently on edge network infrastructure.

---

## 👤 Team / Author

**Tanay Shrivastava**
*AI Developer | Supply Chain & Logistics Visionary*

- LinkedIn: [Your LinkedIn Profile URL]
- GitHub: [@tanaygt](https://github.com/tanaygt)
- Portfolio: [Your Portfolio URL]

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
