import React, { createContext, useState, useContext } from 'react';

const DemoContext = createContext();

export const DemoProvider = ({ children }) => {
  const [demoMode, setDemoMode] = useState(false);

  // When demoMode is true, speed is 5x, polling is 1s instead of 5s
  const speedMultiplier = demoMode ? 5 : 1;
  const pollInterval = demoMode ? 1000 : 5000;

  return (
    <DemoContext.Provider value={{ demoMode, setDemoMode, speedMultiplier, pollInterval }}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => useContext(DemoContext);
