'use client'
import React from 'react'
import Home from './component/home/page'
import { useEffect, useState } from 'react'

const MainPage = () => {
   // const [isLoading, setIsLoading] = useState(true)
   // useEffect(() => {
   //   const timer = () => {
   //    setTimeout(() => {
   //       setIsLoading(false)
   //    }, 2000)
   //   }
   //    timer()
   // }, [])
   return (
      <Home />
   )
}

export default MainPage