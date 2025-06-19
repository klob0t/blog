'use client'
import React, { useEffect, useRef } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import styles from './index.module.css'
import AdvancedCarousel from './Embla'
import './Embla/embla.css'
import { EmblaOptionsType } from 'embla-carousel'
import { gsap } from 'gsap'
import { usePopupStore } from '@/app/lib/store/popupStore'

const OPTIONS: EmblaOptionsType = {
    loop: true,
    slidesToScroll: 'auto',
    containScroll: 'trimSnaps'
}

export default function CarouselPopup() {
    const { isOpen, images, closePopup } = usePopupStore()
    const containerRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (isOpen) {

            gsap.set(containerRef.current, { opacity: 0 });

            gsap.to(containerRef.current, { opacity: 1, duration: 0.3 });
            gsap.fromTo(popupRef.current,
                { scale: 0.5, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
            );
        }
    }, [isOpen]);


    const handleClose = () => {

        gsap.to(popupRef.current, {
            scale: 0.95,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in'
        });


        gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.3,
            delay: 0.1,
            onComplete: () => closePopup()
        });
    };


    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className={styles.overlay}
            ref={containerRef}
            onClick={handleClose}
            style={{ opacity: 0, display: 'flex' }}
        >
            <div className={styles.popup} ref={popupRef} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={handleClose}>
                    <IoCloseOutline />
                </button>
                <AdvancedCarousel images={images} options={OPTIONS} />
            </div>
        </div>
    )
}