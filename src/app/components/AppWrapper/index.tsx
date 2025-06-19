'use client'
import { useLoadingStore } from '@/app/lib/store/loadingStore'
import Loading from '@/app/components/LoadingPage'
import { ReactNode, useRef, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useRouter } from 'next/navigation'
import CarouselPopup from '@/app/components/Popup'

export default function AppWrapper({ children }: { children: ReactNode }) {
  const activeLoadersCount = useLoadingStore(state => state.activeLoaders.size)
  const loaderRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { finishLoading } = useLoadingStore()

  const [isReadyForAnimation, setIsReadyForAnimation] = useState(false)

  useEffect(() => {
    finishLoading('Initial Page Load')
  }, [finishLoading])


  useEffect(() => {
    if (activeLoadersCount > 0) {
      setIsReadyForAnimation(false)
      return
    }

    const timeoutId = setTimeout(() => {
      if (useLoadingStore.getState().activeLoaders.size === 0) {
        setIsReadyForAnimation(true)
      }
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [activeLoadersCount])


  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement
      const anchor = targetElement.closest('a')
      if (!anchor || anchor.target === '_blank' || event.ctrlKey || event.metaKey || anchor.href === window.location.href) {
        return
      }

      const content = contentRef.current
      event.preventDefault()
      const href = anchor.href
      const loader = loaderRef.current
      if (!loader) return

      gsap.to(loader, {
        y: '0%',
        display: 'block',
        duration: 0.4,
        ease: 'power3.inOut',
        onComplete: () => {
          router.push(href)
        }
      })
      gsap.to(content, {
        filter: 'blur(1em)',
        delay: 0,
        ease: 'power3.inOut',
      })
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [router])

  useGSAP(() => {
    const loader = loaderRef.current
    const content = contentRef.current
    if (!loader || !content) return


    if (isReadyForAnimation) {
      gsap.to(loader, {
        y: '-110%',
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 1,
        onComplete: () => {
          gsap.set(loader, {
            display: 'none',
          })
        }
      })
      gsap.to(content, {
        filter: 'blur(0em)',
        delay: 1.1,
        ease: 'power3.inOut',
      })
    }
    else {
      gsap.set(content, { filter: 'blur(1em)' });
    }


  }, { dependencies: [isReadyForAnimation] })

  return (
    <>
      <div
        ref={loaderRef}
        style={{
          position: 'fixed',
          top: 0,
          left: '-50%',
          width: '200%',
          height: '100%',
          zIndex: 9999,
          overflow: 'hidden',
          display: 'block',
          transform: 'translateY(0%)'
        }}>
        <Loading />
      </div>
      <div
        ref={contentRef}
        style={{
          opacity: 1,
        }}>
        {children}
      </div>
      <CarouselPopup />
    </>
  )
}