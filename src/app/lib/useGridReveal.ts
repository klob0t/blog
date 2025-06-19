//@/app/lib/useGridReveal.ts
'use client'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { RefObject } from 'react'
import { useLoadingStore } from '@/app/lib/store/loadingStore'

export const useGridReveal = (scope: RefObject<HTMLDivElement | null>) => {
   const isAppLoading = useLoadingStore(state => state.activeLoaders > 0)

   useGSAP(() => {
      if (!scope.current) return

      const gridItems = gsap.utils.toArray('.grid-item', scope.current)

      if (!isAppLoading) {
         gsap.set(gridItems, {
            opacity: 0,
            translateY: 20,
         })


         gsap.to(gridItems, {
            opacity: 1,
            duration: 1,
            translateY: 0,
            ease: 'power4.out',
            stagger: {
               each: 0.1,
               from: 'start',
            },
            delay: 1.1
         })
      }
   }, { scope, dependencies: [isAppLoading] })
}