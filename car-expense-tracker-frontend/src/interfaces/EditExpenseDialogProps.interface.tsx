import { ExpenseInterface } from './Expense.interface'

export interface EditExpenseDialogPropsInterface {
    open: boolean;
    expense: ExpenseInterface | null;
    error: string;
    onClose: () => void;
    onSave: () => void;
    onChange: (field: keyof ExpenseInterface, value: string | number | string[]) => void;
    onPhotosChange?: (photos: string[]) => void;
}