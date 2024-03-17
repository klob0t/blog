'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import { dynamicBlurDataUrl } from '@/app/utils/dynamicBlurDataUrl';

export default function Carousel({params, onClose}) {
  const id = params.id
  const [images, setImages] = useState([])
  const [blurDataUrl, setBlurDataUrl] = useState([])
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

  // useEffect(() => {
  //   const modifyData = async () => {
  //     const dataWithBlurHash = await getResources(data)
  //     setImagesSet(dataWithBlurHash)
  //   }
  //   modifyData()
  // }, [data])

  // const getResources = async (data) => {
  //   const resources = await Promise.all(
  //     data.map(async (photo) => ({
  //       imgUrl: photo.images,
  //       blurHash: await dynamicBlurDataUrl(photo.imgUrl)
  //     }))
  //   )
  //   return resources
  // }


  const nextImage = () => {
    setcurIndex((curIndex + 1) % images.length);
  };

  const prevImage = () => {
    setcurIndex((curIndex - 1 + images.length) % images.length);
  };

  const closeModal =() => {
    onClose();
  }

  // dynamicBlurDataUrl(images[(curIndex + 1) % images.length]).then(blur =>{
  //   setBlurDataUrl(blur)
  // })

  // const p = `data:image/svg+xml;base64,${blurDataUrl}`
  // console.log(p)



  return (
    <div className={styles.container}>
      <div className={styles.imgWrapper}>
        <Image
          style={{objectFit:'cover'}}
          fill
          margin= 'auto'
          key={curIndex}
          src={images[curIndex]}
          alt={curIndex}
          sizes='100%'
          // placeholder='blur'
          // blurDataURL={p}
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


     <Link href='/'>
      <div className={styles.linkWrapper} onClick={closeModal} style={{cursor: 'pointer'}}></div></Link>
    
    </div>
  )
}
