"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { dynamicBlurDataUrl } from "../../utils/dynamicBlurDataUrl";

export default function Carousel({ params, onClose }) {
  const id = params.id;
  const [images, setImages] = useState([]);
  const [curIndex, setCurIndex] = useState(0);
  const [imagesSet, setImagesSet] = useState([]);

  useEffect(() => {
    fetch(`/api/getImagePaths/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setImages(data);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const modifyData = async () => {
      const dataWithBlurHash = await getResources(images);
      setImagesSet(dataWithBlurHash);
    };
    modifyData();
  }, [images]);

  const getResources = async (images) => {
    const resources = await Promise.all(
      images.map(async (imgs, index) => ({
        imgs: imgs,
        index: index,
        imgBlur: await dynamicBlurDataUrl(imgs),
      }))
    );
    return resources;
  };

  const nextImage = () => {
    setCurIndex((curIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurIndex((curIndex - 1 + images.length) % images.length);
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imgWrapper}>
          {imagesSet.map((image) => (
            <div
              className={styles.imgs}
              key={image.index}
              style={{
                width: "100%",
                transition: "transform 0.5s cubic-bezier(1,0,.42,1)",
                flex: "0 0 auto",
                transform: `translateX(-${curIndex * 100}%)`,
              }}
            >
              <Image
                style={{
                  objectFit: "cover",
                }}
                fill
                sizes="100%"
                src={image.imgs}
                alt={image.index}
                placeholder="blur"
                blurDataURL={image.imgBlur}
                loading="lazy"
              />
            </div>
          ))}
          <div className={styles.buttons}>
            <div className={styles.prevBtn} onClick={prevImage}>
              <i
                className="fa-solid fa-chevron-left fa-2x"
                style={{ color: "grey", transform: "scale(0.7)" }}
              ></i>
            </div>
            <div className={styles.nextBtn} onClick={nextImage}>
              <i
                className="fa-solid fa-chevron-right fa-2x"
                style={{ color: "grey", transform: "scale(0.7)" }}
              ></i>
            </div>
          </div>
        </div>
        <Link href="/">
          <div
            className={styles.linkWrapper}
            onClick={closeModal}
            style={{ cursor: "pointer" }}
          ></div>
        </Link>
      </div>
    </>
  );
}
