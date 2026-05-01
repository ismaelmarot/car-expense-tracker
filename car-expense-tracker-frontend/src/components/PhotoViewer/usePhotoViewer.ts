import { useState } from 'react'

export const usePhotoViewer = () => {
    const [open, setOpen] = useState(false)
    const [photos, setPhotos] = useState<string[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)

    const openViewer = (photos: string[], index: number) => {
        setPhotos(photos)
        setCurrentIndex(index)
        setOpen(true)
    }

    const closeViewer = () => setOpen(false)

    const prev = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1))
    }

    const next = () => {
        setCurrentIndex((prev) => Math.min(photos.length - 1, prev + 1))
    }

    return {
        open,
        photos,
        currentIndex,
        openViewer,
        closeViewer,
        prev,
        next,
    }
}