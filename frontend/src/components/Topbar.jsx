import React from 'react';
import { useDemo } from '../context/DemoContext';

const Topbar = () => {
  return (
    <div className="topbar">
      <div style={{display:'flex', alignItems:'center', gap: '24px'}}>
        {/* Topbar status removed per user request */}
      </div>
    </div>
  );
};
export default Topbar;
