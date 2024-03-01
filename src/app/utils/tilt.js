import {useRef, useEffect} from 'react'

const Tilt = () =>{
   const perspective = 800
   const scale = 1.01
   const timing = 80
   const easing = 'ease-out'
   const deg = 2
   let box = useRef(0)

   useEffect(() => {
      const cards = document.querySelectorAll('#bento > div')
      cards.forEach(card => {
         card.addEventListener('mouseenter', cardEnter)
         card.addEventListener('mouseleave', cardLeave)
         card.addEventListener('mousemove', cardMove)
      })
   
     return () => {
       cards.forEach(card => {
         card.removeEventListener('mouseenter', cardEnter)
         card.removeEventListener('mousemove', cardMove)
         card.removeEventListener('mouseleave', cardLeave)
      })
     }
   }, [])
   
   function cardMove (e) {
      box.current = e.target.closest('#bento > div')
      const rect = box.current.getBoundingClientRect()
      const midX = box.current.offsetWidth / 2
      const midY = box.current.offsetHeight / 2
      
      const curX = e.clientX - rect.left
      const curY = e.clientY - rect.top
      const rotX = ((curX - midX) / midX) * `${deg}`
      const rotY = -1 * ((curY - midY) / midY) * `${deg}`

      box.current.style.transform = `perspective(${perspective}px) rotateX(${rotY}deg) rotateY(${rotX}deg) scale3d(${scale}, ${scale}, ${scale})`
   }

   function cardEnter (e){
      setTransition(e)
   }

   function setTransition(e){
      box.current = e.target.closest('#bento > div')
      clearTimeout(box.current.transitionTimeoutId)
      box.current.style.transition = `transform ${timing}ms ${easing}`

      box.current.transitionTimeoutId = setTimeout(() => {
         box.current.style.transition = ''
      }, `${timing}`)
   }
   function cardLeave(e){
      box.current = e.target.closest('#bento > div')
      box.current.style.transform = `perspective(500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
      setTransition(e)
   }

}
export default Tilt