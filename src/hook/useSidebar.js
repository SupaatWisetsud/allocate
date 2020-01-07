import React, { createContext, useEffect } from 'react'

export const SidebarContext = createContext();

export const SidebarProvider = ({children}) => {

    useEffect(()=>{
        
        const callApi = async () => {

        }
        callApi();

        return () => {} //component will mouted

    }, [])

    return <SidebarContext.Provider value={{user}}>
        {children}
    </SidebarContext.Provider>
}
