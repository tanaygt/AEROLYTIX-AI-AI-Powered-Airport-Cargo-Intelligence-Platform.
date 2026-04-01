import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/**
 * 🛡️ AEROLYTIX SILENT SHIELD 
 * Intercepting specific Three.js deprecation warnings coming from 
 * R3F internal clock/shadow systems for a clean Hackathon console.
 */
const originalWarn = console.warn;
console.warn = (...args) => {
  const msg = args[0]?.toString() || '';
  if (
    msg.includes('THREE.Clock') || 
    msg.includes('PCFSoftShadowMap') ||
    msg.includes('THREE.Timer')
  ) return;
  originalWarn(...args);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
