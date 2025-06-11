'use client'
import { useRef } from 'react'
// import { gsap } from 'gsap'
// import { useGSAP } from '@gsap/react'
import styles from './index.module.css'

export default function Loading() {
   const containerRef = useRef<HTMLDivElement>(null)
   const spinnerRef = useRef<HTMLDivElement>(null)

   const ticks = Array.from(Array(8))

   return (
      <div className={styles.loadingContainer} ref={containerRef}>
         <div className={styles.spinnerContainer} ref={spinnerRef}>
            <div className={styles.spinner} style={{ width: 60, height: 60 }}>
               {ticks.map((_, i) => (
                  <div
                     key={i}
                     className={styles.tickWrapper}
                     style={{ transform: `rotate(${i * 360 / ticks.length}deg)` }}>
                     <div
                        className={styles.tick}
                        style={{ animationDelay: `${-1 + (i * 1 / ticks.length)}s` }}
                     />
                  </div >
               ))}
            </div>
         </div>
      </div>
   )
}