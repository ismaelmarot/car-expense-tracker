export interface ExpenseInterface {
    id: number;
    description: string;
    amount: number;
    kilometers: number;
    category: string;
    date: string;
    car_id: number;
    photos?: string[];
}