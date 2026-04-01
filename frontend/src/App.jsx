import React, { Component } from 'react';
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
import { Menu, X } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("System module exception:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', maxWidth: '400px' }}>
            <h2 style={{color: 'var(--color-primary)', marginBottom: '16px'}}>System Reboot Required</h2>
            <p style={{color: 'var(--color-text-muted)', lineHeight: '1.5', marginBottom: '24px'}}>
              An unexpected module exception occurred or an API route failed. The terminal has safely isolated the process.
            </p>
            <button 
              onClick={() => window.location.href = '/dashboard'}
              style={{
                background: 'var(--color-primary)',
                color: '#000',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 800,
                boxShadow: '0 0 15px rgba(0,243,255,0.4)',
                transition: 'all 0.3s ease'
              }}
            >
              INITIALIZE DASHBOARD
            </button>
          </div>
        </div>
      );
    }
    return this.props.children; 
  }
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <DemoProvider>
      <BrowserRouter>
        <div className="particles-bg">
          {[...Array(20)].map((_, i) => <div key={i} className={`particle particle-${i}`}></div>)}
        </div>
        <div className="app-container">
          <Sidebar mobileOpen={mobileMenuOpen} closeMenu={() => setMobileMenuOpen(false)} />
          <div className="main-content">
            <div className="topbar">
              <button 
                className="mobile-menu-btn" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginRight: '16px' }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Topbar />
            </div>
            <div className="page-wrapper-scroll">
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/sustainability" element={<Sustainability />} />
                  <Route path="/demand" element={<Demand />} />
                  <Route path="/security" element={<Security />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
              </ErrorBoundary>
            </div>
          </div>
          <AICopilot />
        </div>
      </BrowserRouter>
    </DemoProvider>
  );
}

export default App;
