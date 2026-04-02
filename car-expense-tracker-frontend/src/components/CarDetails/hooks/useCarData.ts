import { useState, useEffect, useCallback } from 'react'
import { getCarById, getCarExpenses } from '../../../api/api'
import { CarInterface, ExpenseInterface } from '@/interfaces'

interface UseCarDataReturn {
    car: CarInterface | null
    expenses: ExpenseInterface[]
    loading: boolean
    error: string
    lastKilometers: number | null
    fetchCarData: () => Promise<void>
    setCar: React.Dispatch<React.SetStateAction<CarInterface | null>>
}

export const useCarData = (id: string | undefined): UseCarDataReturn => {
    const [car, setCar] = useState<CarInterface | null>(null)
    const [expenses, setExpenses] = useState<ExpenseInterface[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [lastKilometers, setLastKilometers] = useState<number | null>(null)

    const fetchCarData = useCallback(async () => {
        if (!id) return
        
        setLoading(true)
        setError('')
        
        try {
            const [carResponse, expensesResponse] = await Promise.all([
                getCarById(Number(id)),
                getCarExpenses(Number(id))
            ])
            
            setCar(carResponse.data)
            
            const expensesData = expensesResponse
            setExpenses(expensesData)
            
            // Find the max km from expenses
            const maxExpenseKm = expensesData.reduce((max: number, exp: any) => Math.max(max, exp.kilometers || 0), 0)
            setLastKilometers(maxExpenseKm)
        } catch (err) {
            console.error("Error fetching car details:", err)
            setError("Error al cargar los datos del vehículo")
        } finally {
            setLoading(false)
        }
    }, [id])

    useEffect(() => {
        fetchCarData()
    }, [fetchCarData])

    return {
        car,
        expenses,
        loading,
        error,
        lastKilometers,
        fetchCarData,
        setCar
    }
}
