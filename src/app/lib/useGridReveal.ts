//@/app/lib/useGridReveal.ts
'use client'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { RefObject } from 'react'
import { useLoadingStore } from '@/app/lib/store/loadingStore'
import { usePrevious } from "@/app/lib/usePrevious"
import { usePopupStore } from '@/app/lib/store/popupStore'

export const useGridReveal = (scope: RefObject<HTMLDivElement | null>) => {
   const isAppLoading = useLoadingStore(state => state.activeLoaders > 0)
   const prevIsAppLoading = usePrevious(isAppLoading)
   const isPopupOpen = usePopupStore(state => state.isOpen)

   useGSAP(() => {
      if (!scope.current) return

      const gridItems = gsap.utils.toArray('.grid-item', scope.current)

      if (prevIsAppLoading === true && !isAppLoading && !isPopupOpen) {
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
   }, { scope, dependencies: [isAppLoading, isPopupOpen] })
}