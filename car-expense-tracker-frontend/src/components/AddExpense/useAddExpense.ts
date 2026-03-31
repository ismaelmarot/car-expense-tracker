import { useState, useEffect, useRef } from 'react'
import { addExpense } from '@/api'
import { useParams } from 'react-router-dom'

export const useAddExpense = () => {
    const { id } = useParams()

    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [kilometers, setKilometers] = useState('')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState<string>('')
    const [photos, setPhotos] = useState<string[]>([])
    const [error, setError] = useState<string>('')

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0]
        setDate(currentDate)
    }, [])

    const formatPrice = (value: string): string => {
        const cleanValue = value.replace(/[^\d,]/g, '')
        const parts = cleanValue.split(',')
        const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        return parts.length > 1
            ? `${integerPart},${parts[1].slice(0, 2)}`
            : integerPart
    }

    const formatKilometers = (value: string): string => {
        const cleanValue = value.replace(/[^\d]/g, '')
        return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    const handlePriceChange = (value: string) => {
        setPrice(formatPrice(value))
    }

    const handleKilometersChange = (value: string) => {
        setKilometers(formatKilometers(value))
    }

    const getRawPrice = (): number => {
        return parseFloat(price.replace(/\./g, '').replace(',', '.')) || 0
    }

    const getRawKilometers = (): number => {
        return parseInt(kilometers.replace(/\./g, ''), 10) || 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!description || !price || !kilometers || !category) {
            setError("Todos los campos son obligatorios.")
            return
        }

        const parsedPrice = getRawPrice()
        const parsedKilometers = getRawKilometers()

        if (isNaN(parsedPrice) || isNaN(parsedKilometers)) {
            setError("El precio y el kilometraje deben ser números.")
            return
        }

        setError('')

        try {
            await addExpense({
                car_id: Number(id),
                description,
                price: parsedPrice,
                kilometers: parsedKilometers,
                category,
                date,
                photos: photos.length ? photos : undefined
            })

            // reset
            setDescription('')
            setPrice('')
            setKilometers('')
            setCategory('')
            setPhotos([])

            const currentDate = new Date().toISOString().split('T')[0]
            setDate(currentDate)

            setSnackbarMessage("Gasto agregado correctamente.")
            setSnackbarSeverity('success')
            setSnackbarOpen(true)

        } catch {
            setSnackbarMessage("Hubo un error al agregar el gasto.")
            setSnackbarSeverity('error')
            setSnackbarOpen(true)
        }
    }

    const handlePhotoClick = () => {
        fileInputRef.current?.click()
    }

    const handlePhotoChange = (files: FileList | null) => {
        if (!files) return

        const remainingSlots = 3 - photos.length
        if (remainingSlots <= 0) return

        Array.from(files)
            .slice(0, remainingSlots)
            .forEach(file => {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setPhotos(prev => [...prev, reader.result as string])
                }
                reader.readAsDataURL(file)
            })
    }

    const removePhoto = (index: number) => {
        setPhotos(prev => prev.filter((_, i) => i !== index))
    }

    const closeSnackbar = () => setSnackbarOpen(false)

    return {
        // state
        description, price, kilometers, category, date, photos, error,
        snackbarOpen, snackbarMessage, snackbarSeverity,
        fileInputRef,

        // setters
        setDescription,
        setCategory,
        setDate,

        // handlers
        handleSubmit,
        handlePriceChange,
        handleKilometersChange,
        handlePhotoClick,
        handlePhotoChange,
        removePhoto,
        closeSnackbar
    }
}