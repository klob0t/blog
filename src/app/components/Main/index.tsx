'use client'
import styles from "./index.module.css";
import { TextScramble, TextScrambleHover } from "@/app/components/TextScramble";
import Link from 'next/link'
import { Logo } from "@/app/components/logo"
import { usePopupStore } from "@/app/lib/store/popupStore";
import { useMousePositionToVar } from "@/app/lib/useMousePosition";
import { useRef, useEffect, useState } from 'react'
import { BackgroundPixel } from "@/app/components/Background";
import { useSplitTextAnimation } from "@/app/lib/useSplitTextAnimation";
import BlogPostsList from "@/app/components/PostsList"
import { useGridReveal } from '@/app/lib/useGridReveal'
import ImageSlideshow from "@/app/components/ImageSlideshow"
import PhotoCard from "@/app/components/PhotoCard"
import { useLoadingStore } from "@/app/lib/store/loadingStore"
import SocialLinks from "@/app/components/SocialLinks"


interface ImageData {
  src: string
  alt: string
}

export default function MainPage() {
  const openPopup = usePopupStore((state) => state.openPopup)
  const mainRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const linkRef1 = useRef<HTMLHeadingElement>(null)
  const linkRef2 = useRef<HTMLParagraphElement>(null)
  const linkRef5 = useRef<HTMLParagraphElement>(null)
  const linkRef3 = useRef<HTMLHeadingElement>(null)
  const linkRef4 = useRef<HTMLHeadingElement>(null)
  const { startLoading, finishLoading } = useLoadingStore()
  const [images, setImages] = useState<ImageData[]>([])
  useMousePositionToVar(mainRef)
  useGridReveal(mainRef)
  useSplitTextAnimation(linkRef1)
  useSplitTextAnimation(linkRef2)
  useSplitTextAnimation(linkRef3)
  useSplitTextAnimation(linkRef4)
  useSplitTextAnimation(linkRef5)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        startLoading('Images Lists')
        const response = await fetch('/api/images/marquee')
        if (!response.ok) {
          throw new Error(`Failed to fetch images: ${response.statusText}`)
        }

        const fetchedImagePaths: string[] = await response.json()
        const formattedImages: ImageData[] = fetchedImagePaths.map((path, index) => ({
          src: path,
          alt: `Work image ${index + 1}`
        }))

        if (formattedImages.length > 0) {
          setImages(formattedImages)
        }
      } catch (error) {
        console.error('Error fetching images: ', error)
        setImages([])
      } finally {
        finishLoading('Images Lists')
      }
    }
    fetchImages()
  }, [startLoading, finishLoading])

  return (
    <>
      <BackgroundPixel />
      <div className={styles.page} ref={pageRef}>


        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.main} ref={mainRef} >
          <div className={`${styles.title} grid-item`}>
            <div className={styles.content}>
              <TextScramble />
              <div>
                <Link href='https://chloethinks.vercel.app' target='_blank' >
                  <p ref={linkRef1}>Chloe</p></Link>
                <Link href='https://thoughtilets.vercel.app' target='_blank'>
                  <p ref={linkRef5}>thoughtilets</p></Link>
              </div></div>
          </div>
          <div className={`${styles.greeting} grid-item`}>
            <div className={styles.content}>
              <div><span><TextScrambleHover /></span>  <div><span>based in Jakarta, ID</span> <br /> <span>Portfolio © 2025</span></div></div></div>
          </div>
          <div className={`${styles.photo} grid-item`}>
            <div className={styles.content}>
              <PhotoCard /></div>
          </div>
          <div
            className={`${styles.works} grid-item`}
            onClick={() => openPopup(images)}>
            <div className={styles.content}>
              <ImageSlideshow images={images} />
            </div>
          </div>
          <div className={`${styles.cv} grid-item`}>
            <div className={styles.content}>
              <Link
                href='https://www.dropbox.com/scl/fi/vur035gsji14rotc6uvf7/Airlangga-Kusuma-Bangsa_CV.pdf?rlkey=2azag0dttatczqla2xhuzt4k8&dl=0'>
                <h3 ref={linkRef3}>Curriculum Vitae</h3>
              </Link>
            </div>
          </div>
          <div className={`${styles.blogs} grid-item`}>
            <div className={styles.content}> <h3>Blog Posts</h3>
              <BlogPostsList />
            </div>
          </div>
          <div className={`${styles.contact} grid-item`}>
            <div className={styles.content}>
              <div>
                <Link href='mailto:klob0t@yahoo.com'>
                  <h3 ref={linkRef4}>Get in touch ↗</h3>
                </Link>
              </div>
              <div>
                <p>Got a clear vision or still figuring it out? I’d love to help.</p>
              </div>
            </div>
          </div>
          <div className={`${styles.links} grid-item`}>
            <div className={styles.content}>
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

