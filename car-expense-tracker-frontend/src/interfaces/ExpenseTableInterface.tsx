import { ExpenseInterface } from "./ExpenseInterface";

export interface ExpenseTableInterface {
    expenses: ExpenseInterface[];
    handleEdit: (expense: ExpenseInterface ) => void;
    handleDelete: (id: number ) => void;
    formatNumberByThousands: (num: number) => string;
    formatNumberWithCommas: (num: number) => string;
    formatDate: (date: string) => string;
}