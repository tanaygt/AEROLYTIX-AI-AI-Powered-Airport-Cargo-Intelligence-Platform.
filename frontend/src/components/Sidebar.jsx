import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Zap, TrendingUp, ShieldAlert, Settings, Brain } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span className="text-gradient">AEROLYTIX</span> AI
      </div>
      <div className="sidebar-nav">
        <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        <NavLink to="/sustainability" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Zap size={20} />
          Sustainability Engine
        </NavLink>
        <NavLink to="/demand" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <TrendingUp size={20} />
          Demand Forecasting
        </NavLink>
        <NavLink to="/security" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <ShieldAlert size={20} />
          Cargo Security (PLACI)
        </NavLink>
        
        <div style={{marginTop: 'auto'}}>
          <NavLink to="/insights" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Brain size={20} />
            AI Insights
          </NavLink>
          <NavLink to="/settings" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Settings size={20} />
            System Settings
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
