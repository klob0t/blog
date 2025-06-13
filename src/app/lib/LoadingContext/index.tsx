// //app/src/app/lib/LoadingContext/index.tsx
// 'use client'
// import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback, useEffect, useRef } from 'react'

// interface LoadingContextType {
//   isAppLoading: boolean
//   startLoading: () => void
//   finishLoading: () => void
// }

// const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

// export const LoadingProvider = ({ children }: { children: ReactNode }) => {
//   const [activeLoaders, setActiveLoaders] = useState<number>(1)

//   const finishRequestCount = useRef(0)
//   const timeoutRef = useRef<NodeJS.Timeout>(null)

//   const startLoading = useCallback(() => {
//     setActiveLoaders(count => count + 1)
//   }, [])

//   const processFinishRequests = useCallback(() => {
//     if (finishRequestCount.current > 0) {
//       setActiveLoaders(count => Math.max(0, count - finishRequestCount.current))
//       finishRequestCount.current = 0
//     }
//   }, [])

//   const finishLoading = useCallback(() => {
//     finishRequestCount.current += 1

//     if(timeoutRef.current) {
//       clearTimeout(timeoutRef.current)
//     }

//     timeoutRef.current = setTimeout(processFinishRequests, 60)
//   }, [processFinishRequests])


//   useEffect(() => {
//       finishLoading()
//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current)
//       }
//     }
//   }, [finishLoading])

//   const contextValue = useMemo(() => ({
//     isAppLoading: activeLoaders > 0,
//     startLoading,
//     finishLoading
//   }), [activeLoaders, startLoading, finishLoading])

//   return (
//     <LoadingContext.Provider value={contextValue}>
//       {children}
//     </LoadingContext.Provider>
//   )
// }

// export const useLoading = () => {
//   const context = useContext(LoadingContext)
//   if (context === undefined) {
//     throw new Error('useLoading must be used within a LoadingProvider')
//   }
//   return context
// }


'use client'
import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback, useEffect } from 'react'

interface LoadingContextType {
  isAppLoading: boolean
  startLoading: () => void
  finishLoading: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [activeLoaders, setActiveLoaders] = useState<number>(1)

  useEffect(() => {
    console.log(`%c LOADER COUNT CHANGED: ${activeLoaders}`, 'color: yellow');
  }, [activeLoaders]);

  const startLoading = useCallback((id: string = 'unidentified') => {
    console.log(`%c -> startLoading called from: [${id}]`, 'color: lightblue');
    setActiveLoaders(count => count + 1)
  }, [])

  const finishLoading = useCallback((id: string = 'unidentified') => {
    console.log(`%c <- finishLoading called from: [${id}]`, 'color: lightgreen');
    setActiveLoaders(count => Math.max(0, count - 1))
  }, [])
  
  // This effect handles the initial page load
  useEffect(() => {
    console.log('%c Initial app load effect triggered', 'color: orange');
    finishLoading('initial-load-effect');
    
    // The empty dependency array [] ensures this runs only once on mount.
  }, []) 

  const contextValue = useMemo(() => ({
    isAppLoading: activeLoaders > 0,
    startLoading,
    finishLoading
  }), [activeLoaders, startLoading, finishLoading])

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