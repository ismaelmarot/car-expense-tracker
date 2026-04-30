import { useEffect, useState } from 'react'
import { getCarExpenses } from '@/api'
import { ExpenseInterface } from '@/interfaces'

export const useExpenses = (id?: string) => {
    const [expenses, setExpenses] = useState<ExpenseInterface[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
        try {
            const data = await getCarExpenses(Number(id))
            setExpenses(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
        }

        if (id) fetch()
    }, [id])

    return { expenses, loading }
}