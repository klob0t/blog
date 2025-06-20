'use client'
import { TrackedImage } from "@/app/lib/TrackedImage"
import { memo, useRef } from 'react'
import { gsap } from 'gsap'
import { useLoadingStore } from '@/app/lib/store/loadingStore'
import styles from './index.module.css'
import { useGSAP } from "@gsap/react"
import { usePrevious } from "@/app/lib/usePrevious"

interface LoopConfig {
    repeat?: number
    paused?: boolean
    speed?: number
    snap?: boolean | number
    paddingRight?: number
    reversed?: boolean
}

interface ExtendedTimeline extends gsap.core.Timeline {
    next: (vars?: gsap.TweenVars) => gsap.core.Tween
    previous: (vars?: gsap.TweenVars) => gsap.core.Tween
    current: () => number
    toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween
    times: number[]
}

interface ImageSlideshowProps {
    images: {
        src: string
        alt: string
    }[]
}

function SlideShow({ images }: ImageSlideshowProps) {
    const activeLoadersCount = useLoadingStore(state => state.activeLoaders.size)
    const isAppLoading = activeLoadersCount > 0
    const prevIsAppLoading = usePrevious(isAppLoading)

    const marqueeContainerRef = useRef<HTMLDivElement>(null)
    const marqueeContentRef = useRef<HTMLDivElement>(null)

    const loopedImages = images.length > 0 ? [...images, ...images] : []

    useGSAP(() => {
        if (images.length === 0 || !marqueeContentRef.current) {
            return;
        }

        if (!isAppLoading && prevIsAppLoading === true) {
            const boxes = gsap.utils.toArray('.cover-item', marqueeContentRef.current)
            gsap.fromTo(boxes, {
                height: '100%',
                backgroundColor: 'black'
            }, {
                height: '0%',
                delay: 1.3,
                stagger: 0.05,
                ease: 'power2.inOut',
            })
        }

        function horizontalLoop(items: HTMLElement[], config: LoopConfig = {}) {
            const elements = gsap.utils.toArray(items) as HTMLElement[]
            if (elements.length === 0) {
                return
            }
            const cfg = config;
            const tl = gsap.timeline({
                repeat: cfg.repeat,
                paused: false,
                defaults: { ease: "none" },
                onReverseComplete() { if (tl) { tl.totalTime(tl.rawTime() + tl.duration() * 100) } }
            })
            const length = elements.length
            const startX = elements[0].offsetLeft
            const times: number[] = []
            const widths: number[] = []
            const xPercents: number[] = []
            let curIndex: number = 0
            const pixelsPerSecond = (cfg.speed || 1) * 100
            const snap = cfg.snap === false
                ? (v: number) => v
                : gsap.utils.snap(typeof cfg.snap === 'number' ? cfg.snap : 1)
            let curX: number, distanceToStart: number, distanceToLoop: number, item: HTMLElement, i: number
            gsap.set(elements, {
                xPercent: (i, el: HTMLElement) => {
                    const w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string)
                    const x = parseFloat(gsap.getProperty(el, 'x', 'px') as string)
                    const xp = parseFloat(gsap.getProperty(el, "xPercent") as string)
                    xPercents[i] = snap((x / w) * 100 + xp)
                    return xPercents[i];
                }
            })
            gsap.set(elements, { x: 0 })
            const last = elements[length - 1]
            const totalWidth = last.offsetLeft
                + (xPercents[length - 1] / 100) * widths[length - 1]
                - startX
                + last.offsetWidth * (gsap.getProperty(last, "scaleX") as number)
                + (cfg.paddingRight ?? 0)
            for (i = 0; i < length; i++) {
                item = elements[i];
                curX = (xPercents[i] / 100) * widths[i]
                distanceToStart = item.offsetLeft + curX - startX
                distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number)
                tl.to(item, {
                    xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100), duration: distanceToLoop / pixelsPerSecond
                }, 0).fromTo(item, {
                    xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100)
                },
                    {
                        xPercent: xPercents[i],
                        duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                        immediateRender: false
                    },
                    distanceToLoop / pixelsPerSecond)
                    .add("label" + i, distanceToStart / pixelsPerSecond)
                times[i] = distanceToStart / pixelsPerSecond;
            }
            function toIndex(index: number, vars: gsap.TweenVars = {}) {
                if (Math.abs(index - curIndex) > length / 2) {
                    (index += index > curIndex ? -length : length)
                }
                const newIndex = gsap.utils.wrap(0, length, index)
                let time = times[newIndex]
                if (time > tl.time() !== index > curIndex) {
                    vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) }
                    time += tl.duration() * (index > curIndex ? 1 : -1)
                }
                curIndex = newIndex
                vars.overwrite = true
                return tl.tweenTo(time, vars)
            }
            (tl as ExtendedTimeline).next = (vars?: gsap.TweenVars) => toIndex(curIndex + 1, vars);
            (tl as ExtendedTimeline).previous = (vars?: gsap.TweenVars) => toIndex(curIndex - 1, vars);
            (tl as ExtendedTimeline).current = () => curIndex;
            (tl as ExtendedTimeline).toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars);
            (tl as ExtendedTimeline).times = times;
            void tl.progress(1, true)
            void tl.progress(0, true)
            if (cfg.reversed) {
                (tl.vars.onReverseComplete as () => void)?.()
                tl.reverse()
            }

            if (cfg.paused) {
                const mainContainer = marqueeContainerRef.current;
                if (mainContainer) {

                    mainContainer.addEventListener("mouseleave", () => tl.play())
                }
            }
            return tl
        }

        horizontalLoop(gsap.utils.toArray(marqueeContentRef.current.children), {
            repeat: -1,
            speed: 0.5,
            paused: true
        })

    }, { dependencies: [isAppLoading], scope: marqueeContainerRef })


    return (
        <div ref={marqueeContainerRef} className={styles.marqueeContainer}>
            <div ref={marqueeContentRef} className={styles.marqueeContent}>
                {loopedImages.map((image, index) => (
                    <div
                        key={index}
                        className={styles.imageCard}>
                        <div className={styles.imageWrapper}>
                            <div className={`${styles.cover} cover-item`}></div>
                            <TrackedImage
                                src={image.src}
                                fill
                                loading='eager'
                                sizes='500px'
                                alt={image.alt}
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