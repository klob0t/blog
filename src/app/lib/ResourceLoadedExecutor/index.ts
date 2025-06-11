'use client'
import { useEffect, useRef } from 'react'
import { useLoading } from '@/app/lib/LoadingContext'
import { usePathname } from 'next/navigation'

export const AllLoaded = () => {
   const { isAppLoading } = useLoading()
   const pathname = usePathname()

   const hasFired = useRef(false)
   
   useEffect(() => {
      hasFired.current = false;
   }, [pathname]);

   useEffect(() => {
      if (!isAppLoading && !hasFired.current) {
         console.log('All resources are fully loaded')
         hasFired.current = true
      }
   }, [isAppLoading])

   return null
}