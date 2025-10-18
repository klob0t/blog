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
            ref={svgRef}>
            <g>
               <rect x="337.5" y="0" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="337.5" y="450" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="337.5" y="900" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="337.5" y="225" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="337.5" y="675" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="562.5" y="675" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="787.5" y="450" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="787.5" y="900" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="787.5" y="1125" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="337.5" y="1125" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="1012.5" y="0" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="787.5" y="0" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="1012.5" y="225" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="1012.5" y="450" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="1012.5" y="675" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="1012.5" y="900" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="1237.5" y="1125" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="337.5" y="1125" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="337.5" y="1350" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="337.5" y="1800" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="337.5" y="1575" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="337.5" y="2025" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="562.5" y="2025" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="787.5" y="1800" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="787.5" y="1575" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="787.5" y="1350" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="562.5" y="1350" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="787.5" y="1575" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="787.5" y="1800" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="1012.5" y="2025" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="1237.5" y="1800" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="1237.5" y="1575" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="1012.5" y="1350" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="1237.5" y="675" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="1462.5" y="900" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="1687.5" y="675" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="1462.5" y="450" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="1237.5" y="1350" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="1237.5" y="1575" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="1237.5" y="1800" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="1462.5" y="2025" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="1687.5" y="1800" width="225" height='225' style={{fill: 'currentcolor'}} />
               
               <rect x="1237.5" y="1125" width="225" height='225' style={{fill: 'currentcolor'}} />

               <rect x="1462.5" y="1350" width="225" height='225' style={{fill: 'currentcolor'}} />
            </g>
         </svg>
      </div>
   )
})
Logo.displayName = 'logo'