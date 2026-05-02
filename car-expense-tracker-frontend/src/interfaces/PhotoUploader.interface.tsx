export interface PhotoUploaderProps {
    photos: string[]
    onPhotosChange?: (photos: string[]) => void
    maxPhotos?: number
}