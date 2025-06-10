import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import { RefObject } from "react"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(SplitText)

export const useSplitTextAnimation = (ref: RefObject<HTMLElement | null>) => {
   useGSAP(() => {
      const element = ref.current
      if (!element) return
      const originalText = element.textContent
      element.innerHTML = ''

      if (!originalText) {
         return;
      }

      const sizerText = document.createElement('span');
      sizerText.textContent = originalText;
      gsap.set(sizerText, { visibility: 'hidden', position: 'relative' })

      const topText = document.createElement('span')
      topText.textContent = originalText

      const bottomText = document.createElement('span')
      bottomText.textContent = originalText

      element.appendChild(sizerText)
      element.appendChild(topText)
      element.appendChild(bottomText)

      const topSplit = new SplitText(topText, { type: 'chars' })
      const bottomSplit = new SplitText(bottomText, { type: 'chars' })

      gsap.set([topText, bottomText], { position: 'absolute', top: 0, left: 0 });

      gsap.set(bottomSplit.chars, { y: '100%' })

      const tl = gsap.timeline({ paused: true })

      tl.to(topSplit.chars, {
         y: '-100%',
         stagger: {
            amount: originalText.length * 0.006,
            ease: 'linear'
         },
         duration: 0.5,
         ease: 'power2.inOut'
      }).to(bottomSplit.chars, {
         y: '0%',
         stagger: {
            amount: originalText.length * 0.006,
            ease: 'linear'
         },
         duration: 0.5,
         ease: 'power2.inOut'
      }, '<')

      const onMouseEnter = () => tl.play()
      const onMouseLeave = () => tl.reverse()

      element.addEventListener('mouseenter', onMouseEnter)
      element.addEventListener('mouseleave', onMouseLeave)

      return () => {
         element.removeEventListener('mouseenter', onMouseEnter)
         element.removeEventListener('mouseleave', onMouseLeave)

         if (topSplit) topSplit.revert()
         if (bottomSplit) bottomSplit.revert()
         tl.kill()
         element.innerHTML = originalText
      }
   }, { scope: ref })
}