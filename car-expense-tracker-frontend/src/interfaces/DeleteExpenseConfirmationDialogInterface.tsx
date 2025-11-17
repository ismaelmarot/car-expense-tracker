export interface DeleteExpenseConfirmationDialogInterface {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}