import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Zap, TrendingUp, ShieldAlert, Settings, Brain, X } from 'lucide-react';

const Sidebar = ({ mobileOpen, closeMenu }) => {
  return (
    <div className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="text-gradient">AEROLYTIX</span> AI
        </div>
        <button className="mobile-close-btn" onClick={closeMenu}>
          <X size={24} />
        </button>
      </div>
      <div className="sidebar-nav">
        <NavLink to="/dashboard" onClick={closeMenu} className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        <NavLink to="/sustainability" onClick={closeMenu} className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Zap size={20} />
          Sustainability Engine
        </NavLink>
        <NavLink to="/demand" onClick={closeMenu} className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <TrendingUp size={20} />
          Demand Forecasting
        </NavLink>
        <NavLink to="/security" onClick={closeMenu} className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <ShieldAlert size={20} />
          Cargo Security (PLACI)
        </NavLink>
        
        <div style={{marginTop: 'auto'}}>
          <NavLink to="/insights" onClick={closeMenu} className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Brain size={20} />
            AI Insights
          </NavLink>
          <NavLink to="/settings" onClick={closeMenu} className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Settings size={20} />
            System Settings
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
