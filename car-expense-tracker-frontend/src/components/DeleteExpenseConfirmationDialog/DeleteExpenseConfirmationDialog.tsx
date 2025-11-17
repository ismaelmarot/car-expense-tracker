import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ButtonCancel, ButtonDelete } from './DeleteExpenseConfirmationDialogStyles';
import { DeleteExpenseConfirmationDialogInterface } from '../../interfaces/DeleteExpenseConfirmationDialogInterface';

const DeleteExpenseConfirmationDialog: React.FC<DeleteExpenseConfirmationDialogInterface> = ({
    open,
    onClose,
    onConfirm,
    title,
    message
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                <ButtonCancel onClick={onClose}>
                    cancelar
                </ButtonCancel>
                <ButtonDelete onClick={onConfirm}>
                    confirmar
                </ButtonDelete>
            </DialogActions>
        </Dialog>
    )
};

export default DeleteExpenseConfirmationDialog;