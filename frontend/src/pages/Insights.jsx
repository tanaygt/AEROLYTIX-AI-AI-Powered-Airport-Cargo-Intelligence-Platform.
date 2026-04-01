import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, ShieldAlert, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Insights = () => {
  const [efficiencyData, setEfficiencyData] = useState([]);

  useEffect(() => {
    // Mock simulation data
    setEfficiencyData([
      { name: 'Mon', efficiency: 86, predicted: 84 },
      { name: 'Tue', efficiency: 82, predicted: 85 },
      { name: 'Wed', efficiency: 91, predicted: 88 },
      { name: 'Thu', efficiency: 88, predicted: 89 },
      { name: 'Fri', efficiency: 93, predicted: 91 },
      { name: 'Sat', efficiency: 95, predicted: 94 },
      { name: 'Sun', efficiency: 94, predicted: 95 },
    ]);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-container">
      <div className="page-header">
        <h1>AI Operational Insights</h1>
        <p>Deep Learning Global System Observations</p>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel chart-container full-width">
           <div className="panel-title" style={{display:'flex', alignItems:'center', gap:'8px'}}>
             <Brain color="var(--color-primary)" />
             <span>Global Efficiency Tracker</span>
           </div>
           <div style={{ height: '300px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={efficiencyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#0B0F1A', border: '1px solid var(--color-primary)'}} />
                  <Bar dataKey="efficiency" fill="var(--color-primary)" name="Actual Efficiency %" radius={[4,4,0,0]} />
                  <Bar dataKey="predicted" fill="var(--color-secondary)" name="AI Predicted Mode" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="glass-panel metric-card">
          <div className="metric-card-header">
             <span>Sustainability Insight</span>
             <Zap size={20} color="#EAB308" />
          </div>
          <div style={{fontSize:'14px', marginTop:'12px', lineHeight:'1.6', color:'var(--color-text-muted)'}}>
            AI has detected a <span style={{color:'var(--color-success)', fontWeight:600}}>14% reduction</span> in idle power draw across Terminal B chillers during off-peak hours over the last 72 hours. Recommend extending auto-shutoff parameters to Terminal A.
          </div>
        </div>

        <div className="glass-panel metric-card">
          <div className="metric-card-header">
             <span>Cargo Risk Alert</span>
             <ShieldAlert size={20} color="var(--color-alert)" />
          </div>
          <div style={{fontSize:'14px', marginTop:'12px', lineHeight:'1.6', color:'var(--color-text-muted)'}}>
            The NLP Security Engine has flagged an elevated frequency of incomplete manifest declarations from <span style={{color:'var(--color-alert)', fontWeight:600}}>GlobalFreight</span>. Automatic screening strictness has been temporarily elevated to Level 3.
          </div>
        </div>

        <div className="glass-panel chart-container full-width">
          <div className="panel-title"><TrendingUp color="var(--color-primary)" style={{display:'inline', marginRight:'8px'}} size={20} />AI Core Recommendations</div>
          <div className="recommendation-list">
            <div className="recommendation-item">
               <div style={{fontSize: '14px'}}><strong>Capacity:</strong> Move 3 labor units to Bay 4 to accommodate incoming high-density cargo payload expected at 14:00.</div>
            </div>
            <div className="recommendation-item">
               <div style={{fontSize: '14px'}}><strong>Routing:</strong> Optimize internal truck pathways. Shifting route Alpha to Beta will save approx 400kWh daily based on historical pathing logs.</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Insights;
