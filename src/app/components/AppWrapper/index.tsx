'use client'
import { useLoading } from '@/app/lib/LoadingContext'
import Loading from '@/app/components/LoadingPage'
import { ReactNode, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useRouter } from 'next/navigation'

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


export default function AppWrapper({ children }: { children: ReactNode }) {
  const { isAppLoading } = useLoading()
  const loaderRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const prevIsAppLoading = usePrevious(isAppLoading);
  const router = useRouter();

  
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
        borderRadius: '0%',
        onComplete: () => {
          router.push(href)
        }
      })
      gsap.to(content, {
        filter: 'blur(1em)',
        delay: 0.3,
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

    
    
    if (prevIsAppLoading === true && !isAppLoading) {
      gsap.to(loader, {
        y: '-110%',
        duration: 0.8,
        borderBottomLeftRadius: '100%',
        borderBottomRightRadius: '100%',
        ease: 'power3.inOut',
        delay: 0.2,
        onComplete: () => {
          gsap.set(loader, {
            display: 'none',
          })
        }
      })
      gsap.to(content, {
        filter: 'blur(0em)',
        delay: 0.3,
        ease: 'power3.inOut',
      })
    }
    
    else if (prevIsAppLoading === undefined && isAppLoading) {
        gsap.set(content, { filter: 'blur(1em)' });
    }

  
  }, { dependencies: [isAppLoading] })

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
        }}
      >
        <Loading />
      </div>

      <div
        ref={contentRef}
        
        style={{
          opacity: 1,
        }}
      >
        {children}
      </div>
    </>
  )
}