'use client'
import { useState, useEffect, RefObject } from 'react'

interface Coordinates {
   x: number
   y: number
}

export function useMousePositionToVar(ref: RefObject<HTMLElement  | null>): Coordinates | null {
   const [coordinates, setCoordinates] = useState<Coordinates | null>(null)

   useEffect(() => {
      const element = ref.current

      if (!element) return

      const handleMouseMove = (e: MouseEvent) => {
         const x = Math.round(e.clientX)
         const y = Math.round(e.clientY)
         setCoordinates({ x, y })
         document.documentElement.style.setProperty('--x', x.toString())
         document.documentElement.style.setProperty('--y', y.toString())
      }

      const handleMouseLeave = () => {
         setCoordinates(null)
         document.documentElement.style.setProperty('--x', '0')
         document.documentElement.style.setProperty('--y', '0')
      }
      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseleave', handleMouseLeave)

   }, [ref])

   return coordinates
}

export function useMousePosition(ref: RefObject<HTMLElement  | null>): Coordinates | null {
   const [coordinates, setCoordinates] = useState<Coordinates | null>(null)

   useEffect(() => {
      const element = ref.current

      if (!element) return

      const handleMouseMove = (e: MouseEvent) => {
         const x = Math.round(e.clientX)
         const y = Math.round(e.clientY)
         setCoordinates({ x, y })
         document.documentElement.style.setProperty('--x', x.toString())
         document.documentElement.style.setProperty('--y', y.toString())
      }

      const handleMouseLeave = () => {
         setCoordinates(null)
         document.documentElement.style.setProperty('--x', '0')
         document.documentElement.style.setProperty('--y', '0')
      }
      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseleave', handleMouseLeave)

   }, [ref])

   return coordinates
}