import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useDemo } from '../context/DemoContext';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

const highlightKeywords = (text) => {
  const keywords = ["hazardous", "leak", "missing", "unlabeled", "explosive", "suspect"];
  const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) => 
        keywords.includes(part.toLowerCase()) ? (
          <span key={i} style={{color: 'var(--color-alert)', fontWeight: 'bold', background: 'rgba(255,77,109,0.2)', padding:'2px 4px', borderRadius:'4px'}}>{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

const Security = () => {
  const [data, setData] = useState(null);
  const { pollInterval } = useDemo();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/security-risk-analysis');
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
        <h1>Cargo Security (PLACI)</h1>
        <p>Advance Cargo Information NLP Risk Engine</p>
      </div>

      {data && (
        <>
          <div className="metrics-grid">
            <motion.div whileHover={{y:-5}} className="glass-panel metric-card">
              <div className="metric-card-header">Scanned Today</div>
              <div className="metric-value">{data.total_scanned_today.toLocaleString()}</div>
            </motion.div>
            <motion.div whileHover={{y:-5}} className="glass-panel metric-card" style={{borderColor: data.high_risk_alerts > 0 ? 'var(--color-alert)' : 'rgba(0,243,255,0.3)', boxShadow: data.high_risk_alerts > 0 ? '0 0 20px rgba(255,77,109,0.3)' : 'inset 0 0 20px rgba(0,243,255,0.1)'}}>
              <div className="metric-card-header">
                 <span>High Risk Alerts</span>
                 {data.high_risk_alerts > 0 ? <ShieldAlert color="var(--color-alert)" /> : <ShieldCheck color="var(--color-success)" />}
              </div>
              <div className="metric-value" style={{color: data.high_risk_alerts > 0 ? 'var(--color-alert)' : 'var(--color-success)'}}>{data.high_risk_alerts}</div>
            </motion.div>
          </div>

          <motion.div 
            initial={{y: 20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            className="glass-panel chart-container full-width"
          >
            <div className="panel-title">Live Cargo Declaration Feed (NLP Scanned)</div>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Shipment ID</th>
                    <th>Airline</th>
                    <th>Description (Keyword Highlighted)</th>
                    <th>Weight (kg)</th>
                    <th>Origin</th>
                    <th>AI Risk Score</th>
                    <th>Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {data.declarations.slice(-10).reverse().map((dec, i) => (
                      <motion.tr 
                        key={dec.shipment_id + i}
                        initial={{opacity: 0, x: -10}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: i * 0.05}}
                        style={{background: dec.risk_score > 0.6 ? 'rgba(255,77,109,0.05)' : 'transparent'}}
                      >
                        <td style={{fontWeight: 600}}>{dec.shipment_id}</td>
                        <td>{dec.airline}</td>
                        <td style={{color: 'var(--color-text-muted)'}}>{highlightKeywords(dec.description)}</td>
                        <td>{dec.declared_weight_kg.toFixed(0)}</td>
                        <td>{dec.origin}</td>
                        <td>
                          <div style={{display:'flex', alignItems:'center', gap: '8px'}}>
                            <div style={{
                              width: '60px', 
                              height: '6px', 
                              background: 'rgba(255,255,255,0.1)',
                              borderRadius: '3px',
                              overflow: 'hidden'
                            }}>
                                <div style={{
                                  width: `${dec.risk_score * 100}%`,
                                  height: '100%',
                                  background: dec.risk_score > 0.6 ? 'var(--color-alert)' : 'var(--color-success)',
                                  boxShadow: `0 0 10px ${dec.risk_score > 0.6 ? 'var(--color-alert)' : 'var(--color-success)'}`
                                }}></div>
                            </div>
                            <span style={{
                              color: dec.risk_score > 0.6 ? 'var(--color-alert)' : 'var(--color-success)',
                              fontWeight: 700
                            }}>
                              {(dec.risk_score * 100).toFixed(0)}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${dec.risk_score > 0.6 ? 'danger' : 'success'}`}>
                            {dec.recommendation}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};
export default Security;
