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
            tension: 0.4,
            pointBackgroundColor: '#0071e3',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2
        }]
        }
    }, [expenses, t])

    const categoryData = useMemo(() => {
        if (expenses.length === 0) return null

        const categoryTotals: Record<string, number> = {}
        expenses.forEach(exp => {
            const cat = exp.category || 'other'
            categoryTotals[cat] = (categoryTotals[cat] || 0) + (exp.amount || 0)
        })

        const categories = Object.keys(categoryTotals)
        const colors = ['#0071e3', '#34c759', '#ff9500', '#ff3b30', '#af52de', '#5ac8fa', '#ff6b6b', '#5856d6']

        return {
            labels: categories.map(cat => t(cat)),
            datasets: [{
                label: t('expensesByCategory'),
                data: categories.map(cat => categoryTotals[cat]),
                backgroundColor: categories.map((_, i) => colors[i % colors.length]),
                borderColor: categories.map((_, i) => colors[i % colors.length]),
                borderWidth: 1
            }]
        }
    }, [expenses, t])

    const monthlyDistributionData = useMemo(() => {
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
                return new Date(Number(y), Number(m) - 1).toLocaleDateString('es-ES', {
                    month: 'short',
                    year: '2-digit'
                })
            }),
            datasets: [{
                label: t('monthlyDistribution'),
                data: sortedMonths.map(k => monthlyTotals[k]),
                backgroundColor: '#0071e3',
                borderRadius: { topLeft: 6, topRight: 6, bottomLeft: 0, bottomRight: 0 },
                borderSkipped: 'bottom' as const,
                barThickness: 24,
                maxBarThickness: 32
            }]
        }
    }, [expenses, t])

    const weeklyComparisonData = useMemo(() => {
        if (expenses.length === 0) return null

        const weeklyTotals: Record<string, number> = {}
        expenses.forEach(exp => {
            const date = new Date(exp.date)
            const weekKey = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`
            weeklyTotals[weekKey] = (weeklyTotals[weekKey] || 0) + (exp.amount || 0)
        })

        const sortedWeeks = Object.keys(weeklyTotals).sort()
        const last8Weeks = sortedWeeks.slice(-8)

        return {
            labels: last8Weeks.map(week => {
                const [year, weekNum] = week.split('-W')
                return `Sem ${weekNum} '${year.slice(2)}`
            }),
            datasets: [{
                label: t('expenses'),
                data: last8Weeks.map(week => weeklyTotals[week]),
                backgroundColor: '#34c759',
                borderRadius: { topLeft: 6, topRight: 6, bottomLeft: 0, bottomRight: 0 },
                borderSkipped: 'bottom' as const,
                barThickness: 20,
                maxBarThickness: 28
            }]
        }
    }, [expenses, t])

    const topExpenses = useMemo(() => {
        if (expenses.length === 0) return null

        const sorted = [...expenses]
            .sort((a, b) => (b.amount || 0) - (a.amount || 0))
            .slice(0, 5)

        return {
            labels: sorted.map(exp => {
                const desc = exp.description?.length > 15
                    ? exp.description.substring(0, 15) + '...'
                    : exp.description || t('unnamed')
                return desc
            }),
            datasets: [{
                label: t('amount'),
                data: sorted.map(exp => exp.amount || 0),
                backgroundColor: '#ff9500',
                borderRadius: { topRight: 6, bottomRight: 6, topLeft: 0, bottomLeft: 0 },
                borderSkipped: 'start' as const,
                barThickness: 20,
                maxBarThickness: 28
            }]
        }
    }, [expenses, t])

    return { trendData, categoryData, monthlyDistributionData, weeklyComparisonData, topExpenses }
}