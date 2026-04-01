import React from 'react';
import { useDemo } from '../context/DemoContext';

const Topbar = () => {
  return (
    <div className="topbar">
      <div style={{display:'flex', alignItems:'center', gap: '24px'}}>
        <span className="topbar-status-text">System Status: Optimal</span>
      </div>
    </div>
  );
};
export default Topbar;
