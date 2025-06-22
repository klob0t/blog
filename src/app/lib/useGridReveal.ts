//@/app/lib/useGridReveal.ts
'use client'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { RefObject } from 'react'
import { useLoadingStore } from '@/app/lib/store/loadingStore'
import { usePrevious } from '@/app/lib/usePrevious'
import CustomEase from 'gsap/CustomEase'

export const useGridReveal = (scope: RefObject<HTMLDivElement | null>) => {
   const activeLoadersCount = useLoadingStore(state => state.activeLoaders.size)
   const isAppLoading = activeLoadersCount > 0
   const prevIsAppLoading = usePrevious(isAppLoading)

   useGSAP(() => {
      if (!scope.current) return

      const tl = gsap.timeline({ delay: 1.3 })
      const gridItems = gsap.utils.toArray('.grid-item', scope.current)

      if (!isAppLoading && prevIsAppLoading === true) {
         tl.fromTo(gridItems, {
            opacity: 0,
            translateY: 20,
            scale: 0.9,
         },
         {
            opacity: 1,
            duration: 1,
            translateY: 0,
            scale: 1, 
            ease: CustomEase.create("custom", "M0,0 C0,0 0.034,-0.005 0.08,0.067 0.203,0.265 0.163,1.073 0.558,1.021 0.676,1.005 1,1 1,1 "),
            stagger: {
               each: 0.1,
               from: 'start',
            },
         })
      }
   }, { scope, dependencies: [isAppLoading] })
}