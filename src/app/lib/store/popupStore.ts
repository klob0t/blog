import { create } from 'zustand'

interface ImageData {
   src: string
   alt: string
}

interface PopupState {
   isOpen: boolean
   images: ImageData[]
   openPopup: (images: ImageData[]) => void
   closePopup: () => void
}

export const usePopupStore = create<PopupState>((set) => ({
   isOpen: false,
   images: [],
   openPopup: (images: ImageData[]) => set({ isOpen: true, images: images }),
   closePopup: () => set({ isOpen: false, images: [] })
}))