import { CarAvatarProps } from '@/interfaces'

export const useCarAvatar = ({ car, size = 4, variant = 'grid' }: CarAvatarProps) => {
    const hasPhoto = Boolean(car.photo)

    const computedSize = variant === 'list' ? size - 1 : size

    return {
        hasPhoto,
        size,
        computedSize,
        variant,
        photo: car.photo,
    }
}