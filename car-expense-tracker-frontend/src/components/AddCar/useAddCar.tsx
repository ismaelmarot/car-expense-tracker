import { useState, useRef } from 'react'
import { addCar } from '@/api'
import { useNavigate } from 'react-router-dom'

export const useAddCar = () => {
    const navigate = useNavigate()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [carData, setCarData] = useState({
        brand: '',
        model: '',
        year: '',
        vin: '',
        version: '',
        kilometers: '',
        last_service_km: '',
        service_interval_km: '',
        vtv_date: '',
        extintor_date: ''
    })

    const [photo, setPhoto] = useState<string | null>(null)
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)

    const formatKm = (value: string): string => {
        const cleanValue = value.replace(/[^\d]/g, '')
        return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if (name === 'kilometers' || name === 'last_service_km' || name === 'service_interval_km') {
            setCarData(prev => ({
                ...prev,
                [name]: formatKm(value)
            }))
        } else {
            setCarData(prev => ({
                ...prev,
                [name]: name === 'vin' ? value.toUpperCase() : value
            }))
        }
    }

    const handlePhotoClick = () => {
        fileInputRef.current?.click()
    }

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setPhoto(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const car = {
            brand: carData.brand,
            model: carData.model,
            year: Number(carData.year),
            vin: carData.vin,
            version: carData.version || undefined,
            photo: photo || undefined,
            kilometers: carData.kilometers
                ? Number(carData.kilometers.replace(/\./g, '').replace(/,/g, ''))
                : undefined,
            last_service_km: carData.last_service_km
                ? Number(carData.last_service_km.replace(/\./g, '').replace(/,/g, ''))
                : undefined,
            service_interval_km: carData.service_interval_km
                ? Number(carData.service_interval_km.replace(/\./g, '').replace(/,/g, ''))
                : undefined,
            vtv_date: carData.vtv_date || undefined,
            extintor_date: carData.extintor_date || undefined
        }

        try {
            await addCar(car)
            navigate('/')
        } catch (error) {
            console.log('Error adding car:', error)
        }
    }

    return {
        carData,
        setCarData,
        photo,
        showAdditionalInfo,
        setShowAdditionalInfo,
        fileInputRef,
        handleInputChange,
        handlePhotoClick,
        handlePhotoChange,
        handleSubmit
    }
}
