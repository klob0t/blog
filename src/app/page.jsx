"use client";
import Home from "./component/home/page";
import { useRef, useEffect, useState } from "react";
import Load from "./component/load";
import Image from "next/image";

export default function LandingPage() {
  const loaderRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(handler, 2000);
    return () => {
      clearTimeout(timeout)
    };
  }, []);

  const handler = () => {
    setTimeout(() => {
      setIsLoading(false);
      console.log("HAHAHA");
    }, 500);
  };
  return (<>{isLoading ? (<Load ref={loaderRef} />) : (<Home />)}</>);
}
