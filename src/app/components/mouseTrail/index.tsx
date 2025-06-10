'useClient'
import { useEffect, useRef } from 'react'
import styles from './index.module.css'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

interface TrailProps {
   coordinate: { x: number, y: number } | null
}

export default function MouseTrail({ coordinate }: TrailProps) {
   const dot = useRef<HTMLDivElement>(null)

   const follower = useRef({ x: 0, y: 0 })
   const previous = useRef({ x: 0, y: 0 })
   const skew = useRef(0)
   const scale = useRef(1)

   const coord = useRef(coordinate)

   useEffect(() => {
      coord.current = coordinate
   }, [coordinate])

   const isHover = useRef(false)

   useEffect(() => {
      const target = document.querySelector<HTMLElement>('[data-trail-target="true"]')


      const onMouseEnter = () => { isHover.current = true }
      const onMouseLeave = () => { isHover.current = false }



     
         target?.addEventListener('mouseenter', onMouseEnter)
         target?.addEventListener('mouseleave', onMouseLeave)

   }, [])

   useGSAP(() => {

      const animationCallback = () => {
         if (!dot.current || !coord.current) return
         const target = coord.current

         follower.current.x += (target.x - follower.current.x) * 0.1
         follower.current.y += (target.y - follower.current.y) * 0.1

         const deltaX = follower.current.x - previous.current.x
         const deltaY = follower.current.y - previous.current.y

         previous.current.x = follower.current.x
         previous.current.y = follower.current.y

         const velocity = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), 20)

         const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI

         const targetSkew = velocity * 0.5
         skew.current += (targetSkew - skew.current) * 0.2

         const targetScale = isHover.current ? 1 : 0.3
         scale.current += (targetScale - scale.current) * 0.7

         const baseScale = scale.current

         if (isHover.current) {
            gsap.set(dot.current, {
               x: follower.current.x,
               y: follower.current.y,
               scaleX: Math.max(0.3, baseScale + skew.current / 12),
               scaleY: baseScale,
               rotate: angle,
               backgroundColor: 'transparent',
               border: 'solid 1px rgba(255, 255, 255, 0.241)',
               boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.241)'
            })
         } else {
            gsap.set(dot.current, {
               backgroundColor: 'white',
               x: follower.current.x,
               y: follower.current.y,
               scaleX: Math.max(0.3, skew.current / 12),
               scaleY: baseScale,
               rotate: angle,
            })
         }
      }

      gsap.ticker.add(animationCallback)

   }, [])

   useGSAP(() => {
      gsap.to(dot.current, {
         opacity: coordinate ? 1 : 0,
         duration: 0.3,
         scale: 0
      })
   }, [coordinate])

   return(
      <div ref={dot} className={styles.dot}></div>
   ) 
}