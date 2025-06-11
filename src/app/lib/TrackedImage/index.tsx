'use client'
import Image, { ImageProps } from 'next/image'
import { useEffect, useState } from 'react'
import { useLoading } from '@/app/lib/LoadingContext'

export const TrackedImage = (props: ImageProps) => {
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

   return <Image {...props} onLoadingComplete={handleLoadingComplete} />
}