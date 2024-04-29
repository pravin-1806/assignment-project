
import React, { createContext, useState, useContext } from 'react';

const SideBarContext = createContext();

export const SidebarProviderAdmin = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SideBarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SideBarContext.Provider>
  );
};

export const useSidebar = () => useContext(SideBarContext);
