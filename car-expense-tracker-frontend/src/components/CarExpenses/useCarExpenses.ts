import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCarExpenses, deleteExpense, updateExpense } from '@/api'
import { ExpenseInterface } from '@/interfaces'
import { SortField, SortOrder } from '@/types'

export const useCarExpenses = () => {
    const { id } = useParams()

    const [expenses, setExpenses] = useState<ExpenseInterface[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [sortBy, setSortBy] = useState<SortField>('date')
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

    // fetch
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const data = await getCarExpenses(Number(id))
                const expensesWithPhotos = data.map((expense: any) => ({
                    ...expense,
                    photos:
                        typeof expense.photos === 'string'
                            ? JSON.parse(expense.photos || '[]')
                            : expense.photos || []
                }))
                    setExpenses(expensesWithPhotos)
                    setLoading(false)
            } catch (err) {
                setError('Hubo un error al cargar los gastos.')
                setLoading(false)
            }
        }

        fetchExpenses()
    }, [id])

    // sort
    const sortedExpenses = useMemo(() => {
        return [...expenses].sort((a, b) => {
            let comparison = 0

            switch (sortBy) {
                case 'description':
                comparison = (a.description || '').localeCompare(b.description || '')
                break
                case 'kilometers':
                comparison = (a.kilometers || 0) - (b.kilometers || 0)
                break
                case 'category':
                comparison = (a.category || '').localeCompare(b.category || '')
                break
                case 'date':
                comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
                break
                case 'amount':
                comparison = (a.amount || 0) - (b.amount || 0)
                break
                default:
                comparison = 0
            }

            return sortOrder === 'asc' ? comparison : -comparison
        })
    }, [expenses, sortBy, sortOrder])

    const handleSort = (field: SortField) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(field)
            setSortOrder('desc')
        }
    }

    const handleDelete = async (expenseId: number) => {
        try {
            await deleteExpense(expenseId)
            setExpenses(prev => prev.filter(e => e.id !== expenseId))
            window.dispatchEvent(new CustomEvent('expense-changed'))
        } catch {
            setError('Hubo un error al eliminar el gasto.')
        }
    }

    const handleUpdate = async (updatedExpense: ExpenseInterface) => {
        try {
            await updateExpense(updatedExpense.id, updatedExpense)
            setExpenses(prev =>
                prev.map(e => (e.id === updatedExpense.id ? updatedExpense : e))
            )
        } catch {
            setError('Hubo un error al guardar los cambios.')
        }
    }

    const totalSpent = expenses.reduce(
        (total, e) => total + (e.amount || 0),
        0
    )

    return {
        expenses,
        sortedExpenses,
        loading,
        error,
        totalSpent,
        sortBy,
        sortOrder,
        handleSort,
        handleDelete,
        handleUpdate,
        setError
    }
}