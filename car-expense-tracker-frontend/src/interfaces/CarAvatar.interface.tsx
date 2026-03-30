import { CarInterface } from '@/interfaces'

export interface CarAvatarProps {
    car: CarInterface;
    size?: number;
    variant?: 'list' | 'grid'
}