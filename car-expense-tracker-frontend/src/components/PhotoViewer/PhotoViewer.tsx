import React from 'react'
import { PhotoViewerProps } from '@/types'
import {
    Overlay,
    ImageStyled,
    LeftButton,
    RightButton,
} from './PhotoViewer.styles'

export const PhotoViewer: React.FC<PhotoViewerProps> = ({
    open,
    photos,
    currentIndex,
    onClose,
    onPrev,
    onNext,
}) => {
    if (!open) return null

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <Overlay onClick={handleOverlayClick}>
            <ImageStyled
                src={photos[currentIndex]}
                alt="Full size"
            />

            {photos.length > 1 && (
                <>
                    <LeftButton
                        onClick={(e) => {
                            e.stopPropagation()
                            onPrev()
                        }}
                    >
                        ‹
                    </LeftButton>

                    <RightButton
                        onClick={(e) => {
                            e.stopPropagation()
                            onNext()
                        }}
                    >
                        ›
                    </RightButton>
                </>
            )}
        </Overlay>
    )
}