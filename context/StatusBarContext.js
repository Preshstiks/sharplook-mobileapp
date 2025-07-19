import React, { createContext, useState, useContext } from "react";

const StatusBarContext = createContext();

export const useStatusBar = () => useContext(StatusBarContext);

export const StatusBarProvider = ({ children }) => {
  const [barType, setBarType] = useState("primary"); // default to secondary

  return (
    <StatusBarContext.Provider value={{ barType, setBarType }}>
      {children}
    </StatusBarContext.Provider>
  );
};
