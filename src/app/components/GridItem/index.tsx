'use client'

import { ReactNode } from 'react'

interface GridItemProps {
   children: ReactNode
   className?: string
}

export default function GridItem({ children, className = '' }: GridItemProps) {
   return (
      <div className={className}>
         {children}
      </div>
   )
}