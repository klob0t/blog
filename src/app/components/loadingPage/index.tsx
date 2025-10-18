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