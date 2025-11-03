'use client'
import React, { useEffect, useRef } from 'react'
import styles from './index.module.css'

const BASE_BLOCK_SIZE = 20
const DOT_SCALE = 0.05
const GRADIENT_EXPONENT = 2

export const DotGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frameId: number | null = null

    const drawGrid = (width: number, height: number) => {
      if (width === 0 || height === 0) return

      ctx.clearRect(0, 0, width, height)

      const cardRatio = width / height
      const rowCount = Math.max(2, Math.round(height / BASE_BLOCK_SIZE))
      const columnCount = Math.max(2, Math.round(rowCount * cardRatio))

      const horizontalGap = width / columnCount
      const verticalGap = height / rowCount
      const dotRadius = Math.max(
        1,
        Math.min(horizontalGap, verticalGap) * DOT_SCALE
      )

      for (let col = 0; col < columnCount; col++) {
        const x = (col + 0.5) * horizontalGap

        for (let row = 0; row < rowCount; row++) {
          const y = (row + 0.5) * verticalGap
          const ratio =
            height === 0 ? 0 : Math.max(0, 1 - Math.min(1, y / height))
          const opacity = Math.pow(ratio, GRADIENT_EXPONENT)

          ctx.fillStyle = `rgba(220, 220, 220, ${opacity.toFixed(3)})`
          ctx.beginPath()
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const resizeAndDraw = (width: number, height: number) => {
      const pixelRatio = window.devicePixelRatio || 1

      canvas.width = Math.max(1, Math.round(width * pixelRatio))
      canvas.height = Math.max(1, Math.round(height * pixelRatio))
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      drawGrid(width, height)
    }

    const queueRedraw = (width: number, height: number) => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId)
      }

      frameId = requestAnimationFrame(() => {
        resizeAndDraw(width, height)
        frameId = null
      })
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const { width, height } = entry.contentRect
      queueRedraw(width, height)
    })

    observer.observe(container)

    const { width, height } = container.getBoundingClientRect()
    queueRedraw(width, height)

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId)
      }
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}
