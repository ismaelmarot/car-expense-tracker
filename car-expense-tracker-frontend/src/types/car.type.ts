export type Car = {
    brand: string;
    model: string;
    year: number;
    vin: string;
    version?: string;
    photo?: string;
    kilometers?: number;
    last_service_km?: number;
    service_interval_km?: number;
    vtv_date?: string;
    extintor_date?: string;
};