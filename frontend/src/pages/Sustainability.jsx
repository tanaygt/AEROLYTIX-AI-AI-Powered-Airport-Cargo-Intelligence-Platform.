import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

// Simple Grid Heatmap visualization 6x4 elements representing Zones
const Heatmap = ({ anomalies }) => {
  const { demoMode } = useDemo();
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap:'8px', height:'100%'}}>
      {[...Array(24)].map((_, i) => {
         // Randomly trigger red if anomalies > 0, else green/blue
         const isRed = anomalies > 0 && Math.random() > 0.8 && demoMode;
         return (
           <motion.div 
             key={i}
             animate={{
                background: isRed ? 'rgba(255,77,109,0.8)' : `rgba(0, 243, 255, ${Math.random()*0.3 + 0.1})`
             }}
             transition={{ duration: 1 }}
             style={{
               borderRadius: '4px',
               width: '100%',
               height: '100%',
               border: '1px solid rgba(255,255,255,0.05)',
               boxShadow: isRed ? '0 0 15px rgba(255,77,109,0.6)' : 'none'
             }}
           />
         );
      })}
    </div>
  );
};

const Sustainability = () => {
  const [data, setData] = useState(null);
  const { pollInterval } = useDemo();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/energy-analysis`);
        setData(res.data);
      } catch (err) {
        console.error("Backend error");
      }
    };
    fetchData();
    const interval = setInterval(fetchData, pollInterval);
    return () => clearInterval(interval);
  }, [pollInterval]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-container">
      <div className="page-header">
        <h1>Sustainability Engine</h1>
        <p>AI-Powered Energy & Emissions Heatmap</p>
      </div>

      {data && (
        <>
          <div className="metrics-grid">
            <motion.div whileHover={{y:-5}} className="glass-panel metric-card">
              <div className="metric-card-header">Current Energy Draw</div>
              <div className="metric-value text-gradient">{data.current_energy_kwh.toFixed(0)} kWh</div>
            </motion.div>
            <motion.div whileHover={{y:-5}} className="glass-panel metric-card">
              <div className="metric-card-header">Est. Carbon Emissions</div>
              <div className="metric-value">{data.current_carbon_emissions.toFixed(0)} kg CO2</div>
              <div style={{fontSize:'12px', color:'var(--color-success)', marginTop:'4px'}}>-12% vs last week (AI Optimized)</div>
            </motion.div>
            <motion.div whileHover={{y:-5}} className="glass-panel metric-card" style={{border: data.anomalies_detected > 0 ? '1px solid var(--color-alert)' : '1px solid rgba(255,255,255,0.1)'}}>
              <div className="metric-card-header">Anomalies Detected</div>
              <div className="metric-value" style={{color: data.anomalies_detected > 0 ? 'var(--color-alert)' : 'var(--color-success)', textShadow: data.anomalies_detected > 0 ? '0 0 10px rgba(255,77,109,0.5)' : 'none'}}>
                {data.anomalies_detected}
              </div>
            </motion.div>
          </div>

          <div className="dashboard-grid">
            <div className="glass-panel chart-container full-width">
              <div className="panel-title">Energy Consumption Trend (Last 48h)</div>
              <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.recent_trend}>
                    <defs>
                      <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="timestamp" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} />
                    <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} />
                    <Tooltip contentStyle={{backgroundColor: 'rgba(11, 15, 26, 0.9)', border: '1px solid var(--color-primary)', backdropFilter: 'blur(8px)'}} />
                    <Area type="monotone" dataKey="energy_kwh" stroke="var(--color-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorEnergy)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="glass-panel chart-container" style={{gridColumn: '1 / span 1'}}>
               <div className="panel-title">Terminal Zonal Heatmap</div>
               <div style={{height: '200px'}}>
                  <Heatmap anomalies={data.anomalies_detected} />
               </div>
               <div style={{display:'flex', justifyContent:'space-between', fontSize:'12px', marginTop:'16px', color:'var(--color-text-muted)'}}>
                 <span>Optimal Draw</span>
                 <span style={{color:'var(--color-alert)'}}>Anomaly Peak</span>
               </div>
            </div>

            <div className="glass-panel chart-container" style={{gridColumn: '2 / span 1'}}>
              <div className="panel-title">AI Optimization Recommendations</div>
              <div className="recommendation-list">
                {data.recommendations.map((rec, i) => (
                  <div key={i} className="recommendation-item">
                    {data.anomalies_detected > 0 ? <AlertCircle color="var(--color-alert)" /> : <CheckCircle color="var(--color-success)" />}
                    <div>
                      <div style={{fontSize: '14px'}}>{rec}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};
export default Sustainability;
