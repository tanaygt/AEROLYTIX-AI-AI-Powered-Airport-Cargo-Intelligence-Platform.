import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Bot, Send, User } from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import axios from 'axios';

// Typing effect component
const TypingEffect = ({ text, onComplete }) => {
  const [displayed, setDisplayed] = useState('');
  const { speedMultiplier } = useDemo();
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        if(onComplete) onComplete();
      }
    }, 20 / speedMultiplier);
    return () => clearInterval(interval);
  }, [text, speedMultiplier, onComplete]);

  return <div style={{whiteSpace: 'pre-wrap'}}>{displayed}</div>;
};

const AICopilot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "AEROLYTIX AI Core Online.\nI am monitoring live operational data.\nHow can I assist your cargo planning?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [pendingResponse, setPendingResponse] = useState(null);
  
  const messagesEndRef = useRef(null);
  const { demoMode } = useDemo();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, pendingResponse]);

  const handleQuery = async (query) => {
    if(isTyping || pendingResponse) return;
    
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setIsTyping(true);

    try {
      let responseText = "";
      const q = query.toLowerCase();

      if (q.includes("energy")) {
        const res = await axios.get('http://localhost:8000/energy-analysis');
        responseText = `AI Insight:\nEnergy anomaly detected: ${res.data.anomalies_detected} anomalies.\nCurrent draw is ${Math.round(res.data.current_energy_kwh)} kWh.\n\nRecommendation:\n${res.data.recommendations[0]}`;
      } else if (q.includes("congestion") || q.includes("demand") || q.includes("forecast")) {
        const res = await axios.get('http://localhost:8000/cargo-forecast');
        responseText = `Forecast Insight:\nCapacity risk is currently ${res.data.capacity_risk} at ${res.data.current_capacity_pct.toFixed(1)}%.\n\nRecommendation:\n${res.data.planning_recommendations[0]}`;
      } else if (q.includes("security") || q.includes("risk")) {
        const res = await axios.get('http://localhost:8000/security-risk-analysis');
        responseText = `Security Alert:\nDetected ${res.data.high_risk_alerts} high risk declarations today out of ${res.data.total_scanned_today} scanned.\n\nRecommendation:\nInspect flagged items immediately.`;
      } else {
        responseText = `AI Insight:\nSystem operating within normal parameters.\n\nRecommendation:\nContinue monitoring terminal throughput.`;
      }

      setTimeout(() => {
        setIsTyping(false);
        setPendingResponse(responseText);
      }, demoMode ? 300 : 800);

    } catch (err) {
      setTimeout(() => {
        setIsTyping(false);
        setPendingResponse("AI Insight:\nBackend disconnected. Operating on local cache.\n\nRecommendation:\nCheck system network settings.");
      }, 500);
    }
  };

  const handleCompleteTyping = () => {
    if(pendingResponse) {
      setMessages(prev => [...prev, { role: 'ai', content: pendingResponse }]);
      setPendingResponse(null);
    }
  };

  return (
    <>
      <motion.div 
        className="copilot-button glass-panel"
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 243, 255, 0.5)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <Bot size={24} color="var(--color-primary)" />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="copilot-panel glass-panel"
          >
            <div className="copilot-header">
              <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                <div style={{background: 'rgba(0, 243, 255, 0.2)', padding:'6px', borderRadius:'8px'}}>
                  <Bot size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 style={{margin:0, fontSize:'14px'}}>AEROLYTIX AI Copilot</h4>
                  <p style={{margin:0, fontSize:'11px', color:'var(--color-primary)'}}>Cargo Operations Assistant {demoMode && '(Fast Mode)'}</p>
                </div>
              </div>
              <button className="icon-btn" onClick={() => setIsOpen(false)}>
                <X size={18} color="rgba(255,255,255,0.7)" />
              </button>
            </div>

            <div className="copilot-messages">
              {messages.map((m, i) => (
                <div key={i} className={`message-wrapper ${m.role}`}>
                  <div className="message-bubble">
                    <div style={{whiteSpace: 'pre-wrap'}}>{m.content}</div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="message-wrapper ai">
                  <div className="message-bubble">
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Analyzing parameters...
                    </motion.div>
                  </div>
                </div>
              )}
              
              {pendingResponse && (
                <div className="message-wrapper ai">
                  <div className="message-bubble">
                    <TypingEffect text={pendingResponse} onComplete={handleCompleteTyping} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="copilot-suggestions">
               <button onClick={()=>handleQuery("Why is energy usage high?")}>⚡ Energy Check</button>
               <button onClick={()=>handleQuery("Is cargo congestion expected?")}>📦 Demand Forecast</button>
               <button onClick={()=>handleQuery("Are there security risks today?")}>🛡 Security Risks</button>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AICopilot;
