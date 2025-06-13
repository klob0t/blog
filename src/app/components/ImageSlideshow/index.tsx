//src/app/components/ImageSlideshow/index.tsx
//TrackedImage is used to track image loading on global context manager
'use client'
import { TrackedImage } from "@/app/lib/TrackedImage"
import { useEffect, useState, memo, useRef } from 'react'
// import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useLoading } from "@/app/lib/LoadingContext"
import styles from './index.module.css'

function SlideShow() {
   const [images, setImages] = useState<string[]>([])
   const { startLoading, finishLoading } = useLoading()

   const marqueeContainerRef = useRef<HTMLDivElement>(null)
   const marqueeContentRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const fetchImages = async () => {
         try {
            startLoading()
            const response = await fetch('/api/images')
            if (!response.ok) {
               throw new Error(`Failed to fetch images: ${response.statusText}`)
            }
            const fetchedImages: string[] = await response.json()

            if (fetchedImages.length > 0) {
               setImages([...fetchedImages, ...fetchedImages])
            }
         } catch (error) {
            console.error('Error fetching images: ', error)
            setImages([])
         } finally {
            finishLoading()
         }
      }
      fetchImages()
   }, [startLoading, finishLoading])

   useEffect(() => {
        // Wait until the images are loaded and the refs are connected
        if (images.length === 0 || !marqueeContentRef.current) return;

        // Make the helper function available in this scope
        function horizontalLoop(items, config) {
            items = gsap.utils.toArray(items);
            config = config || {};
            let tl = gsap.timeline({
                repeat: config.repeat,
                paused: false,
                defaults: { ease: "none" },
                onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
            });
            let length = items.length,
                startX = items[0].offsetLeft,
                times = [],
                widths = [],
                xPercents = [],
                curIndex = 0,
                pixelsPerSecond = (config.speed || 1) * 100,
                snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
                totalWidth, curX, distanceToStart, distanceToLoop, item, i;
            gsap.set(items, {
                xPercent: (i, el) => {
                    let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
                    xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
                    return xPercents[i];
                }
            });
            gsap.set(items, { x: 0 });
            totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0);
            for (i = 0; i < length; i++) {
                item = items[i];
                curX = xPercents[i] / 100 * widths[i];
                distanceToStart = item.offsetLeft + curX - startX;
                distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
                tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
                    .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
                    .add("label" + i, distanceToStart / pixelsPerSecond);
                times[i] = distanceToStart / pixelsPerSecond;
            }
            function toIndex(index, vars) {
                vars = vars || {};
                (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
                let newIndex = gsap.utils.wrap(0, length, index),
                    time = times[newIndex];
                if (time > tl.time() !== index > curIndex) {
                    vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
                    time += tl.duration() * (index > curIndex ? 1 : -1);
                }
                curIndex = newIndex;
                vars.overwrite = true;
                return tl.tweenTo(time, vars);
            }
            tl.next = vars => toIndex(curIndex + 1, vars);
            tl.previous = vars => toIndex(curIndex - 1, vars);
            tl.current = () => curIndex;
            tl.toIndex = (index, vars) => toIndex(index, vars);
            tl.times = times;
            tl.progress(1, true).progress(0, true);
            if (config.reversed) {
                tl.vars.onReverseComplete();
                tl.reverse();
            }
            // Pause on hover
            if (config.paused) {
                 let mainContainer = marqueeContainerRef.current;
                 if (mainContainer) {
                    mainContainer.addEventListener("mouseenter", () => tl.pause());
                    mainContainer.addEventListener("mouseleave", () => tl.play());
                 }
            }
            return tl;
        }

        // Select all the image cards to be animated
        const boxes = gsap.utils.toArray(marqueeContentRef.current.children);
        
        // Initialize the loop
        const loop = horizontalLoop(boxes, {
          repeat: -1,
          speed: 0.5, // Adjust speed as needed
          paused: true // Start paused and let the hover events control it
        });
        
        // This is a cleanup function that runs when the component unmounts
        return () => {
          loop.kill(); // Kill the timeline to prevent memory leaks
        }

    }, [images])


   return (
      <div ref={marqueeContainerRef} className={styles.marqueeContainer}>
         <div ref={marqueeContentRef} className={styles.marqueeContent}>
            {images.map((src, index) => (
               <div
                  key={index}
                  className={styles.imageCard}>
                  <div className={styles.imageWrapper}>
                     <TrackedImage
                        src={src}
                        fill
                        alt={`Image ${index + 1}`}
                        onError={(e) => e.currentTarget.src = `/images/error.png`}
                        quality={75}
                     />
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

const ImageSlideshow = memo(SlideShow)
export default ImageSlideshow