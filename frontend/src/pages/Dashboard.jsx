import React, { useEffect, useState } from 'react';
import Scene3D from '../components/Scene3D';
import AIInsightsPanel from '../components/AIInsightsPanel';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Zap, Package, Truck, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

// Animated Number Component
const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let current = Number(displayValue);
    const target = Number(value);
    const step = (target - current) / 10;
    
    if(Math.abs(target - current) < 1) {
       setDisplayValue(target);
       return;
    }

    const interval = setInterval(() => {
      current += step;
      if (Math.abs(target - current) < Math.abs(step)) {
        setDisplayValue(target);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.round(current));
      }
    }, 50);
    return () => clearInterval(interval);
  }, [value]);

  return <>{displayValue.toLocaleString()}</>;
};

const Dashboard = () => {
  const { pollInterval } = useDemo();
  const [metrics, setMetrics] = useState({
    total_cargo_processed_today: 0,
    active_trucks: 0,
    energy_kwh: 0,
    carbon_emissions: 0,
    warehouse_utilization: 0,
    alerts: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/dashboard-metrics');
        setMetrics(res.data);
      } catch (err) {
        console.error("Backend not running, using fallback data");
        // Randomize mock data for visual activity
        setMetrics(prev => ({
          total_cargo_processed_today: 8520 + Math.floor(Math.random()*10),
          active_trucks: 42 + Math.floor(Math.random()*4 - 2),
          energy_kwh: 12450 + Math.floor(Math.random()*100 - 50),
          carbon_emissions: 4980,
          warehouse_utilization: 82,
          alerts: 2
        }));
      }
    };
    fetchData();
    const interval = setInterval(fetchData, pollInterval);
    return () => clearInterval(interval);
  }, [pollInterval]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="page-container"
    >
      <div className="page-header dashboard-header">
        <div className="dashboard-context-label">AI Powered Airport Cargo Intelligence Platform</div>
        <h1>Command Center</h1>
        <p>Live Overview of Airport Cargo Operations</p>
        <div className="header-glow-line"></div>
      </div>

      <div className="metrics-grid">
        <motion.div whileHover={{y:-5}} className="glass-panel metric-card">
          <div className="metric-card-header">
            <span>Total Cargo Today</span>
            <Package size={20} color="var(--color-primary)" />
          </div>
          <div className="metric-value">
             <AnimatedNumber value={metrics.total_cargo_processed_today} /> <span style={{fontSize:'16px', color:'var(--color-text-muted)', fontWeight:'normal'}}>tons</span>
          </div>
        </motion.div>
        
        <motion.div whileHover={{y:-5}} className="glass-panel metric-card">
          <div className="metric-card-header">
            <span>Energy Usage</span>
            <Zap size={20} color="#EAB308" />
          </div>
          <div className="metric-value">
             <AnimatedNumber value={metrics.energy_kwh} /> <span style={{fontSize:'16px', color:'var(--color-text-muted)', fontWeight:'normal'}}>kWh</span>
          </div>
        </motion.div>
        
        <motion.div whileHover={{y:-5}} className="glass-panel metric-card">
          <div className="metric-card-header">
            <span>Capacity Util</span>
            <Truck size={20} color="var(--color-secondary)" />
          </div>
          <div className="metric-value">
             <AnimatedNumber value={metrics.warehouse_utilization} /> <span style={{fontSize:'16px', color:'var(--color-text-muted)', fontWeight:'normal'}}>%</span>
          </div>
        </motion.div>
        
        <motion.div whileHover={{y:-5}} className="glass-panel metric-card" style={{border: metrics.alerts > 0 ? '1px solid var(--color-alert)' : ''}}>
          <div className="metric-card-header">
            <span>Security Alerts</span>
            {metrics.alerts > 0 ? <AlertTriangle size={20} color="var(--color-alert)" /> : <ShieldCheck size={20} color="var(--color-success)" />}
          </div>
          <div className="metric-value" style={{color: metrics.alerts > 0 ? 'var(--color-alert)' : 'var(--color-success)', textShadow: metrics.alerts > 0 ? '0 0 10px rgba(255,77,109,0.5)' : 'none'}}>
            {metrics.alerts}
          </div>
        </motion.div>
      </div>

      <div className="dashboard-grid">
        <div style={{gridColumn: '1 / span 2'}}>
           <Scene3D />
        </div>
        <div style={{gridColumn: '3 / span 1'}}>
           <h3 style={{marginBottom: '16px', fontSize: '18px', color: 'var(--color-text)'}}>Live AI Feed</h3>
           <AIInsightsPanel />
        </div>
      </div>
    </motion.div>
  );
};
export default Dashboard;
