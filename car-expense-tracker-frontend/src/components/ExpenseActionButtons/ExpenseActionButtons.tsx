import React, { useState } from 'react';
import { ExpenseActionButtonInterface } from '../../interfaces/ExpenseActionButtonInterface';
import { Container, EditButton, DeleteButton } from './ExpenseActionButtonStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteExpenseConfirmationDialog from '../DeleteExpenseConfirmationDialog/DeleteExpenseConfirmationDialog';

const ExpenseActionButtons: React.FC<ExpenseActionButtonInterface> = ({ onEdit, onDelete }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = () => {
        onDelete();
        setOpen(false);
    };

    return (
        <Container>
            <EditButton aria-label='editar' onClick={onEdit}>
                <EditIcon />
            </EditButton>
            <DeleteButton aria-label='eliminar' onClick={handleClickOpen}>
                <DeleteIcon />
            </DeleteButton>
            <DeleteExpenseConfirmationDialog
                open={open}
                onClose={handleClose}
                onConfirm={handleConfirmDelete}
                title="¿Desea eliminar este gasto?"
                message="Esta acción no se puede deshacer."
            />
        </Container>
    )
};

export default ExpenseActionButtons;