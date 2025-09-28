'use client'
import { useRef } from 'react'
import styles from './index.module.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useLoadingStore } from '@/app/lib/store/loadingStore'
import { usePrevious } from '@/app/lib/usePrevious'
import { Logo } from '@/app/components/logo'

export default function Loading() {
   const isAppLoading = useLoadingStore(state => state.activeLoaders.size > 0)
   const prevIsAppLoading = usePrevious(isAppLoading)
   const containerRef = useRef<HTMLDivElement>(null)

   const loaderTl = useRef<gsap.core.Timeline>(undefined)

   useGSAP(() => {


      if (!isAppLoading && prevIsAppLoading === true) {
         loaderTl.current?.kill()

         const svg = containerRef.current?.querySelector('svg')
         if (!svg) return

         const finishTl = gsap.timeline()

         finishTl.to(svg, {
            rotation: 0,
            duration: 0.8,
            fill: 'black',
            ease: 'power2.out'
         })

         finishTl.to(svg, {
            fill: 'black',
            duration: 0.5,
            ease: 'power2.out',
            overwrite: true,
         })

      }

   }, { scope: containerRef, dependencies: [isAppLoading, prevIsAppLoading] })

   useGSAP(() => {
      const svg = containerRef.current?.querySelector('svg')
      if (!svg) {
         console.log('SVG element not found in DOM')
         return
      }
      const paths = svg.querySelectorAll('path')
      console.log('Found paths:', paths.length)
      console.log('Loading state:', isAppLoading)

      if (isAppLoading) {
         console.log('Creating blinking lamp animation')
         const lastPath = paths[paths.length - 1]
         if (lastPath) {

            const tl = gsap.timeline({ repeat: -1 })
            tl.to(lastPath, {
               opacity: 0,
               duration: 0.4,
               ease: "none"
            })

         }
      } else {
         console.log('Stopping animation')
         const lastPath = paths[paths.length - 1]
         if (lastPath) {
            gsap.killTweensOf(lastPath)
            gsap.set(lastPath, { opacity: 1 })
         }
      }

   }, { dependencies: [isAppLoading] })

   return (
      <div
         ref={containerRef}
         className={styles.loadingContainer}>
         <div className={styles.svgWrapper}>
            <Logo />
         </div>
      </div>
   )
}