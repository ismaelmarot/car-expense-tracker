import { ExpenseInterface } from "./ExpenseInterface";

export interface EditExpenseDialogPropsInterface {
    open: boolean;
    expense: ExpenseInterface | null;
    error: string;
    onClose: () => void;
    onSave: () => void;
    onChange: (field: keyof ExpenseInterface, value: string | number) => void;
}