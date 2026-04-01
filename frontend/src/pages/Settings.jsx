import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Server, Sliders, Database, Wifi } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

const Settings = () => {
  const { demoMode, setDemoMode } = useDemo();
  const [sensitivity, setSensitivity] = useState(70);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-container">
      <div className="page-header">
        <h1>System Settings</h1>
        <p>AEROLYTIX AI Core Configuration</p>
      </div>

      <div className="dashboard-grid">
        <motion.div whileHover={{y:-5}} className="glass-panel chart-container">
          <div className="panel-title" style={{display:'flex', alignItems:'center', gap:'8px'}}>
             <Server color="var(--color-secondary)" />
             <span>Backend Connection</span>
          </div>
          <div style={{marginTop:'24px', display:'flex', flexDirection:'column', gap:'16px'}}>
             <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span style={{color:'var(--color-text-muted)'}}>API Endpoint</span>
                <span style={{padding:'6px 12px', background:'rgba(255,255,255,0.05)', borderRadius:'6px', fontFamily:'monospace'}}>http://localhost:8000</span>
             </div>
             <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span style={{color:'var(--color-text-muted)'}}>Database Status</span>
                <span className="badge success" style={{display:'flex', alignItems:'center', gap:'4px'}}><Database size={12}/> Connected</span>
             </div>
             <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span style={{color:'var(--color-text-muted)'}}>WebSocket Feed</span>
                <span className="badge success" style={{display:'flex', alignItems:'center', gap:'4px'}}><Wifi size={12}/> Active</span>
             </div>
          </div>
        </motion.div>

        <motion.div whileHover={{y:-5}} className="glass-panel chart-container" style={{boxShadow: demoMode ? '0 0 30px rgba(0, 243, 255, 0.2)' : 'none', border: demoMode ? '1px solid rgba(0,243,255,0.5)' : ''}}>
          <div className="panel-title" style={{display:'flex', alignItems:'center', gap:'8px'}}>
             <Sliders color="var(--color-primary)" />
             <span>Global Simulation Control</span>
          </div>
          <div style={{marginTop:'24px', display:'flex', flexDirection:'column', gap:'20px'}}>
             
             <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span style={{color:'var(--color-text)'}}>Judge Demo Mode (5x Speed)</span>
                <button 
                  onClick={() => setDemoMode(!demoMode)}
                  style={{
                    background: demoMode ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: demoMode ? '#000' : '#fff',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontWeight: 800,
                    transition: 'all 0.3s ease',
                    boxShadow: demoMode ? '0 0 10px rgba(0, 243, 255, 0.5)' : 'none'
                  }}>
                  {demoMode ? 'ACTIVE' : 'OFF'}
                </button>
             </div>

             <div>
               <div style={{display:'flex', justifyContent:'space-between', marginBottom:'12px'}}>
                 <span style={{color:'var(--color-text)'}}>AI Anomaly Sensitivity</span>
                 <span style={{color:'var(--color-primary)'}}>{sensitivity}%</span>
               </div>
               <input 
                 type="range" 
                 min="1" 
                 max="100" 
                 value={sensitivity}
                 onChange={(e) => setSensitivity(e.target.value)}
                 style={{
                   width: '100%',
                   accentColor: 'var(--color-primary)',
                   cursor: 'pointer'
                 }}
               />
               <p style={{fontSize:'12px', color:'var(--color-text-muted)', marginTop:'8px'}}>
                 Higher sensitivity increases false-positive threshold for security and energy alerts.
               </p>
             </div>

          </div>
        </motion.div>

        <motion.div whileHover={{y:-5}} className="glass-panel metric-card full-width">
          <div className="metric-card-header">
            <span>System Log Panel</span>
            <SettingsIcon size={20} color="var(--color-text-muted)" />
          </div>
          <div style={{marginTop:'16px', background:'rgba(0,0,0,0.5)', padding:'16px', borderRadius:'8px', fontFamily:'monospace', fontSize:'12px', color:'var(--color-primary)', height:'120px', overflowY:'auto'}}>
             <div>[SYSTEM] Core active on port 8000.</div>
             <div>[ROUTER] Loaded 4 modules. Copilot Engine Active.</div>
             <div>[3D_TWIN] Terminal Alpha initialized. Radar tracking OK.</div>
             {demoMode && <div style={{color:'var(--color-alert)'}}>[DEMO] Global time multiplier set to 5.0x</div>}
             <div>[NLP] Security rules engine loaded 6 high-risk heuristics.</div>
          </div>
          <div style={{marginTop:'16px', display:'flex', gap:'12px'}}>
             <button style={{
               background: 'rgba(0, 243, 255, 0.1)', 
               border: '1px solid var(--color-primary)',
               color: 'var(--color-primary)',
               padding: '8px 16px',
               borderRadius: '6px',
               cursor: 'pointer'
             }}>Clear Cache</button>
             <button style={{
               background: 'rgba(255, 255, 255, 0.05)', 
               border: '1px solid rgba(255,255,255,0.1)',
               color: '#fff',
               padding: '8px 16px',
               borderRadius: '6px',
               cursor: 'pointer'
             }}>Export Logs</button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;
