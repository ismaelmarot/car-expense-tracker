import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLanguage } from '@/contexts'
import { api } from '@/api'
import { CATEGORIES } from '@/constants'

export const useReports = () => {
    const { id } = useParams()
    const { language } = useLanguage()

    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [format, setFormat] = useState<'pdf' | 'csv'>('pdf')
    const [loading, setLoading] = useState(false)

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
        prev.includes(category)
            ? prev.filter(c => c !== category)
            : [...prev, category]
        )
    }

    const selectAllCategories = () => {
        setSelectedCategories(CATEGORIES.map(c => c.key))
    }

    const clearAllCategories = () => {
        setSelectedCategories([])
    }

    const handleDownload = async () => {
        setLoading(true)
        try {
        const endpoint = format === 'pdf' ? '/reports/pdf' : '/reports/csv'

        const response = await api.get(endpoint, {
            params: {
            carId: id || '',
            dateFrom,
            dateTo,
            categories: selectedCategories.join(','),
            language
            },
            responseType: 'blob'
        })

        const blob = response.data
        if (blob.size === 0) throw new Error('Empty report received')

        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `report_${dateFrom}_${dateTo}.${format}`
        a.click()
        window.URL.revokeObjectURL(url)
        } finally {
        setLoading(false)
        }
    }

    return {
        dateFrom,
        dateTo,
        setDateFrom,
        setDateTo,
        selectedCategories,
        toggleCategory,
        selectAllCategories,
        clearAllCategories,
        format,
        setFormat,
        loading,
        handleDownload
    }
}