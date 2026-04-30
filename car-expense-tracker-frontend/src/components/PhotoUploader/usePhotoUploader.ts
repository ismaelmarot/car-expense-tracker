import { useRef } from 'react'

export const usePhotoUploader = (
    photos: string[],
    onPhotosChange?: (photos: string[]) => void
) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handlePhotoClick = () => {
        fileInputRef.current?.click()
    }

    const handlePhotoChange = (files: FileList | null) => {
        if (!files || !onPhotosChange) return

        const remainingSlots = 3 - photos.length
        if (remainingSlots <= 0) return

        const filesToProcess = Array.from(files).slice(0, remainingSlots)

        filesToProcess.forEach((file) => {
            const reader = new FileReader()
            reader.onloadend = () => {
                const result = reader.result as string
                onPhotosChange([...photos, result])
            }
            reader.readAsDataURL(file)
        })
    }

    const removePhoto = (index: number) => {
        if (!onPhotosChange) return
        onPhotosChange(photos.filter((_, i) => i !== index))
    }

    return {
        fileInputRef,
        handlePhotoClick,
        handlePhotoChange,
        removePhoto,
    }
}