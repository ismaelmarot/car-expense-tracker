export interface DeleteCarConfirmationDialogInterface {
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
}