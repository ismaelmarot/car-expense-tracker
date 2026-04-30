import React from 'react'
import { Box } from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import CloseIcon from '@mui/icons-material/Close'
import { PhotoUploaderProps } from '@/interfaces'
import { usePhotoUploader } from './usePhotoUploader'

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
    photos,
    onPhotosChange,
}) => {
    const {
        fileInputRef,
        handlePhotoClick,
        handlePhotoChange,
        removePhoto,
    } = usePhotoUploader(photos, onPhotosChange)

    return (
        <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                
                {/* PHOTOS */}
                {photos.map((photo, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: '12px',
                            backgroundImage: `url(${photo})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'relative',
                        }}
                    >
                        <Box
                            onClick={() => removePhoto(index)}
                            sx={{
                                position: 'absolute',
                                top: -6,
                                right: -6,
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                background: 'rgba(0,0,0,0.6)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                '&:hover': { background: '#ff3b30' },
                            }}
                        >
                            <CloseIcon sx={{ fontSize: 12, color: 'white' }} />
                        </Box>
                    </Box>
                ))}

                {/* ADD BUTTON */}
                {photos.length < 3 && (
                    <Box
                        onClick={handlePhotoClick}
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: '12px',
                            border: '1.5px dashed #c7c7cc',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            '&:hover': {
                                borderColor: '#0071e3',
                                background: 'rgba(0,113,227,0.05)',
                            },
                        }}
                    >
                        <PhotoCameraIcon sx={{ fontSize: 20, color: '#aeaeb2' }} />
                    </Box>
                )}
            </Box>

            {/* INPUT HIDDEN */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handlePhotoChange(e.target.files)}
                style={{ display: 'none' }}
            />
        </Box>
    )
}