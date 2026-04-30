import { ExpenseFormField } from '@/types'

export interface ExpenseFormFieldsProps {
    expense: any
    priceDisplay: string
    kmDisplay: string
    onChange: (field: ExpenseFormField, value: any) => void
    handlePriceChange: (value: string) => void
    handleKmChange: (value: string) => void
}