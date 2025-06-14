'use client'
import { useState, useEffect, RefObject, useRef } from 'react'

export function useMousePositionToVar(ref: RefObject<HTMLElement | null>) {

   const [childRects, setChildRects] = useState<DOMRect[]>([])

   const curAngle = useRef(0)


   useEffect(() => {
      const element = ref.current
      if (!element) return

      const updateChildRects = () => {
         const rects = Array.from(element.children).map(child =>
            child.getBoundingClientRect()
         )
         setChildRects(rects)
      }

      updateChildRects()
      window.addEventListener('resize', updateChildRects)

      return () => {
         window.removeEventListener('resize', updateChildRects)
      }
   }, [ref])


   useEffect(() => {
      const element = ref.current
      if (!element || childRects.length === 0) return


      const handleMouseMove = (e: MouseEvent) => {
         const mouseX = e.clientX
         const mouseY = e.clientY


         let isInsideChild = false

         for (const rect of childRects) {
            if (
               mouseX >= rect.left &&
               mouseX <= rect.right &&
               mouseY >= rect.top &&
               mouseY <= rect.bottom
            ) {
               const spreadVal = 250
               const w_half = rect.width / 2
               const h_half = rect.height / 2
               const centerX = rect.left + w_half
               const centerY = rect.top + h_half

               const angleRad = Math.atan2(mouseY - centerY, mouseX - centerX)

               const rawAngle = angleRad * 180 / Math.PI

               const radiusToEdge = Math.min(
                  Math.abs(w_half / Math.cos(angleRad)),
                  Math.abs(h_half / Math.sin(angleRad))
               )

               const spread = (spreadVal / radiusToEdge) * (180/Math.PI)

               const targetAngle = (rawAngle + 90) - (spread / 2)

               curAngle.current += ((targetAngle - curAngle.current + 180) % 360 - 180) * 0.06

               element.style.setProperty('--start', curAngle.current.toString())

               element.style.setProperty('--spread', spread.toString())

               isInsideChild = true
               break
            }
         }

         if (!isInsideChild) {
            document.documentElement.style.setProperty('--mouse-x', '-1px')
            document.documentElement.style.setProperty('--mouse-y', '-1px')
         }
      }

      const handleMouseLeave = () => {
         element.style.setProperty('--start', '0')
      }

      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseleave', handleMouseLeave)

      return () => {
         element.removeEventListener('mousemove', handleMouseMove)
      }
   }, [ref, childRects])

   return
}
