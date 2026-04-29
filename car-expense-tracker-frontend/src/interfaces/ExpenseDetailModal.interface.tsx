import { ExpenseInterface } from '@/interfaces'

export interface ExpenseDetailModalProps {
    open: boolean
    expense: ExpenseInterface | null
    onClose: () => void
    onEdit: (expense: ExpenseInterface) => void
    onDelete: () => void
    onOpenPhoto: (photos: string[], index: number) => void
    t: (key: string) => string
}