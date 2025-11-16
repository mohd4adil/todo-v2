import React, { createContext, useState, useContext, useEffect } from 'react';

const SidebarContext = createContext(null);

export const SidebarProvider = ({ children }) => {
    const [sidebarState, setSidebarState] = useState('expanded');

    const toggleSidebarState = () => {
        if (sidebarState === 'expanded') setSidebarState('collapsed')
        else setSidebarState('expanded')
    }

    const values = {
        sidebarState,
        toggleSidebarState
    }

    return (
        <SidebarContext.Provider value={values}>
            {children}
        </SidebarContext.Provider>
    )

};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within Sidebar Provider') 
    }
    return context;
}