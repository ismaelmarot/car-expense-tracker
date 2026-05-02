import { ExpenseInterface } from '@/interfaces'
import { SortField } from '@/types'

export interface ExpenseListProps {
    expenses: ExpenseInterface[]
    sortBy: SortField
    sortOrder: 'asc' | 'desc'
    onSort: (field: SortField) => void
    onItemClick: (expense: ExpenseInterface) => void
}