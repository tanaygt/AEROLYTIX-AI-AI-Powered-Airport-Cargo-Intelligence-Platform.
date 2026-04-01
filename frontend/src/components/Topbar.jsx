import React from 'react';
import { useDemo } from '../context/DemoContext';

const Topbar = () => {
  const { demoMode, setDemoMode } = useDemo();

  return (
    <div className="topbar">
      <div style={{display:'flex', alignItems:'center', gap: '24px'}}>
        <span style={{color: 'var(--color-text-muted)', fontSize: '14px'}}>System Status: Optimal</span>
        
        <div 
          onClick={() => setDemoMode(!demoMode)}
          style={{
            cursor: 'pointer',
            padding: '6px 16px',
            borderRadius: '20px',
            background: demoMode ? 'rgba(0, 243, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${demoMode ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            boxShadow: demoMode ? '0 0 15px rgba(0, 243, 255, 0.4)' : 'none'
          }}
        >
          <div className="status-dot" style={{
             background: demoMode ? 'var(--color-primary)' : 'rgba(255,255,255,0.3)',
             boxShadow: demoMode ? '0 0 8px var(--color-primary)' : 'none',
             animation: demoMode ? 'pulseFast 1s infinite' : 'none'
          }}></div>
          <span style={{
            fontSize: '12px', 
            fontWeight: 700, 
            letterSpacing: '1px',
            color: demoMode ? 'var(--color-primary)' : 'var(--color-text-muted)',
            textShadow: demoMode ? '0 0 8px var(--color-primary)' : 'none'
          }}>
            JUDGE DEMO MODE
          </span>
        </div>
        {demoMode && (
          <div className="demo-active-badge">
            DEMO MODE ACTIVE
          </div>
        )}
      </div>
      <div className="system-status">
        <div className="status-indicator">
          <div className="status-dot"></div>
          AI Energy Monitor
        </div>
        <div className="status-indicator">
          <div className="status-dot"></div>
          Forecast Engine
        </div>
        <div className="status-indicator">
          <div className="status-dot"></div>
          Risk Analyst
        </div>
      </div>
    </div>
  );
};
export default Topbar;
