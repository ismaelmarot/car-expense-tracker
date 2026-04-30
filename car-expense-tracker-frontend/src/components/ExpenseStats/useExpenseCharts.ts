import { useMemo } from 'react'
import { ExpenseInterface } from '@/interfaces'

const formatMonth = (date: Date): string => {
    return date.toLocaleDateString('es-ES', {
        month: 'short',
        year: '2-digit'
    })
}

export const useExpenseCharts = (
    expenses: ExpenseInterface[],
    t: (key: string) => string
    ) => {
    const trendData = useMemo(() => {
        if (expenses.length === 0) return null

        const monthlyTotals: Record<string, number> = {}

        expenses.forEach(exp => {
        const date = new Date(exp.date)
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        monthlyTotals[key] = (monthlyTotals[key] || 0) + (exp.amount || 0)
        })

        const sortedMonths = Object.keys(monthlyTotals).sort()

        return {
        labels: sortedMonths.map(key => {
            const [y, m] = key.split('-')
            return formatMonth(new Date(Number(y), Number(m) - 1))
        }),
        datasets: [{
            label: t('expenses'),
            data: sortedMonths.map(k => monthlyTotals[k]),
            borderColor: '#0071e3',
            backgroundColor: 'rgba(0,113,227,0.1)',
            fill: true,
            tension: 0.4
        }]
        }
    }, [expenses, t])

    return { trendData }
}