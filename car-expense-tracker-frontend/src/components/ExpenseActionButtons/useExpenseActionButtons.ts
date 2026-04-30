import { useState } from 'react'

export const useExpenseActionButtons = (onDelete: () => void) => {
    const [open, setOpen] = useState(false)

    const openDialog = () => setOpen(true)
    const closeDialog = () => setOpen(false)

    const confirmDelete = () => {
        onDelete()
        closeDialog()
    }

    return {
        open,
        openDialog,
        closeDialog,
        confirmDelete
    }
}