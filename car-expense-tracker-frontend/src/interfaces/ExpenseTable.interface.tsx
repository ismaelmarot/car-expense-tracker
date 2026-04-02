import { ExpenseInterface } from '@/interfaces'

export interface ExpenseTableInterface {
    expenses: ExpenseInterface[];
    handleEdit: (expense: ExpenseInterface ) => void;
    handleDelete: (id: number ) => void;
    formatNumberByThousands: (num: number) => string;
    formatMoney: (num: number) => string;
    formatDate: (date: string) => string;
}