'use client'
import { useState, useEffect, RefObject } from 'react'

// const ease = (t: number): number => 1 - Math.pow(1 - t, 3)

export function useMousePositionToVar(ref: RefObject<HTMLElement | null>) {

   const [childRects, setChildRects] = useState<DOMRect[]>([])

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
               const spreadVal = 100
               const centerX = rect.left + rect.width / 2
               const centerY = rect.top + rect.height / 2
               const perimeter = 2 * (rect.width + rect.width)

               const rawAngle = ((Math.atan2(mouseY - centerY, mouseX - centerX) * 180 / Math.PI))

               const spread = perimeter > 0 ? (spreadVal / perimeter) * 360 : 25

               const angle = (rawAngle + 90) - (spread / 2)

               element.style.setProperty('--start', angle.toString())

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

      element.addEventListener('mousemove', handleMouseMove)

      return () => {
         element.removeEventListener('mousemove', handleMouseMove)
      }
   }, [ref, childRects])

   return
}

// export function useMousePosition(ref: RefObject<HTMLElement | null>): Coordinates | null {
//    const [coordinates, setCoordinates] = useState<Coordinates | null>(null)


//    useEffect(() => {
//       const element = ref.current
//       if (!element) return


//       const handleMouseMove = (e: MouseEvent) => {
//          const x = Math.round(e.clientX)
//          const y = Math.round(e.clientY)
//          setCoordinates({ x, y })
//          document.documentElement.style.setProperty('--x', x.toString())
//          document.documentElement.style.setProperty('--y', y.toString())
//       }

//       const handleMouseLeave = () => {
//          setCoordinates(null)
//          document.documentElement.style.setProperty('--x', '0')
//          document.documentElement.style.setProperty('--y', '0')
//       }
//       element.addEventListener('mousemove', handleMouseMove)
//       element.addEventListener('mouseleave', handleMouseLeave)

//    }, [ref])

//    return coordinates
// }