'use client'

import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react'

interface LoadingContextType {
   isAppLoading: boolean
   startLoading: () => void
   finishLoading: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
   const [activeLoaders, setActiveLoaders] = useState<number>(0)

   const contextValue = useMemo(() => ({
      isAppLoading: activeLoaders > 0,
      startLoading: () => setActiveLoaders(count => count + 1),
      finishLoading: () => setActiveLoaders(count => Math.max(0, count - 1))
   }), [activeLoaders])

   return (
      <LoadingContext.Provider value={contextValue}>
         {children}
      </LoadingContext.Provider>
   )
}

export const useLoading = () => {
   const context = useContext(LoadingContext)
   if (context === undefined) {
      throw new Error('useLoading must be used within a LoadingProvider')
   }
   return context
}