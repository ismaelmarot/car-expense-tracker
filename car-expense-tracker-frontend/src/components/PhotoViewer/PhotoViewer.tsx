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

    return (
        <Overlay onClick={onClose}>
            <ImageStyled
                src={photos[currentIndex]}
                alt="Full size"
                onClick={(e) => e.stopPropagation()}
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