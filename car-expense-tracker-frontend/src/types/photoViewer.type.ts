export type PhotoViewerProps = {
    open: boolean
    photos: string[]
    currentIndex: number
    onClose: () => void
    onPrev: () => void
    onNext: () => void
}