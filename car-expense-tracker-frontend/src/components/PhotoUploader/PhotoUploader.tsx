import React from 'react'
import { Icons } from '@/constants'
import { PhotoUploaderProps } from '@/interfaces'
import { usePhotoUploader } from './usePhotoUploader'
import {
    PhotosWrapper,
    PhotoItem,
    RemoveButton,
    AddPhotoButton,
} from './PhotoUploader.styles'

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
    photos,
    onPhotosChange,
    maxPhotos = 3,
}) => {
    const {
        fileInputRef,
        handlePhotoClick,
        handlePhotoChange,
        removePhoto,
    } = usePhotoUploader(photos, onPhotosChange)

    return (
        <>
            <PhotosWrapper>
                {/* PHOTOS */}
                {photos.map((photo, index) => (
                    <PhotoItem
                        key={index}
                        sx={{
                            backgroundImage: `url(${photo})`,
                        }}
                    >
                        <RemoveButton onClick={() => removePhoto(index)}>
                            <Icons.Close sx={{ fontSize: 12, color: 'white' }} />
                        </RemoveButton>
                    </PhotoItem>
                ))}

                {/* ADD BUTTON */}
                {photos.length < maxPhotos && (
                    <AddPhotoButton onClick={handlePhotoClick}>
                        <Icons.PhotoCamera sx={{ fontSize: 20, color: '#aeaeb2' }} />
                    </AddPhotoButton>
                )}
            </PhotosWrapper>

            {/* INPUT HIDDEN */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handlePhotoChange(e.target.files)}
                style={{ display: 'none' }}
            />
        </>
    )
}