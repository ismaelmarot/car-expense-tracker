import { useMemo } from 'react'
import { ExpenseInterface } from '@/interfaces'
import { formatCategory } from '@/functions'

export const useExpenseStats = (expenses: ExpenseInterface[]) => {
    return useMemo(() => {
        if (expenses.length === 0) return null

        const total = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0)

        const sortedByPrice = [...expenses].sort(
            (a, b) => (b.amount || 0) - (a.amount || 0)
        )

        const highest = sortedByPrice[0]
        const lowest = sortedByPrice[sortedByPrice.length - 1]
        const average = total / expenses.length

        const totalKm = expenses.reduce(
            (max, exp) => Math.max(max, exp.kilometers || 0),
            0
        )

        const costPerKm = totalKm > 0 ? total / totalKm : 0

        const dates = expenses.map(exp => new Date(exp.date))

        const minDate = new Date(Math.min(...dates.map(d => d.getTime())))
        const maxDate = new Date(Math.max(...dates.map(d => d.getTime())))

        const monthsDiff =
        (maxDate.getFullYear() - minDate.getFullYear()) * 12 +
        (maxDate.getMonth() - minDate.getMonth()) +
        1

        const monthlyAverage = monthsDiff > 0 ? total / monthsDiff : total

        const yearlyTotals: Record<string, number> = {}

        expenses.forEach(exp => {
            const year = new Date(exp.date).getFullYear().toString()
            yearlyTotals[year] = (yearlyTotals[year] || 0) + (exp.amount || 0)
        })

        const categoryTotals: Record<string, number> = {}

        expenses.forEach(exp => {
            const cat = formatCategory(exp.category)
            categoryTotals[cat] = (categoryTotals[cat] || 0) + (exp.amount || 0)
        })

        const mostExpensiveCategory = Object.entries(categoryTotals)
            .sort((a, b) => b[1] - a[1])[0]

        const monthlyTotals: Record<string, number> = {}

        expenses.forEach(exp => {
            const date = new Date(exp.date)
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
            monthlyTotals[key] = (monthlyTotals[key] || 0) + (exp.amount || 0)
        })

        const highestMonth = Object.entries(monthlyTotals)
            .sort((a, b) => b[1] - a[1])[0]

        const sortedDates = [...dates].sort((a, b) => a.getTime() - b.getTime())

        let totalDays = 0
        for (let i = 1; i < sortedDates.length; i++) {
            totalDays +=
                Math.abs(
                    sortedDates[i].getTime() - sortedDates[i - 1].getTime()
                ) /
                (1000 * 60 * 60 * 24)
        }

        const frequency =
            sortedDates.length > 1
                ? totalDays / (sortedDates.length - 1)
                : 0

        return {
            total,
            average,
            highest,
            lowest,
            count: expenses.length,
            totalKm,
            costPerKm,
            monthlyAverage,
            yearlyTotals,
            mostExpensiveCategory,
            highestMonth,
            frequency
        }
    }, [expenses])
}