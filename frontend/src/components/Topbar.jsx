import React from 'react';
import { useDemo } from '../context/DemoContext';

const Topbar = ({ toggleMenu }) => {
  return (
    <div className="topbar">
      <div className="topbar-left" onClick={toggleMenu} style={{cursor: 'pointer'}}>
        <div className="sidebar-logo" style={{margin: 0}}>
          <span className="text-gradient">AEROLYTIX</span> AI
        </div>
      </div>
      <div className="topbar-right">
        {/* Topbar status hidden */}
      </div>
    </div>
  );
};
export default Topbar;
