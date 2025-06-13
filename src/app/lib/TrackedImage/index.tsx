'use client'
import Image, { ImageProps } from 'next/image'
import { useEffect, useState, memo } from 'react'
import { useLoading } from '@/app/lib/LoadingContext'

const TrackedImageComponent = ({ alt = '', ...props }: ImageProps) => {
   const { startLoading, finishLoading } = useLoading()
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      if (isLoading) {
         startLoading()
      }

      return () => {
         if (isLoading) {
            finishLoading()
         }
      }
   }, [isLoading, startLoading, finishLoading])

   const handleLoadingComplete = () => {
      setIsLoading(false)
      finishLoading()
   }

   return <Image alt={alt} {...props} onLoad={handleLoadingComplete} />
}

export const TrackedImage = memo(TrackedImageComponent)