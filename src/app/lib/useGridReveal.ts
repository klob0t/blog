'use client'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { RefObject } from 'react'
import { useLoading } from '@/app/lib/LoadingContext'
import { usePrevious } from "@/app/components/AppWrapper"


export const useGridReveal = (scope: RefObject<HTMLDivElement | null>) => {

   const { isAppLoading } = useLoading()
   const prevIsAppLoading = usePrevious(isAppLoading)

   useGSAP(() => {
      if (!scope.current) return

      const gridItems = gsap.utils.toArray('.grid-item', scope.current)

      if (prevIsAppLoading === true && !isAppLoading) {
         gsap.set(gridItems, {
            opacity: 0,
            scale: 1,
            translateY: 20,
            filter: 'blur(1em)'
         })


         gsap.to(gridItems, {
            opacity: 1,
            scale: 1,
            filter: 'blur(0em)',
            duration: 1,
            translateY: 0,
            ease: 'power4.out',
            stagger: 0.1,
            delay: 0.7,
            onComplete: () => {
               gsap.set(gridItems, {
                  transform: 'unset',
                  zIndex: 2,
               })
            }
         })
      }
   }, { scope, dependencies: [isAppLoading] })
}