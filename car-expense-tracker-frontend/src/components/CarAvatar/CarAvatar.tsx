import React from 'react'
import { CarInterface } from '@/interfaces'
import { ImageCarPhoto, ImageCarIcon, CardIcon, CarIconList } from './CarAvatar.styles'

type Props = {
    car: CarInterface;
    size?: number;
    variant?: 'list' | 'grid';
}

const CarAvatar: React.FC<Props> = ({ car, size = 4, variant = 'grid' }) => {
    if (car.photo) {
        return <ImageCarPhoto image={car.photo} size={size} />;
    }

    // fallback sin imagen
    if (variant === 'list') {
        return (
        <CarIconList>
            <ImageCarIcon size={size - 1} />
        </CarIconList>
        )
    }

    return (
        <CardIcon size={size}>
        <ImageCarIcon size={size - 1} />
        </CardIcon>
    )
}

export default CarAvatar