
'use client'
import styles from "./index.module.css";
import { TextScramble, TextScrambleHover } from "@/app/components/TextScramble";
import Link from 'next/link'
import Logo from "@/app/components/logo"
import { TrackedImage } from '@/app/lib/TrackedImage'
import { useMousePositionToVar } from "@/app/lib/useMousePosition";
import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import {BackgroundPixel} from "@/app/components/Background";
import { useSplitTextAnimation } from "@/app/lib/useSplitTextAnimation";
import BlogPostsList from "@/app/components/PostsList"
import { useGridReveal } from '@/app/lib/useGridReveal'
import ImageSlideshow from "../ImageSlideshow";
// import GridItem from '@/app/components/GridItem'

library.add(faInstagram, faTwitter, faLinkedin, faGithub)

const socials = [
  { href: 'https://instagram.com/airlanggga', icon: 'instagram' as const },
  { href: 'https://github.com/klob0t', icon: 'github' as const },
  { href: 'https://x.com/klob0t', icon: 'twitter' as const },
  { href: 'https://linkedin/in/airlanggakb', icon: 'linkedin' as const }
]

export default function MainPage() {
  const mainRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const linkRef1 = useRef<HTMLHeadingElement>(null)
  const linkRef2 = useRef<HTMLParagraphElement>(null)
  const linkRef3 = useRef<HTMLHeadingElement>(null)
  const linkRef4 = useRef<HTMLHeadingElement>(null)
  useMousePositionToVar(mainRef)
  useGridReveal(mainRef)
  useSplitTextAnimation(linkRef1)
  useSplitTextAnimation(linkRef2)
  useSplitTextAnimation(linkRef3)
  useSplitTextAnimation(linkRef4)

  return (
    <div className={styles.page} ref={pageRef}>
      <BackgroundPixel/>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.main} ref={mainRef} >
        <div className={`${styles.title} grid-item`}>
          <div className={styles.content}>
            <TextScramble />
            <div>
              <Link href='https://chloethinks.vercel.app' target='_blank' >
                <p ref={linkRef1}>Chloe</p></Link> &nbsp;&nbsp;&nbsp;&nbsp;
              <Link href='https://unangifier.vercel.app' target='_blank'>
                <p ref={linkRef2}>Unangifier</p></Link>
            </div></div>
        </div>
        <div className={`${styles.greeting} grid-item`}>
          <div className={styles.content}>
            <div><span><TextScrambleHover /> *</span>  <div><span>based in Jakarta, ID</span> <br /> <span>Portfolio © 2025</span></div></div></div>
        </div>
        <div className={`${styles.photo} grid-item`}>
          <div className={styles.content}>
          <TrackedImage
            src='/images/profPict.jpg'
            alt='profile picture'
            fill
            quality={75}
          /></div>
        </div>
        <div className={`${styles.works} grid-item`}>
          <div className={styles.content}>
            <ImageSlideshow />
          </div>
        </div>
        <div className={`${styles.cv} grid-item`}>
          <div className={styles.content}>
            <h3 ref={linkRef3}>Curriculum Vitae</h3>
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
          {socials.map(link => (
            <Link key={link.href} href={link.href} aria-label={`Follow me on ${link.icon}`} target='_blank' >
              <FontAwesomeIcon icon={['fab', link.icon] as IconProp} />
            </Link>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}



// 'use client'
// import styles from "./index.module.css";
// import { TextScramble, TextScrambleHover } from "@/app/components/TextScramble";
// import Link from 'next/link'
// import Logo from "@/app/components/logo"
// import { TrackedImage } from '@/app/lib/TrackedImage'
// import { useMousePosition } from "@/app/lib/useMousePosition";
// import { useRef } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import type { IconProp } from "@fortawesome/fontawesome-svg-core";
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faInstagram, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
// import BackgroundPixel from "@/app/components/Background";
// import { useSplitTextAnimation } from "@/app/lib/useSplitTextAnimation";
// import BlogPostsList from "@/app/components/PostsList"
// import { useGridReveal } from '@/app/lib/useGridReveal'
// import GridItem from '@/app/components/GridItem'

// library.add(faInstagram, faTwitter, faLinkedin, faGithub)

// const socials = [
//   { href: 'https://instagram.com/airlanggga', icon: 'instagram' as const },
//   { href: 'https://github.com/klob0t', icon: 'github' as const },
//   { href: 'https://x.com/klob0t', icon: 'twitter' as const },
//   { href: 'https://linkedin/in/airlanggakb', icon: 'linkedin' as const }
// ]

// export default function MainPage() {
//   const mainRef = useRef<HTMLDivElement>(null)
//   const pageRef = useRef<HTMLDivElement>(null)
//   const linkRef1 = useRef<HTMLHeadingElement>(null)
//   const linkRef2 = useRef<HTMLParagraphElement>(null)
//   const linkRef3 = useRef<HTMLHeadingElement>(null)
//   const linkRef4 = useRef<HTMLHeadingElement>(null)
//   const coordinate = useMousePosition(pageRef)
//   useGridReveal(mainRef)
//   useSplitTextAnimation(linkRef1)
//   useSplitTextAnimation(linkRef2)
//   useSplitTextAnimation(linkRef3)
//   useSplitTextAnimation(linkRef4)

//   return (
//     <div className={styles.page} ref={pageRef}>
//       <BackgroundPixel mousePosition={coordinate} />
//       <div className={styles.logo}>
//         <Logo />
//       </div>
//       <div className={styles.main} ref={mainRef} >
//         {/* Title */}
//         <GridItem className={`${styles.title} grid-item`}>
//           <div className={styles.cardOutline} />
//           <div className={styles.cardContent}>
//             <TextScramble />
//             <div>
//               <Link href='https://chloethinks.vercel.app' target='_blank'>
//                 <p ref={linkRef1}>Chloe</p>
//               </Link>
//               &nbsp;&nbsp;&nbsp;&nbsp;
//               <Link href='https://unangifier.vercel.app' target='_blank'>
//                 <p ref={linkRef2}>Unangifier</p>
//               </Link>
//             </div>
//           </div>
//         </GridItem>

//         {/* Greeting */}
//         <GridItem className={`${styles.greeting} grid-item`}>
//           <div className={styles.cardOutline} />
//           <div className={styles.cardContent}>
//             <div>
//               <span><TextScrambleHover /> *</span>
//               <div>
//                 <span>based in Jakarta, ID</span><br/>
//                 <span>Portfolio © 2025</span>
//               </div>
//             </div>
//           </div>
//         </GridItem>

//         {/* Photo */}
//         <GridItem className={`${styles.photo} grid-item`}>
//           <div className={styles.cardOutline} />
//           <div className={styles.cardContent}>
//             <TrackedImage
//               src='/images/ProfilePict.jpg'
//               alt='profile picture'
//               fill
//               quality={100}
//             />
//           </div>
//         </GridItem>

//         {/* Description */}
//         <GridItem className={`${styles.description} grid-item`}>
//           <div className={styles.cardOutline} />
//           <div className={styles.cardContent}>
//             desc
//           </div>
//         </GridItem>

//         {/* CV */}
//         <GridItem className={`${styles.cv} grid-item`}>
//           <div className={styles.cardOutline} />
//           <div className={styles.cardContent}>
//             <h3 ref={linkRef3}>Curriculum Vitae</h3>
//           </div>
//         </GridItem>

//         {/* Blog Posts */}
//         <GridItem className={`${styles.blogs} grid-item`}>
//           <div className={styles.cardOutline} />
//           <div className={styles.cardContent}>
//             <h3>Blog Posts</h3>
//             <BlogPostsList />
//           </div>
//         </GridItem>

//         {/* Contact */}
//         <GridItem className={`${styles.contact} grid-item`}>
//           <div className={styles.cardOutline} />
//           <div className={styles.cardContent}>
//             <div>
//               <Link href='mailto:klob0t@yahoo.com'>
//                 <h3 ref={linkRef4}>Get in touch ↗</h3>
//               </Link>
//             </div>
//             <div>
//               <p>Got a clear vision or still figuring it out? I’d love to help.</p>
//             </div>
//           </div>
//         </GridItem>

//         {/* Social Links */}
//         <GridItem className={`${styles.links} grid-item`}>
//           <div className={styles.cardOutline} />
//           <div className={styles.cardContent}>
//             {socials.map(link => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 aria-label={`Follow me on ${link.icon}`}
//                 target='_blank'
//               >
//                 <FontAwesomeIcon icon={['fab', link.icon] as IconProp} />
//               </Link>
//             ))}
//           </div>
//         </GridItem>
//       </div>
//     </div>
//   )
// }

