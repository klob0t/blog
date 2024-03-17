'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Scrambled from '../../utils/textScramble'
import Cursor from '../../utils/mouseTrail'
import Tilt from '../../utils/tilt'
import Link from 'next/link'
import {useState, useEffect} from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Carousel from '../modal/page'
import Loader from '../loader'
// import { Suspense } from 'react'


export default function Home() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.addEventListener('load', () => {
      setIsLoading(false)
    })
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [])

  const router = useRouter()

  useEffect(() => {
    if (id) {
      setShowModal(true);
    }
  }, [id]);

  const onClose = () => {
    setShowModal(false);
  }

  return (
    <>
    {isLoading ? 
    <Loader /> 
  : <main>
     <div className={styles.contentWrapper}>
     <div className={styles.noise}></div>
     <div className={styles.gradient}>
      <div id={styles.gradient1}></div>
      <div id={styles.gradient2}></div>
      <div id={styles.gradient3}></div>
    </div>
    <div className={styles.bento} id='bento'>
      <div className={styles.engineeringCard} data-type='look'>
        <h1>Engineering<span className={styles.ornament}>&#8859;</span></h1>
      <Link href='/?id=art'> <Image 
          src='/images/engineerings.png'
          sizes='100%'
          fill
          style={{objectFit:'cover'}}
          alt='engineering works'
        /></Link>
      </div>
      <div className={styles.productDesignCard} data-type='look'>
       <h1>Product Design<span className={styles.ornament}>&#8859;</span></h1>
        <Link href='?id=product-design'><Image 
          src='/images/products.png'
          sizes='100%'
          fill
          style={{objectFit:'cover'}}
          alt='product design works'
        /></Link>
      </div>
      <div className={styles.profileCard} data-type='star'>
        <h1>Hello, <br />i'm <Scrambled /><span className={styles.ornament}>&#8859;</span></h1>
        <p>hi, i'm a guy who are deeeeeeply<br />interested in design, engineering,<br /> aaand sometimes enjoy and do "art".<br />welcome to my page!</p>
       <Image 
          src='/images/4x5.png'
          sizes='20em'
          fill
          style={{objectFit:'none'}}
          alt='me'
        />
      </div>
      <div className={styles.mbtiCard} data-type='read'>
        <h1>Logician</h1>
        <h2>INTP-T</h2>
        <Image
          fill
          src='/images/logician.svg'
          style={{objectFit:'contain'}}
          alt='Sir Isaac Newton'
         />
        <p>"Imaginative and curious, people with the INTP personality type can find endless fascination in the workings of their own mind."</p>
        <Link href='https://www.16personalities.com/intp-personality'><i><br/>16personalities.com</i></Link>
      </div>
      <div className={styles.curriculumVitaeCard} data-type='look'>
        <h1>Curriculum<br/>Vitae<span className={styles.ornament}>&#8859;</span></h1>
      </div>
      <div className={styles.codingJourneyCard} data-type='read'>
        <h1>&gt;coding journey<span className={styles.blink}>_</span></h1>
      </div>
      <div className={styles.artCard} data-type='look'>
        <Image 
          src='/neko.png'
          sizes='90%'
          fill
          style={{objectFit:'cover'}}
          alt='art works'
        />
      </div>
      <div className={styles.instagram} id='footer'>
        <Link href='https://instagram.com/airlanggga' target='blank'><i className='fa-brands fa-instagram fa-2x' style={{color: '#303030'}} /></Link>
      </div>
      <div className={styles.linkedin} id='footer'>
        <Link href='https://linkedin.com/in/airlanggakb' target='blank'><i className='fa-brands fa-linkedin-in fa-2x'style={{color: '#303030'}}  /></Link>
      </div>
      <div className={styles.youtube} id='footer'>
        <Link href='https://youtube.com/@klob0t' target='blank'><i className='fa-brands fa-youtube fa-2x' style={{color: '#303030'}} /></Link>
      </div>
      <div className={styles.twitter} id='footer'>
        <Link href='mailto:klob0t@yahoo.com' target='blank' ><i className='fa-regular fa-envelope fa-2x' style={{color: '#303030'}} /></Link>
      </div>
      <div className={styles.footer} id='footer'>
        <Image 
          src='/images/logo-fav.svg'
          width={50}
          height={50}
          alt='klob0t'
        />
      </div>
    </div>
    <Cursor />
    <Tilt />
    </div>
    </main>}
    {showModal && <Carousel params={{ id }} onClose={onClose} />}
   </>
  );
}
