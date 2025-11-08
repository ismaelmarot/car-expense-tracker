import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { DeleteCarConfirmationDialogInterface } from '../../interfaces/DeleteCarConfirmationDialogInterface';
import { ButtonCancel, ButtonConfirm } from './DeletCarConfirmationDialogStyles';

const DeleteCarConfirmationDialog: React.FC<DeleteCarConfirmationDialogInterface> = ({ open, title, description, onConfirm, onCancel }) => {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby='confirmation-dialog-title'
            aria-describedby='confirmation-dialog-description'
        >
            <DialogTitle id='confirmation-dialog-title'>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id='confirmation-dialog-description'>
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ButtonCancel onClick={onCancel}>
                    Cancelar
                </ButtonCancel>
                <ButtonConfirm onClick={onConfirm}autoFocus>
                    Confirmar
                </ButtonConfirm>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteCarConfirmationDialog;
