'use client'
import { TrackedImage } from "@/app/lib/TrackedImage"
import { useEffect, useRef, useState } from "react"
import styles from './index.module.css'

interface ActivePixel {
    x: number
    y: number
    timestamp: number
}
interface Dimensions {
    x: number
    y: number
    width: number
    height: number
}
interface MousePosition {
    x: number | undefined
    y: number | undefined
}


const getCoverDimensions = (containerWidth: number, containerHeight: number, imageWidth: number, imageHeight: number): Dimensions => {
    const imageRatio = imageWidth / imageHeight
    const containerRatio = containerWidth / containerHeight
    let finalWidth: number, finalHeight: number

    if (imageRatio > containerRatio) {
        finalHeight = containerHeight
        finalWidth = containerHeight * imageRatio
    } else {
        finalWidth = containerWidth
        finalHeight = containerWidth / imageRatio
    }
    const x = (containerWidth - finalWidth) / 2
    const y = (containerHeight - finalHeight) / 2
    return { x, y, width: finalWidth, height: finalHeight }
}


export default function PhotoCard() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const frameRef = useRef<HTMLDivElement | null>(null)
    const mouseRef = useRef<MousePosition>({ x: undefined, y: undefined })
    const activePixelsRef = useRef<ActivePixel[]>([])
    const pixelColorCache = useRef<Map<string, string>>(new Map())
    const [isTouch, setIsTouch] = useState(false)

    const imageUrl = '/images/profPict.jpg'

    useEffect(() => {
        const handleFirstInteraction = (event: PointerEvent) => {
            if (event.pointerType === 'touch') {
                setIsTouch(true);
            }
        }
        window.addEventListener('pointerdown', handleFirstInteraction, { once: true });

        return () => {
            window.removeEventListener('pointerdown', handleFirstInteraction);
        }
    }, [])

    useEffect(() => {
        if (isTouch === false) {

            const canvas = canvasRef.current
            const frame = frameRef.current
            if (!canvas || !frame) return

            const ctx = canvas.getContext('2d')
            if (!ctx) return

            const PIXEL_SIZE = 20
            const FADE_DURATION = 4000
            let animationFrameId: number

            const img = new Image()
            img.crossOrigin = 'Anonymous'
            img.src = imageUrl

            const setupAndDraw = () => {
                const frameWidth = frame.clientWidth
                const frameHeight = frame.clientHeight
                const dims = getCoverDimensions(frameWidth, frameHeight, img.naturalWidth, img.naturalHeight)

                const dpr = 1
                canvas.width = frameWidth * dpr
                canvas.height = frameHeight * dpr
                ctx.scale(dpr, dpr)


                ctx.drawImage(img, dims.x, dims.y, dims.width, dims.height)


                pixelColorCache.current.clear()
                for (let y = 0; y < frameHeight; y += PIXEL_SIZE) {

                    for (let x = 0; x < frameWidth; x += PIXEL_SIZE) {
                        try {
                            const colorData = ctx.getImageData(x, y, 1, 1).data;
                            const color = `rgb(${colorData[0]}, ${colorData[1]}, ${colorData[2]})`
                            pixelColorCache.current.set(`${x},${y}`, color)
                        } catch (e) { console.error(e) }
                    }
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height)
                for (const [key, color] of pixelColorCache.current.entries()) {
                    const [x, y] = key.split(',').map(Number)
                    ctx.fillStyle = color
                    ctx.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE)
                }


                mouseRef.current = { x: undefined, y: undefined }
                activePixelsRef.current = []
            }

            const handleMouseMove = (e: MouseEvent) => {
                const rect = canvas.getBoundingClientRect()
                mouseRef.current.x = e.clientX - rect.left
                mouseRef.current.y = e.clientY - rect.top
            }

            const handleMouseLeave = () => {
                mouseRef.current.x = undefined
            }


            const animate = () => {
                animationFrameId = requestAnimationFrame(animate)
                const now = Date.now()
                const mouse = mouseRef.current


                if (mouse.x !== undefined && mouse.y !== undefined) {
                    const gridX = Math.floor(mouse.x / PIXEL_SIZE)
                    const gridY = Math.floor(mouse.y / PIXEL_SIZE)


                    activePixelsRef.current = activePixelsRef.current.filter(p => p.x !== gridX || p.y !== gridY)
                    activePixelsRef.current.push({ x: gridX, y: gridY, timestamp: now })
                }


                activePixelsRef.current = activePixelsRef.current.filter(p => {
                    const elapsedTime = now - p.timestamp
                    if (elapsedTime >= FADE_DURATION) {

                        const key = `${p.x * PIXEL_SIZE},${p.y * PIXEL_SIZE}`
                        const color = pixelColorCache.current.get(key)
                        if (color) {
                            ctx.fillStyle = color
                            ctx.fillRect(p.x * PIXEL_SIZE, p.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
                        }

                        return false
                    }
                    return true
                })


                activePixelsRef.current.forEach(p => {
                    const elapsedTime = now - p.timestamp
                    const key = `${p.x * PIXEL_SIZE},${p.y * PIXEL_SIZE}`
                    const color = pixelColorCache.current.get(key)
                    if (!color) return

                    const opacity = Math.min(elapsedTime / FADE_DURATION, 1)

                    ctx.clearRect(p.x * PIXEL_SIZE, p.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)

                    if (opacity > 0) {
                        ctx.fillStyle = color.replace('rgb', 'rgba').replace(')', `, ${opacity})`)
                        ctx.fillRect(p.x * PIXEL_SIZE, p.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
                    }
                })
            }

            const observer = new ResizeObserver(setupAndDraw)
            observer.observe(frame)

            img.onload = () => {
                setupAndDraw()
                cancelAnimationFrame(animationFrameId)
                animationFrameId = requestAnimationFrame(animate)
            }

            frame.addEventListener('mousemove', handleMouseMove)
            frame.addEventListener('mouseleave', handleMouseLeave)

            return () => {
                observer.disconnect()
                cancelAnimationFrame(animationFrameId)
                frame.removeEventListener('mousemove', handleMouseMove)
                frame.removeEventListener('mouseleave', handleMouseLeave)
            }
        }
    }, [imageUrl, isTouch])



    return (
        <div ref={frameRef} className={styles.revealContainer}>
            {!isTouch && <canvas ref={canvasRef} className={styles.revealCanvas} />}
            <TrackedImage
                src={imageUrl}
                alt='background'
                fill
                quality={100}
                style={{ objectFit: 'cover' }}
            />
        </div>
    )
}


