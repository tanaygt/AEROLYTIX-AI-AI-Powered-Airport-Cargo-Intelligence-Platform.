import React from 'react';
import { useDemo } from '../context/DemoContext';

const Topbar = () => {
  const { demoMode, setDemoMode } = useDemo();

  return (
    <div className="topbar">
      <div style={{display:'flex', alignItems:'center', gap: '24px'}}>
        <span style={{color: 'var(--color-text-muted)', fontSize: '14px'}}>System Status: Optimal</span>
        
        <div 
          className="demo-mode-toggle"
          onClick={() => setDemoMode(!demoMode)}
        >
          <div className="status-dot-blue" style={{
             animation: demoMode ? 'pulseFast 1s infinite' : 'none'
          }}></div>
          <span>JUDGE DEMO MODE</span>
        </div>
        {demoMode && (
          <div className="demo-active-badge">
            DEMO MODE ACTIVE
          </div>
        )}
      </div>
        <div className="status-indicator-pill">
          <div className="status-dot-green"></div>
          AI Energy Monitor
        </div>
        <div className="status-indicator-pill">
          <div className="status-dot-green"></div>
          Forecast Engine
        </div>
        <div className="status-indicator-pill">
          <div className="status-dot-green"></div>
          Risk Analyst
        </div>
    </div>
  );
};
export default Topbar;
