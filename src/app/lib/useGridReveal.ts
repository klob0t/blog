
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { RefObject } from 'react'

export const useGridReveal = (scope: RefObject<HTMLDivElement | null>) => {
   useGSAP(() => {
      if (!scope.current) return

      const gridItems = gsap.utils.toArray('.grid-item', scope.current)

      gsap.set(gridItems, { 
         opacity:0, 
         scale: 1, 
         translateY: 20,
         filter: 'blur(1em)'
          })

      gsap.to(gridItems, {
         opacity: 1,
         scale:1,
         filter: 'blur(0em)',
         duration: 1,
         translateY: 0,
         ease: 'power4.out',
         stagger: 0.1,
         delay: 1,
         onComplete: () => {
            gsap.set(gridItems, {
               transform: 'unset',
               zIndex: 2,
            })
         }
      })
   }, { scope })
}