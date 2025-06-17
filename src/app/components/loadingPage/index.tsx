'use client'
import { useRef } from 'react'
import styles from './index.module.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useLoadingStore } from '@/app/lib/store/loadingStore'
import { usePrevious } from '@/app/lib/usePrevious'
import{ Logo } from '@/app/components/logo'

export default function Loading() {
   const isAppLoading = useLoadingStore(state => state.activeLoaders > 0)
   const prevIsAppLoading = usePrevious(isAppLoading)
   const containerRef = useRef<HTMLDivElement>(null)

   const loaderTl = useRef<gsap.core.Timeline>(undefined)


   useGSAP(() => {
      const el = containerRef.current
      if (!el) return
      const svg = el.querySelector('svg')
      if (!svg) return


      if (!isAppLoading && prevIsAppLoading === true) {
         loaderTl.current?.kill()

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