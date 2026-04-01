import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { Clock } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

// Simple abstract gauge
const CapacityGauge = ({ pct }) => {
  const [display, setDisplay] = useState(0);
  useEffect(()=>{
     setTimeout(()=>setDisplay(pct), 300);
  }, [pct]);
  
  return (
    <div style={{position:'relative', width:'150px', height:'150px', borderRadius:'50%', border:'10px solid rgba(255,255,255,0.05)', display:'flex', alignItems:'center', justifyContent:'center'}}>
       <div style={{
          position:'absolute', top:'-10px', left:'-10px', right:'-10px', bottom:'-10px',
          borderRadius:'50%',
          border:`10px solid ${pct > 80 ? 'var(--color-alert)' : 'var(--color-primary)'}`,
          clipPath: `polygon(0 100%, 100% 100%, 100% ${100 - display}%, 0 ${100 - display}%)`,
          transition: 'all 2s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: `0 0 20px ${pct > 80 ? 'rgba(255,77,109,0.5)' : 'rgba(0,243,255,0.3)'}`
       }}></div>
       <div style={{textAlign:'center'}}>
         <div style={{fontSize:'32px', fontWeight:800, color:'#fff'}}>{display.toFixed(0)}%</div>
         <div style={{fontSize:'10px', color:'var(--color-text-muted)', textTransform:'uppercase'}}>Utilization</div>
       </div>
    </div>
  )
}

const Demand = () => {
  const [data, setData] = useState(null);
  const { pollInterval } = useDemo();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/cargo-forecast`);
        
        // merge historical and forecast for charting
        const chartData = res.data.historical_demand.map(h => ({ name: h.date?.split(' ')[0] || h.date, volume: h.cargo_volume_tons, isForecast: false }));
        let lastDate = new Date(chartData[chartData.length-1].name);
        res.data.forecast.forEach((f, i) => {
          lastDate.setDate(lastDate.getDate() + 1);
          chartData.push({
            name: lastDate.toISOString().split('T')[0],
            forecast_volume: f,
            isForecast: true
          });
        });
        
        setData({...res.data, chartData});
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
        <h1>Demand Forecasting & Capacity</h1>
        <p>AI Predictive Models for Terminal Planning</p>
      </div>

      {data && (
        <>
          <div className="metrics-grid">
            <motion.div whileHover={{y:-5}} className="glass-panel metric-card" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <div>
                <div className="metric-card-header">Warehouse Util. Gauge</div>
                <div style={{fontSize:'13px', color:'var(--color-text-muted)', marginTop:'8px'}}>Live volumetric capacity of all terminals.</div>
              </div>
              <CapacityGauge pct={data.current_capacity_pct} />
            </motion.div>

            <motion.div whileHover={{y:-5}} className="glass-panel metric-card" style={{borderColor: data.capacity_risk === 'High' ? 'var(--color-alert)' : 'rgba(0,243,255,0.2)'}}>
              <div className="metric-card-header">Capacity Risk Level</div>
              <div className="metric-value" style={{
                 color: data.capacity_risk === 'High' ? 'var(--color-alert)' : 'var(--color-primary)',
                 textShadow: data.capacity_risk === 'High' ? '0 0 15px rgba(255,77,109,0.5)' : 'none'
              }}>
                 {data.capacity_risk}
              </div>
            </motion.div>
          </div>

          <div className="dashboard-grid">
            <motion.div 
               initial={{y: 20, opacity: 0}}
               animate={{y: 0, opacity: 1}}
               className="glass-panel chart-container" 
               style={{gridColumn: '1 / -1'}}
            >
              <div className="panel-title">Cargo Volume Forecast (Tons)</div>
              <div style={{ height: '350px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} />
                    <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} />
                    <Tooltip contentStyle={{backgroundColor: 'rgba(11, 15, 26, 0.9)', border: '1px solid var(--color-secondary)'}} />
                    <Line type="monotone" dataKey="volume" stroke="#00F3FF" strokeWidth={4} dot={{r: 4, fill: '#00F3FF', strokeWidth:0}} activeDot={{r: 8}} name="Actual Volume" />
                    <Line type="monotone" dataKey="forecast_volume" stroke="#7B61FF" strokeWidth={4} strokeDasharray="8 8" dot={{r: 4, fill: '#7B61FF', strokeWidth:0}} activeDot={{r: 8}} name="AI Forecast" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div 
               initial={{y: 20, opacity: 0}}
               animate={{y: 0, opacity: 1}}
               transition={{delay: 0.1}}
               className="glass-panel chart-container full-width"
            >
              <div className="panel-title">AI Logistics Planning</div>
              <div className="recommendation-list">
                {data.planning_recommendations.map((rec, i) => (
                  <div key={i} className="recommendation-item">
                    <div style={{background: 'rgba(0, 243, 255, 0.1)', padding:'8px', borderRadius:'8px'}}>
                       <Clock color="var(--color-primary)" size={20} />
                    </div>
                    <div style={{display:'flex', alignItems:'center'}}>
                       <div style={{fontSize: '14px', lineHeight:'1.5'}}>{rec}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
};
export default Demand;
