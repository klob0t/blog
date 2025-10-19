'use client'
import { useEffect, useRef } from 'react'
import styles from './index.module.css'
import gsap from 'gsap'
import { useLoadingStore } from '@/app/lib/store/loadingStore'
import { Logo } from '@/app/components/logo'

export default function Loading() {
   const isAppLoading = useLoadingStore(state => state.activeLoaders.size > 0)
   const containerRef = useRef<HTMLDivElement>(null)

   const loaderTl = useRef<gsap.core.Timeline>(undefined)
   const rectsRef = useRef<SVGRectElement[]>([])
   const baseColorRef = useRef<string>('currentColor')
   const isLoadingRef = useRef(isAppLoading)
   const logoRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      isLoadingRef.current = isAppLoading
   }, [isAppLoading])

   useEffect(() => {
      const svgElement = logoRef.current?.querySelector('svg')
      if (!svgElement) return

      const rects = Array.from(svgElement.querySelectorAll<SVGRectElement>('rect'))
      if (!rects.length) return

      rectsRef.current = rects

      const computedColor = getComputedStyle(svgElement).color
      if (computedColor) {
         baseColorRef.current = computedColor
      }

      loaderTl.current?.kill()

      loaderTl.current = gsap.timeline({
         repeat: -1,
         repeatDelay: 0,
         paused: true
      })
         .set(rects, { fill: baseColorRef.current })
         .call(() => {
            rects.forEach((rect, index) => {
               const isAlive = Math.random() > 0.5
               gsap.to(rect, {
                  fill: isAlive ? baseColorRef.current : 'rgba(255, 255, 255, 0)',
                  duration: 0.07,
                  ease: 'power1.inOut',
                  delay: index * 0.002
               })
            })
         })
         .to({}, { duration: 0.1 })

      if (isLoadingRef.current) {
         loaderTl.current.restart(true)
         loaderTl.current.play()
      }

      return () => {
         loaderTl.current?.kill()
         loaderTl.current = undefined
      }
   }, [])

   useEffect(() => {
      if (!loaderTl.current || !rectsRef.current.length) return

      if (isAppLoading) {
         loaderTl.current.restart(true)
         loaderTl.current.play()
      } else {
         loaderTl.current.pause(0)
         gsap.to(rectsRef.current, {
            fill: baseColorRef.current,
            duration: 0.3,
            ease: 'power1.out'
         })
      }
   }, [isAppLoading])

   return (
      <div
         ref={containerRef}
         className={styles.loadingContainer}>
         <div className={styles.svgWrapper}>
            <Logo ref={logoRef} />
         </div>
      </div>
   )
}
