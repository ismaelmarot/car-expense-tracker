import { useState } from 'react'
import { ExpenseInterface } from '@/interfaces'

export const useCarExpensesUI = (handleUpdate: any) => {
    const [editExpense, setEditExpense] = useState<ExpenseInterface | null>(null)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [selectedExpense, setSelectedExpense] = useState<ExpenseInterface | null>(null)
    const [showPopup, setShowPopup] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    // =========================
    // HANDLERS
    // =========================

    const handleItemClick = (expense: ExpenseInterface) => {
        const expenseWithPhotos = {
            ...expense,
            photos: typeof expense.photos === 'string'
                ? JSON.parse(expense.photos || '[]')
                : (expense.photos || [])
        }

        setSelectedExpense(expenseWithPhotos)
        setShowPopup(true)
    }

    const handleEdit = (expense: ExpenseInterface) => {
        const expenseWithPhotos = {
            ...expense,
            photos: typeof expense.photos === 'string'
                ? JSON.parse(expense.photos || '[]')
                : (expense.photos || [])
        }
        setEditExpense(expenseWithPhotos)
        setOpenEditDialog(true)
        setShowPopup(false)
    }

    const handleSave = async () => {
        if (!editExpense) return

        await handleUpdate(editExpense)

        if (selectedExpense?.id === editExpense.id) {
            setSelectedExpense(editExpense)
        }

        setOpenEditDialog(false)
        setEditExpense(null)
    }

    const handleClosePopup = () => {
        setShowPopup(false)
        setSelectedExpense(null)
    }

    const handleChange = (field: string, value: any) => {
        setEditExpense(prev =>
            prev ? { ...prev, [field]: value } : prev
        )
    }

    return {
        // state
        editExpense,
        openEditDialog,
        selectedExpense,
        showPopup,
        showDeleteConfirm,

        // setters directos (solo los necesarios)
        setOpenEditDialog,
        setShowDeleteConfirm,

        // handlers
        handleItemClick,
        handleEdit,
        handleSave,
        handleClosePopup,
        handleChange,
    }
}