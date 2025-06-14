'use client'
import Image, { ImageProps } from 'next/image'
import { useEffect, useRef, useCallback, SyntheticEvent } from 'react'
import { useLoadingStore } from '@/app/lib/store/loadingStore'

type OnLoadingComplete = (img: HTMLImageElement) => void

type NextImageOnLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => void;
type NextImageOnError = (event: SyntheticEvent<HTMLImageElement, Event>) => void;

interface TrackedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  onLoad?: OnLoadingComplete
  onError?: NextImageOnError
}

export const TrackedImage = (props: TrackedImageProps) => {
  const { startLoading, finishLoading } = useLoadingStore()
  
  const { onLoad, onError, alt = '', src, ...rest } = props
  
  const isFinished = useRef(false)
  
  const loaderId = `image-${src?.toString() || 'unknown'}`
  
  const handleFinish = useCallback(() => {
    
    if (!isFinished.current) {
      finishLoading(loaderId)
      isFinished.current = true
    }
  }, [finishLoading, loaderId]) 

  useEffect(() => {
    
    if (!src) return;
    
    isFinished.current = false
    startLoading(loaderId)
    
    return () => {
      handleFinish()
    }
    
  }, [src, startLoading, handleFinish, loaderId])

  const handleLoadingComplete: NextImageOnLoad = (event) => {
    handleFinish()
    
    if (onLoad) {
      onLoad(event.currentTarget)
    }
  }

  const handleError: NextImageOnError = (event) => {
    handleFinish()
    
    if (onError) {
      onError(event)
    }
  }

  
  if (!src) {
    return null;
  }

  return (
    <Image
      {...rest}
      src={src}
      alt={alt}
      onLoad={handleLoadingComplete}
      onError={handleError}
    />
  )
}