import { ExpenseInterface } from '@/interfaces'

export interface ExpenseStatsProps {
    total: number
    average: number
    highest: ExpenseInterface | null
    lowest: ExpenseInterface | null
    count: number
    totalKm: number
    costPerKm: number
    monthlyAverage: number
    yearlyTotals: Record<string, number>
    mostExpensiveCategory: [string, number] | null
    highestMonth: [string, number] | null
    frequency: number
}