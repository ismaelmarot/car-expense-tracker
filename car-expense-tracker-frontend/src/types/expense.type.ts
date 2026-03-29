export type Expense = {
    car_id: number;
    description: string;
    amount: number;
    kilometers?: number;
    category: string;
    date: string;
    photos?: string[];
};