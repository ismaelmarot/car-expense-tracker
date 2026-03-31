import { useMemo } from 'react'

interface UseCarDatesReturn {
    formatDate: (dateStr: string | undefined) => string
    isDateExpired: (dateStr: string | undefined) => boolean
    getNextDueDate: (dateStr: string | undefined) => Date
    formatNextDueDate: (dateStr: string | undefined) => string
    getTimeRemaining: (dateStr: string | undefined) => string
    getNextServiceKm: (lastServiceKm: number | null, serviceIntervalKm: number) => number | null
    getRemainingServiceKm: (lastServiceKm: number | null, serviceIntervalKm: number, currentKm: number) => number | null
    formatKm: (value: string) => string
    getRawKm: (value: string) => string
}

export const useCarDates = (): UseCarDatesReturn => {
    const parseDate = (dateStr: string): Date => {
        if (dateStr.includes('T')) return new Date(dateStr)
        return new Date(dateStr + 'T12:00:00')
    }

    const getNextDueDate = (dateStr: string | undefined): Date => {
        if (!dateStr) return new Date()
        const lastDate = parseDate(dateStr)
        const nextDate = new Date(lastDate)
        nextDate.setFullYear(nextDate.getFullYear() + 1)
        return nextDate
    }

    const formatDate = (dateStr: string | undefined): string => {
        if (!dateStr) return '-'
        const date = parseDate(dateStr)
        return date.toLocaleDateString('es-AR')
    }

    const isDateExpired = (dateStr: string | undefined): boolean => {
        if (!dateStr) return false
        const date = getNextDueDate(dateStr)
        return date < new Date()
    }

    const formatNextDueDate = (dateStr: string | undefined): string => {
        if (!dateStr) return '-'
        const nextDate = getNextDueDate(dateStr)
        return nextDate.toLocaleDateString('es-AR')
    }

    const getTimeRemaining = (dateStr: string | undefined): string => {
        if (!dateStr) return ''
        const targetDate = getNextDueDate(dateStr)
        const today = new Date()
        const diffTime = targetDate.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        
        if (diffDays < 0) {
            return `Vencido hace ${Math.abs(diffDays)} días`
        } else if (diffDays === 0) {
            return 'Vence hoy'
        } else if (diffDays < 30) {
            return `${diffDays} días restantes`
        } else if (diffDays < 365) {
            const months = Math.floor(diffDays / 30)
            return `${months} ${months === 1 ? 'mes' : 'meses'} restantes`
        } else {
            const years = Math.floor(diffDays / 365)
            return `${years} ${years === 1 ? 'año' : 'años'} restantes`
        }
    }

    const getNextServiceKm = (lastServiceKm: number | null, serviceIntervalKm: number): number | null => {
        if (!lastServiceKm || !serviceIntervalKm) return null
        return lastServiceKm + serviceIntervalKm
    }

    const getRemainingServiceKm = (
        lastServiceKm: number | null, 
        serviceIntervalKm: number, 
        currentKm: number
    ): number | null => {
        const nextServiceKm = getNextServiceKm(lastServiceKm, serviceIntervalKm)
        if (!nextServiceKm) return null
        return Math.max(0, nextServiceKm - currentKm)
    }

    const formatKm = (value: string): string => {
        const cleanValue = value.replace(/[^\d]/g, '')
        return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    const getRawKm = (value: string): string => {
        return value.replace(/\./g, '')
    }

    return {
        formatDate,
        isDateExpired,
        getNextDueDate,
        formatNextDueDate,
        getTimeRemaining,
        getNextServiceKm,
        getRemainingServiceKm,
        formatKm,
        getRawKm
    }
}
