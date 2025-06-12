'use client'
import { useRef } from 'react'
import styles from './index.module.css'
import Logo from '../logo'

export default function Loading() {
   const containerRef = useRef<HTMLDivElement>(null)
   return (
      <div
         className={styles.loadingContainer}
         ref={containerRef}>
         <Logo />
      </div>
   )
}