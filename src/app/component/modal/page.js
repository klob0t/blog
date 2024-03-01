
'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default function Carousel({params}) {
  const id = params.id
  console.log(id)
  const [images, setImages] = useState([]);
  const [curIndex, setcurIndex] = useState(0);

  useEffect(() => {
    fetch(`/api/getImagePaths/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setImages(data);
      })
      .catch(error => {

      });
  }, []);

  const nextImage = () => {
    setcurIndex((curIndex + 1) % images.length);
  };

  const prevImage = () => {
    setcurIndex((curIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.container}>
   <Link href='/'> <div className={styles.linkWrapper} onClick={() => setShowModal(false)}></div></Link>
      <div className={styles.imgWrapper}>
        <img
          style={{objectFit:'cover', borderRadius:'20px'}}
          width='100%'
          height='100%'
          margin= 'auto'
          key={curIndex}
          src={images[curIndex]}
          alt={curIndex}
        />
      </div>
      <div className={styles.buttons}>
        <div onClick={prevImage}>
          <i className='fa-solid fa-chevron-left fa-2x' style={{ color: 'white', position:'fixed', left:'1.2em', top: '50%', cursor:'pointer'}}></i>
        </div>
        <div onClick={nextImage}>
          <i className='fa-solid fa-chevron-right fa-2x' style={{ color: 'white', position:'fixed', right:'1.2em', top: '50%', cursor:'pointer'}}></i>
        </div>
      </div>
    </div>
  )
}
