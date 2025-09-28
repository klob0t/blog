// src/app/stores/triggerStore.ts
import { create } from 'zustand'

type ElementState = {
   element: HTMLElement | null
   setElement: (el: HTMLElement | null) => void
}

type SVGState = {
   element: SVGSVGElement | null
   setSVG: (el: SVGSVGElement | null) => void
}

export const useElementStore = create<ElementState>((set) => ({
   element: null,
   setElement: (el: HTMLElement | null) => set({ element: el })
}))

export const useSVGStore = create<SVGState>((set) => ({
   element: null,
   setSVG: (el: SVGSVGElement | null) => set({ element: el })
}))