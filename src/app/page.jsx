"use client";
import Home from "./component/home/page";
import { useRef, useEffect, useState } from "react";
import Load from "./component/load";
import Image from "next/image";

export default function LandingPage() {
  const loaderRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(handler, 1000);
    return () => {
      clearTimeout(timeout)
    };
  }, []);

  const handler = () => {
      if(loaderRef.current) {
        loaderRef.current.style.transform = 'scale3d(1,1,1) translate3d(0,0,0)'
        loaderRef.current.style.opacity = '1'
        loaderRef.current.style.transition = 'transform 0.5s cubic-bezier(1,0,.42,1), opacity 0.5s cubic-bezier(1,0,.42,1)'
      }
      setTimeout(() => {
        if(loaderRef.current) {
          loaderRef.current.style.transform = 'scale3d(20,20,1) translate3d(0,-100%,0)'
          loaderRef.current.style.opacity = '0'
        }
        setTimeout(() => {
          setIsLoading(false)
        },500)
      },1000)
  };


  return (<>{isLoading ? (<Load ref={loaderRef} />) : (<Home />)}</>);
  // return (<Load ref={loaderRef}/>)
}
