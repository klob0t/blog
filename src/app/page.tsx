'use client'
import styles from "./page.module.css";
import { TextScramble, TextScrambleHover } from "@/app/components/textScramble/scramble";
import Link from 'next/link'
import Logo from "@/app/components/logo";
import Image from 'next/image'
import { useMousePositionToVar, useMousePosition } from "@/app/lib/useMousePosition";
import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import BackgroundPixel from "@/app/components/backgroundPixels/page";
import { useSplitTextAnimation } from "./lib/useSplitTextAnimation";

library.add(faInstagram, faTwitter, faLinkedin, faGithub)

const socials = [
  { href: 'https://instagram.com/airlanggga', icon: 'instagram' as const },
  { href: 'https://github.com/klob0t', icon: 'github' as const },
  { href: 'https://x.com/klob0t', icon: 'twitter' as const },
  { href: 'https://linkedin/in/airlanggakb', icon: 'linkedin' as const }
]

export default function Home() {
  const ref = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLHeadingElement>(null)
  const linkRef1 = useRef<HTMLParagraphElement>(null)
  const linkRef2 = useRef<HTMLParagraphElement>(null)
  useMousePositionToVar(ref)
  const coordinate = useMousePosition(pageRef)
  useSplitTextAnimation(linkRef)
  useSplitTextAnimation(linkRef1)
  useSplitTextAnimation(linkRef2)

  return (
    <div className={styles.page} ref={pageRef}>
      <BackgroundPixel mousePosition={coordinate} />
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.main} ref={ref} data-trail-target='true'>
        <div className={styles.title}><TextScramble />
          <div>
            <Link href='https://chloethinks.vercel.app'>
              <p ref={linkRef1}>Chloe/Your digital bestfriend.</p></Link>
          </div>
        </div>
        <div className={styles.greeting}>
          <div><span><TextScrambleHover/> *</span>  <div><span>based in Jakarta, ID</span> <br /> <span>Portfolio © 2025</span></div></div>
        </div>
        <div className={styles.photo}>
          <Image
            src='/images/ProfilePict.jpg'
            alt='profile picture'
            fill
          />
        </div>
        <div className={styles.description}>desc</div>
        <div className={styles.cv}><p ref={linkRef2}>Curriculum Vitae</p></div>
        <div className={styles.blogs}>blogs</div>
        <div className={styles.contact}>
          <div><p>Got a clear vision or still figuring it out? I’d love to help.</p></div>
          <div>
            <Link href='mailto:klob0t@yahoo.com'>
              <h3 ref={linkRef}>Get in touch ↗</h3></Link>
          </div>
        </div>
        <div data-link-target='true' className={styles.links}>
          {socials.map(link => (
            <Link key={link.href} href={link.href} aria-label={`Follow me on ${link.icon}`} target='_blank'>
              <FontAwesomeIcon icon={['fab', link.icon] as IconProp} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
