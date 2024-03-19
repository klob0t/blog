'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import { dynamicBlurDataUrl } from '@/app/utils/dynamicBlurDataUrl';

export default function Carousel({params, onClose}) {
  const id = params.id
  const [images, setImages] = useState([])
  const [curIndex, setcurIndex] = useState(0)
  const [imagesSet, setImagesSet] = useState([])

  useEffect(() => {
    fetch(`/api/getImagePaths/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');}return response.json();})
      .then(data => {setImages(data);})
      .catch(error => {});
  }, []);

  useEffect(() => {
  const modifyData = async () => {
    const dataWithBlurHash = await getResources(images)
    setImagesSet(dataWithBlurHash)
  }
  modifyData()
},[images])

const getResources = async (images) => {
  const resources = await Promise.all(
    images.map(async (imgs) => ({ // use images instead of data
      imgs: imgs,
      imgBlur: await dynamicBlurDataUrl(imgs)
    }))
  )
  return resources
}

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
      <div className={styles.imgWrapper}>
        {imagesSet[curIndex] ? (<Image
          style={{objectFit:'cover'}}
          fill
          margin= 'auto'
          key={curIndex}
          src={imagesSet[curIndex].imgs}
          alt={curIndex}
          sizes='100%'
          placeholder='blur'
          blurDataURL={imagesSet[curIndex].imgBlur}
        />) : null }
        <div className={styles.buttons}>
          <div className={styles.prevBtn} onClick={prevImage}>
            <i className='fa-solid fa-chevron-left fa-2x' style={{color: 'grey', transform: 'scale(0.7)'}}></i>
          </div>
          <div className={styles.nextBtn} onClick={nextImage}>
            <i className='fa-solid fa-chevron-right fa-2x' style={{color: 'grey', transform: 'scale(0.7)'}}></i>
            </div>
          </div>
        </div>
      <Link href='/'>
        <div className={styles.linkWrapper} onClick={closeModal} style={{cursor: 'pointer'}}></div>
      </Link>
    </div>
  )
}
