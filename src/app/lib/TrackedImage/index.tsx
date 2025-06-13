


























































'use client'
import Image, { ImageProps } from 'next/image'
import { useEffect, useRef, useCallback, SyntheticEvent } from 'react'
import { useLoading } from '@/app/lib/LoadingContext'

type OnLoadingComplete = (img: HTMLImageElement) => void

interface TrackedImageProps extends ImageProps {
  onLoad?: OnLoadingComplete
  onError?: (event: SyntheticEvent<HTMLImageElement, Event>) => void
}

export const TrackedImage = (props: TrackedImageProps) => {
  const { startLoading, finishLoading } = useLoading()
  
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

  const handleLoadingComplete: OnLoadingComplete = (img) => {
    handleFinish()
    
    if (onLoad) {
      onLoad(img)
    }
  }

  const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
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