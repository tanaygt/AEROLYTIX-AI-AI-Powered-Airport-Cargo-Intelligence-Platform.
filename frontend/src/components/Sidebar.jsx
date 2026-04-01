import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Zap, TrendingUp, ShieldAlert, Settings, Brain, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

const Sidebar = ({ mobileOpen, closeMenu }) => {
  const { demoMode, setDemoMode } = useDemo();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className={`sidebar ${mobileOpen ? 'mobile-open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed && (
          <div className="sidebar-logo">
            <span className="text-gradient">AEROLYTIX</span> AI
          </div>
        )}
        <div style={{display: 'flex', gap: '8px'}}>
          {mobileOpen && (
             <button className="collapse-btn mobile-close" onClick={closeMenu}>
                <X size={20} />
             </button>
          )}
          <button className="collapse-btn desktop-only" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      <div className="sidebar-intelligence">
        <div className="intelligence-group">
          <div className="status-indicator-pill" title="AI Energy Monitor">
            <div className="status-dot-green"></div>
            {!isCollapsed && "AI Energy Monitor"}
          </div>
          <div className="status-indicator-pill" title="Forecast Engine">
            <div className="status-dot-green"></div>
            {!isCollapsed && "Forecast Engine"}
          </div>
          <div className="status-indicator-pill" title="Risk Analyst">
            <div className="status-dot-green"></div>
            {!isCollapsed && "Risk Analyst"}
          </div>
        </div>
        
        <div 
          className="demo-mode-toggle-sidebar"
          onClick={() => setDemoMode(!demoMode)}
          title="Judge Demo Mode"
        >
          <div className="status-dot-blue" style={{
             animation: demoMode ? 'pulseFast 1s infinite' : 'none'
          }}></div>
          {!isCollapsed && <span>JUDGE DEMO MODE</span>}
          <div className={`toggle-switch ${demoMode ? 'active' : ''}`}></div>
        </div>
      </div>

      <div className="sidebar-nav">
        <NavLink to="/dashboard" onClick={closeMenu} className={({isActive}) => isActive ? "nav-item active" : "nav-item"} title="Dashboard">
          <LayoutDashboard size={20} />
          {!isCollapsed && "Dashboard"}
        </NavLink>
        <NavLink to="/sustainability" onClick={closeMenu} className={({isActive}) => isActive ? "nav-item active" : "nav-item"} title="Sustainability Engine">
          <Zap size={20} />
          {!isCollapsed && "Sustainability Engine"}
        </NavLink>
        <NavLink to="/demand" onClick={closeMenu} className={({isActive}) => isActive ? "nav-item active" : "nav-item"} title="Demand Forecasting">
          <TrendingUp size={20} />
          {!isCollapsed && "Demand Forecasting"}
        </NavLink>
        <NavLink to="/security" onClick={closeMenu} className={({isActive}) => isActive ? "nav-item active" : "nav-item"} title="Cargo Security">
          <ShieldAlert size={20} />
          {!isCollapsed && "Cargo Security (PLACI)"}
        </NavLink>
        
        <div style={{marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)'}}>
          <NavLink to="/insights" onClick={closeMenu} className={({isActive}) => isActive ? "nav-item active" : "nav-item"} title="AI Insights">
            <Brain size={20} />
            {!isCollapsed && "AI Insights"}
          </NavLink>
          <NavLink to="/settings" onClick={closeMenu} className={({isActive}) => isActive ? "nav-item active" : "nav-item"} title="System Settings">
            <Settings size={20} />
            {!isCollapsed && "System Settings"}
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
