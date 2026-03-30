export interface CarListItemProps {
    car: {
        id: number;
        brand: string;
        model: string;
        year: number;
        vin: string;
    }
    onClick: () => void;
}