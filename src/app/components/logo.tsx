import { forwardRef, useEffect } from "react"
import { useSVGStore } from "@/app/lib/store/elementStore"
import { useRef } from "react"

type LogoProps = {
   children?: React.ReactNode;
};

export const Logo = forwardRef<HTMLDivElement, LogoProps>((_props, ref) => {
   const setElement = useSVGStore((s) => s.setSVG)
   const element = useSVGStore((s) => s.element)
   const svgRef = useRef<SVGSVGElement | null>(null)

   useEffect(() => {
      if (!svgRef.current) return

      setElement(svgRef.current)
      console.log(element)
   }, [element, setElement])

   return (
      <div ref={ref}>
         <svg width="100%" height="100%" viewBox="0 0 2250 2250" version="1.1" xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve"
            style={{
               fillRule: 'evenodd',
               clipRule: 'evenodd',
               strokeLinejoin: 'round',
               strokeMiterlimit: 2
            }}
            ref={svgRef}>
            <path d="M248.34,341.222l-115.206,-115.872l200.316,-201.473l200.315,201.473l0,677.799l116.295,117.054l-200.316,201.473l-201.404,-202.655l0,-677.799Z"
               style={{ fill: 'currentcolor' }}
            />
            <path d="M971.456,341.222l-115.206,-115.872l200.316,-201.473l200.316,201.473l-0,843.195l188.769,189.788l-200.316,201.473l-273.879,-275.389l0,-843.195Z"

               style={{ fill: 'currentcolor' }}
            />
            <path d="M246.976,1474.88l-115.206,-115.872l200.315,-201.473l200.316,201.473l-1.568,1.577l1.568,-0.18l-0.327,547.643l115.207,115.872l-200.316,201.473l-200.316,-201.473l0.327,-549.04Z"

               style={{ fill: 'currentcolor' }}
            />
            <path d="M1712.79,1128.91l286.049,-287.243l-0.659,281.508l120.048,120.742l-115.206,115.872l1.716,557.154l107.088,107.707l-200.316,201.473l-200.316,-201.473l1.541,-601.746l0.055,-293.994Z"

               style={{ fill: 'currentcolor' }}
            />
            <path d="M651.065,870.291l-115.207,-115.872l200.316,-201.473l200.316,201.473l-1.569,1.578l1.569,-0.181l-0,445.122l127.932,128.839l-200.316,201.473l-213.041,-214.44l-0,-446.519Z"

               style={{ fill: 'currentcolor' }}
            />
            <path d="M663.503,1784.12l-127.003,-127.151l200.316,-201.473l212.112,212.752l-1.568,1.578l1.568,-0.181l1.449,355.001l-289.766,-0l2.892,-240.526Z"

               style={{ fill: 'currentcolor' }}
            />
            <path d="M1391.78,2024.65l0.327,-420.709l-118.789,-115.704l200.315,-201.474l203.899,201.306l-0.327,536.581l-285.425,-0Z"

               style={{ fill: 'currentcolor' }}
            />
            <path d="M1714.37,1070.4l-0.013,-451.367l-133.453,-134.224l200.316,-201.473l218.562,219.825l-1.568,1.577l1.568,-0.18l0.002,278.778l-285.414,287.064Z"

               style={{ fill: 'currentcolor' }}
            />
            <path d="M1267.19,1491.67l-0.327,414.502l119.147,119.835l-200.316,201.473l-204.256,-205.436l1.568,-1.578l-1.568,0.181l0.327,-528.977l285.425,-0Z"

               style={{ fill: 'currentcolor' }}
            />
            <path d="M1577.09,489.583l-0,449.307l133.948,134.637l-200.316,201.473l-219.057,-220.238l-0,-565.179l285.425,0Z"

               style={{ fill: 'currentcolor' }}
            />
            <path d="M936.241,351.473l-200.316,201.473l-200.316,-201.473l200.316,-201.473l200.316,201.473Z"

               style={{ fill: 'currentcolor' }}
            />
         </svg>
      </div>
   )
})
Logo.displayName = 'logo'