# AEROLYTIX AI – Airport Cargo Intelligence Platform Setup

The goal is to build a complete, full-stack application that demonstrates AI's value in airport cargo operations. We will set up a FastAPI backend that generates synthetic data and serves insights, alongside a dynamic React frontend featuring a 3D digital twin, smooth animations, and a glassmorphism design system.

## User Review Required

> [!IMPORTANT]
> Please review the technology stack and approach below. If you approve, I will begin execution by scaffolding the project structures, setting up the models, and building the web application. 
> *Note:* In accordance with instructions, we will use Vite/React with Vanilla CSS/CSS Modules for styling instead of TailwindCSS, as well as `three.js` (via `@react-three/fiber`) for the 3D twin, and `recharts` for animated charts. Does this sound good?

## Proposed Changes

### Backend (FastAPI / Python)

The backend will serve synthetic operations data and expose AI models.

#### [NEW] `backend/requirements.txt`
Dependencies: `fastapi`, `uvicorn`, `pandas`, `numpy`, `scikit-learn` (for Isolation Forest and basic time-series models), and `pydantic`.

#### [NEW] `backend/main.py`
The FastAPI application providing REST API endpoints:
- `GET /energy-analysis`: Returns isolation forest anomaly results for energy consumption.
- `GET /cargo-forecast`: Returns time-series predictions for capacity/demand planning.
- `GET /security-risk-analysis`: Returns basic NLP and heuristic risk-scoring for cargo manifests.

#### [NEW] `backend/data_generator.py`
A module to automatically generate ~300-500 rows of realistic synthetic data for:
- Equipment usage logs
- Container/truck movements
- Energy consumption trends
- Cargo declarations (PLACI data)

#### [NEW] `backend/models.py`
To hold the Isolation Forest model logic, NLP simulation, and Time Series Forecasting utilities.

---

### Frontend (React / Vite)

A futuristic dark-mode AI command center.

#### [NEW] `frontend/package.json`
Dependencies: `react`, `react-dom`, `react-router-dom`, `three`, `@react-three/fiber`, `@react-three/drei` (for 3D), `recharts` (for metrics charts), `framer-motion` (for smooth UI animations).

#### [NEW] `frontend/src/index.css`
A global CSS file establishing the visual style: Dark theme background, neon blue highlights (`#00f3ff`), glassmorphism card utility classes (`background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px);`), and smooth transitions.

#### [NEW] `frontend/src/App.jsx`
Main layout shell featuring a side navigation bar and top system status bar, with dynamic routing for each module.

#### [NEW] `frontend/src/components/Scene3D.jsx`
A lightweight Three.js visualization of an airport cargo terminal with simple low-poly primitives mimicking containers, warehouses, trucks, and moving data paths.

#### [NEW] `frontend/src/pages/Dashboard.jsx`
The main overview featuring the 3D Scene prominently, alongside high-level KPI cards and a summary radar/line chart.

#### [NEW] `frontend/src/pages/Sustainability.jsx`
Module 1 Dashboard: Focuses on energy charts, carbon emission KPIs, and the anomaly detector response.

#### [NEW] `frontend/src/pages/Demand.jsx`
Module 2 Dashboard: Time-series charts for forecasting cargo volumes and capacity utilization risk warnings.

#### [NEW] `frontend/src/pages/Security.jsx`
Module 3 Dashboard: Tabular data and detail cards highlighting cargo declaration risks, utilizing gauge charts and alert banners based on AI NLP analysis.

## Open Questions

1. Are there any specific colors to use beyond the "dark modern theme with neon blue highlights" style?
2. Should the backend generate static mock data on startup, or should the numbers fluctuate randomly with each API request to simulate a truly live system? 

## Verification Plan

### Automated Tests
- Starting the FastAPI server via `uvicorn main:app --reload` and testing the REST API response format.
- Booting the Vite dev server via `npm run dev` and verifying 3D rendering and router navigation without errors.

### Manual Verification
- Testing all sidebar links and confirming that visual animations, chart rendering, and glassmorphism UI styles achieve the intended futuristic command-center look.
