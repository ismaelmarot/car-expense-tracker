import React from 'react'
import { Box } from '@mui/material'
import { CarInterface } from '@/interfaces'
import {
    Header,
    HeaderLeft,
    PhotoWrapper,
    PhotoImage,
    PhotoEditOverlay,
    PhotoPlaceholder,
    CarName,
    CarInfo,
    CarInfoText
} from './CarHeader.styles'

interface CarHeaderProps {
    car: CarInterface
    onPhotoClick: () => void
}

export const CarHeader: React.FC<CarHeaderProps> = ({
    car,
    onPhotoClick
}) => {
    return (
        <Header>
            <HeaderLeft>
                <PhotoWrapper onClick={onPhotoClick}>
                    {car.photo ? (
                        <>
                            <PhotoImage 
                                style={{ backgroundImage: `url(${car.photo})` }}
                            />
                            <PhotoEditOverlay className="photo-overlay">
                                <span style={{ color: 'white', fontSize: '1rem' }}>📷</span>
                            </PhotoEditOverlay>
                        </>
                    ) : (
                        <PhotoPlaceholder>
                            <span style={{ fontSize: '1.5rem' }}>📷</span>
                        </PhotoPlaceholder>
                    )}
                </PhotoWrapper>
                <CarInfo>
                    <CarName>{car.brand} {car.model}</CarName>
                    <CarInfoText>
                        {car.year} {car.version && `• ${car.version}`}
                    </CarInfoText>
                    {car.vin && (
                        <CarInfoText style={{ fontSize: '0.75rem', color: '#86868b' }}>
                            {car.vin}
                        </CarInfoText>
                    )}
                </CarInfo>
            </HeaderLeft>
        </Header>
    )
}
