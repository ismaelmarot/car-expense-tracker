import React from 'react'
import { CarAvatarProps } from '@/interfaces'
import {
    ImageCarPhoto,
    ImageCarIcon,
    CardIcon,
    CarIconList
} from './CarAvatar.styles'

export const CarAvatar: React.FC<CarAvatarProps> = ({
    car,
    size = 4,
    variant = 'grid'
}) => {
    const photo = car.photo;
    const iconSize = size - 1;

    if (photo) {
        return <ImageCarPhoto image={photo} size={size} />
    }

    if (variant === 'list') {
        return (
            <CarIconList>
                <ImageCarIcon size={iconSize} />
            </CarIconList>
        )
    }

    return (
        <CardIcon size={size}>
            <ImageCarIcon size={iconSize} />
        </CardIcon>
    )
}