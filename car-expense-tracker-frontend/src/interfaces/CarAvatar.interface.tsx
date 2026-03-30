import { CarInterface } from './CarInterface'

export interface CarAvatarProps {
    car: CarInterface;
    size?: number;
    variant?: 'list' | 'grid'
}