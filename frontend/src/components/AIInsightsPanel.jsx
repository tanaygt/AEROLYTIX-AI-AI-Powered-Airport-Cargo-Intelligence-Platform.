import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Zap, TrendingUp, CheckCircle, ShieldAlert } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import axios from 'axios';

const AIInsightsPanel = () => {
  const [insights, setInsights] = useState([]);
  const { pollInterval, demoMode } = useDemo();

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const [energy, forecast, security] = await Promise.all([
          axios.get(`${API_BASE_URL}/energy-analysis`),
          axios.get(`${API_BASE_URL}/cargo-forecast`),
          axios.get(`${API_BASE_URL}/security-risk-analysis`)
        ]);
        
        let newInsights = [];

        if (energy.data.anomalies_detected > 0 || (demoMode && Math.random() > 0.5)) {
          newInsights.push({
            id: 'energy-'+Date.now(),
            type: 'warning',
            icon: <Zap size={20} color="#EAB308" />,
            title: 'Energy Anomaly',
            message: `Consumption spike detected in Warehouse Alpha. Recommend shifting chillers to off-peak.`
          });
        }
        
        if (forecast.data.capacity_risk === 'High' || (demoMode && Math.random() > 0.7)) {
          newInsights.push({
            id: 'forecast-'+Date.now(),
            type: 'alert',
            icon: <TrendingUp size={20} color="var(--color-alert)" />,
            title: 'Capacity Risk Predicted',
            message: `Cargo congestion expected in 6 hours. Shift 2 labor units to Terminal B.`
          });
        } else {
           newInsights.push({
            id: 'opt-'+Date.now(),
            type: 'success',
            icon: <CheckCircle size={20} color="var(--color-success)" />,
            title: 'Truck Optimization Active',
            message: `Autonomous truck routing could save 14% fuel usage daily.`
          });
        }

        if (security.data.high_risk_alerts > 0 || (demoMode && Math.random() > 0.6)) {
          newInsights.push({
            id: 'sec-'+Date.now(),
            type: 'danger',
            icon: <ShieldAlert size={20} color="var(--color-alert)" />,
            title: 'Security Alert Flagged',
            message: `High risk cargo declaration detected. Block loading sequence.`
          });
        }

        // Keep only top 3 recent
        setInsights(newInsights.slice(0, 3));
      } catch (err) {
        // fallback simulated
        if(demoMode) {
           setInsights([{
            id: 'warn-'+Date.now(),
            type: 'warning',
            icon: <AlertTriangle size={20} color="#EAB308" />,
            title: 'Local Cache Mode',
            message: `Backend tracking interrupted. Operating on extrapolated local heuristics.`
          }]);
        }
      }
    };

    fetchInsights();
    // In demo mode, spam insights faster
    const intervalId = setInterval(fetchInsights, demoMode ? 3000 : 15000); 
    return () => clearInterval(intervalId);
  }, [pollInterval, demoMode]);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
      <AnimatePresence>
        {insights.map((insight) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="glass-panel"
            style={{
              padding: '16px',
              borderLeft: `3px solid ${insight.type === 'danger' || insight.type === 'alert' ? 'var(--color-alert)' : (insight.type === 'warning' ? '#EAB308' : 'var(--color-success)')}`,
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start'
            }}
          >
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '8px',
              borderRadius: '8px',
              animation: (insight.type === 'danger' || insight.type === 'alert') ? 'pulseFast 1s infinite' : 'none'
            }}>
              {insight.icon}
            </div>
            <div>
              <div style={{fontWeight: 700, fontSize: '14px', marginBottom: '4px', color: '#fff'}}>{insight.title}</div>
              <div style={{fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.4'}}>{insight.message}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AIInsightsPanel;
