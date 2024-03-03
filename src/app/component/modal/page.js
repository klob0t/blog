
'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default function Carousel({params, onClose}) {
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

  const closeModal =() => {
    onClose();
  }

  return (
    <div className={styles.container}>
    <div className={styles.linkWrapper} onClick={closeModal} style={{cursor: 'pointer'}}></div>
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

        <div className={styles.buttons}>
        <div className={styles.prevBtn} onClick={prevImage}>
          <i className='fa-solid fa-chevron-left fa-2x' style={{color: 'grey', transform: 'scale(0.7)'}}></i>
        </div>
        <div className={styles.nextBtn} onClick={nextImage}>
          <i className='fa-solid fa-chevron-right fa-2x' style={{color: 'grey', transform: 'scale(0.7)'}}></i>
        </div>
      </div>

      </div>
  
    </div>
  )
}
