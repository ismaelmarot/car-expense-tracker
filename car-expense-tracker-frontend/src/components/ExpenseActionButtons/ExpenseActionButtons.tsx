import React from 'react'
import { ExpenseActionButtonInterface } from '@/interfaces'
import { Icons } from '@/constants'
import { DeleteExpenseConfirmationDialog } from '@/components'
import { useExpenseActionButtons } from './useExpenseActionButtons'
import {
    Container,
    EditButton,
    DeleteButton
} from './ExpenseActionButtons.styles'

export const ExpenseActionButtons: React.FC<ExpenseActionButtonInterface> = ({
    onEdit,
    onDelete
}) => {
    const {
        open,
        openDialog,
        closeDialog,
        confirmDelete
    } = useExpenseActionButtons(onDelete)

    return (
        <Container>
        <EditButton aria-label='editar' onClick={onEdit}>
            <Icons.Edit sx={{ fontSize: 16, color: '#fff' }} />
        </EditButton>

        <DeleteButton aria-label='eliminar' onClick={openDialog}>
            <Icons.Delete sx={{ fontSize: 16, color: '#fff' }} />
        </DeleteButton>

        <DeleteExpenseConfirmationDialog
            open={open}
            onClose={closeDialog}
            onConfirm={confirmDelete}
            title="¿Desea eliminar este gasto?"
            message="Esta acción no se puede deshacer."
        />
        </Container>
    )
}