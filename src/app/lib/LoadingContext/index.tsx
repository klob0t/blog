//app/src/app/lib/LoadingContext/index.tsx
'use client'
import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback, useEffect, useRef } from 'react'

interface LoadingContextType {
  isAppLoading: boolean
  startLoading: () => void
  finishLoading: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [activeLoaders, setActiveLoaders] = useState<number>(1)

  const finishRequestCount = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout>(null)

  const startLoading = useCallback(() => {
    setActiveLoaders(count => count + 1)
  }, [])

  const processFinishRequests = useCallback(() => {
    if (finishRequestCount.current > 0) {
      setActiveLoaders(count => Math.max(0, count - finishRequestCount.current))
      finishRequestCount.current = 0
    }
  }, [])

  const finishLoading = useCallback(() => {
    finishRequestCount.current += 1

    if(timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(processFinishRequests, 60)
  }, [processFinishRequests])


  useEffect(() => {
      finishLoading()
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [finishLoading])

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



//app/src/app/lib/LoadingContext/index.tsx
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

//   const startLoading = useCallback(() => {
//     setActiveLoaders(count => count + 1)
//   }, [])

//   const finishLoading = useCallback(() => {
//     setActiveLoaders(count => Math.max(0, count - 1))
//   }, [])

//   const effectRan = useRef(false)

//   useEffect(() => {
//     if (effectRan.current === true) {
//       finishLoading()
//     }
//     return () => {
//       effectRan.current = true
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