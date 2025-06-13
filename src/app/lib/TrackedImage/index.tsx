'use client'
import Image, { ImageProps } from 'next/image'
import { useEffect, useCallback, SyntheticEvent } from 'react'
import { useLoading } from '@/app/lib/LoadingContext'

type OnLoadingComplete = (img: HTMLImageElement) => void

interface TrackedImageProps extends ImageProps {
   onLoadingComplete?: OnLoadingComplete
   onError?: (event: SyntheticEvent<HTMLImageElement, Event>) => void
}

export const TrackedImage = (props: TrackedImageProps) => {
   const { startLoading, finishLoading } = useLoading()

   const { onLoadingComplete, onError, alt = '', ...rest } = props


   const handleFinish = useCallback(() => {
      finishLoading()
   }, [finishLoading])

   useEffect(() => {
      startLoading()

      return () => handleFinish()
   }, [startLoading, handleFinish])


   const handleLoadingComplete: OnLoadingComplete = (img) => {
      handleFinish()

      if (onLoadingComplete) {
         onLoadingComplete(img)
      }
   }


   const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
      handleFinish()

      if (onError) {
         onError(event)
      }
   }

   return (
      <Image
         {...rest}
         alt={alt}
         onLoadingComplete={handleLoadingComplete}
         onError={handleError}
      />
   )
}

