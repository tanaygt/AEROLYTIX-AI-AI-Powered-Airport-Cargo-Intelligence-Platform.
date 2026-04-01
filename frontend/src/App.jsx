import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Sustainability from './pages/Sustainability';
import Demand from './pages/Demand';
import Security from './pages/Security';
import Insights from './pages/Insights';
import Settings from './pages/Settings';
import { DemoProvider } from './context/DemoContext';
import AICopilot from './components/AICopilot';

function App() {
  return (
    <DemoProvider>
      <BrowserRouter>
        <div className="particles-bg">
          {/* Pure CSS particles created dynamically via CSS or mapping */}
          {[...Array(20)].map((_, i) => <div key={i} className={`particle particle-${i}`}></div>)}
        </div>
        <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Topbar />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/demand" element={<Demand />} />
            <Route path="/security" element={<Security />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        <AICopilot />
      </div>
    </BrowserRouter>
    </DemoProvider>
  );
}

export default App;
