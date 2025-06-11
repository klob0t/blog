'use client'
import styles from './index.module.css'
import { useState, useEffect, useRef } from 'react'

interface BackgroundPixel {
  mousePosition: { x: number, y: number } | null
}

const BLOCK_SIZE = 30 

export default function PixelTrail({ mousePosition }: BackgroundPixel) {

const [grid, setGrid] = useState({ columns: 0, rows: 0 })
  const gridRef = useRef<HTMLDivElement>(null) 
  const lastActivatedPixel = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const calculateGrid = () => {
      const columns = Math.ceil(window.innerWidth / BLOCK_SIZE)
      const rows = Math.ceil(window.innerHeight / BLOCK_SIZE)
      setGrid({ columns, rows })
    }

    calculateGrid()
    window.addEventListener('resize', calculateGrid)
    return () => window.removeEventListener('resize', calculateGrid)
  }, [])

  useEffect(() => {
    if (!mousePosition || !gridRef.current) return

    const { x, y } = mousePosition
    const colIndex = Math.floor(x / BLOCK_SIZE)
    const rowIndex = Math.floor(y / BLOCK_SIZE)
    
    const columnElement = gridRef.current.children[colIndex] as HTMLElement
    const targetPixel = columnElement?.children[rowIndex] as HTMLElement

    if (targetPixel && targetPixel !== lastActivatedPixel.current) {
      targetPixel.classList.add(styles.active)
      lastActivatedPixel.current = targetPixel

      setTimeout(() => {
        targetPixel.classList.remove(styles.active)
      }, 500) 
    }

  }, [mousePosition]) 

  return (
    <div className={styles.container}>
      <div className={styles.grid} ref={gridRef}>
        {[...Array(grid.columns)].map((_, colIndex) => (
          <div key={colIndex} className={styles.column}>
            {[...Array(grid.rows)].map((_, rowIndex) => (
              <div key={rowIndex} className={styles.pixel}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}