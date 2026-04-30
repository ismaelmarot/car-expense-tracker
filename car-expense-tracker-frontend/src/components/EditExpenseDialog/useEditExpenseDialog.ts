import { useState, useEffect } from 'react'
import { formatKilometers, formatPrice } from '@/functions'

export const useEditExpenseDialog = (expense: any, onChange: any) => {
    const [priceDisplay, setPriceDisplay] = useState('')
    const [kmDisplay, setKmDisplay] = useState('')

    useEffect(() => {
        if (expense) {
            const priceValue = expense.amount ?? 0
            setPriceDisplay(formatPrice(String(priceValue).replace('.', ',')))
            setKmDisplay(formatKilometers(String(expense.kilometers)))
        }
    }, [expense])

    const handlePriceChange = (value: string) => {
        const cleanValue = value.replace(/[^\d,]/g, '')
        const formatted = formatPrice(cleanValue)

        setPriceDisplay(formatted)

        const rawValue =
            parseFloat(cleanValue.replace(/\./g, '').replace(',', '.')) || 0

        onChange('amount', rawValue)
    }

    const handleKmChange = (value: string) => {
        const cleanValue = value.replace(/[^\d]/g, '')
        const formatted = formatKilometers(cleanValue)

        setKmDisplay(formatted)

        const rawValue = parseInt(cleanValue, 10) || 0
        onChange('kilometers', rawValue)
    }

    return {
        priceDisplay,
        kmDisplay,
        handlePriceChange,
        handleKmChange,
    }
}