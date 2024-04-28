import React, { createContext, useState, useContext } from 'react';

// Create a context
const SideBarContext = createContext();

// Create a provider component
export const SidebarProviderSuper = ({ children }) => {
  const [isCollapsedSuper, setIsCollapsedSuper] = useState(false);

  return (
    <SideBarContext.Provider value={{ isCollapsedSuper, setIsCollapsedSuper }}>
      {children}
    </SideBarContext.Provider>
  );
};

// Custom hook to consume the context
export const useSidebar = () => useContext(SideBarContext);
