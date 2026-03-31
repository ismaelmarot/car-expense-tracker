import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateCar, deleteCar } from '../../../api/api'
import { CarInterface } from '@/interfaces'

export const useCarActions = (car: CarInterface | null, setCar: (car: CarInterface | null) => void) => {
    const navigate = useNavigate()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const editFileInputRef = useRef<HTMLInputElement>(null)
    
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
    const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false)
    const [editData, setEditData] = useState({
        brand: '',
        model: '',
        year: '',
        vin: '',
        version: '',
        photo: '',
        kilometers: '',
        last_service_km: '',
        service_interval_km: '',
        vtv_date: '',
        extintor_date: ''
    })

    const handlePhotoClick = () => {
        fileInputRef.current?.click()
    }

    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && car) {
            const reader = new FileReader()
            reader.onloadend = async () => {
                const photo = reader.result as string
                try {
                    await updateCar(car.id, { ...car, photo })
                    setCar({ ...car, photo })
                } catch (error) {
                    console.error("Error updating photo: ", error)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true)
    }

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false)
    }

    const handleDeleteConfirm = async (id: string | undefined) => {
        if (id) {
            try {
                await deleteCar(Number(id))
                navigate('/')
            } catch (error) {
                console.error("Error deleting car: ", error)
            }
        }
        setDeleteDialogOpen(false)
    }

    const openEditDialog = () => {
        if (car) {
            setEditData({
                brand: car.brand || '',
                model: car.model || '',
                year: car.year?.toString() || '',
                vin: car.vin || '',
                version: car.version || '',
                photo: car.photo || '',
                kilometers: car.kilometers?.toString() || '',
                last_service_km: car.last_service_km?.toString() || '',
                service_interval_km: car.service_interval_km?.toString() || '',
                vtv_date: car.vtv_date || '',
                extintor_date: car.extintor_date || ''
            })
            setEditDialogOpen(true)
        }
    }

    const closeEditDialog = () => {
        setEditDialogOpen(false)
    }

    const handleEditChange = (field: string, value: string) => {
        setEditData(prev => ({ ...prev, [field]: value }))
    }

    const handleSaveEdit = async () => {
        if (car) {
            try {
                await updateCar(car.id, {
                    ...car,
                    brand: editData.brand,
                    model: editData.model,
                    year: Number(editData.year) || 0,
                    vin: editData.vin,
                    version: editData.version,
                    kilometers: Number(editData.kilometers) || 0,
                    last_service_km: Number(editData.last_service_km) || 0,
                    service_interval_km: Number(editData.service_interval_km) || 10000,
                    vtv_date: editData.vtv_date || undefined,
                    extintor_date: editData.extintor_date || undefined
                })
                setCar({
                    ...car,
                    brand: editData.brand,
                    model: editData.model,
                    year: Number(editData.year) || 0,
                    vin: editData.vin,
                    version: editData.version,
                    kilometers: Number(editData.kilometers) || 0,
                    last_service_km: Number(editData.last_service_km) || 0,
                    service_interval_km: Number(editData.service_interval_km) || 10000,
                    vtv_date: editData.vtv_date || undefined,
                    extintor_date: editData.extintor_date || undefined
                })
                closeEditDialog()
            } catch (error) {
                console.error("Error updating car: ", error)
            }
        }
    }

    const handleEditPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const photo = reader.result as string
                setEditData(prev => ({ ...prev, photo }))
            }
            reader.readAsDataURL(file)
        }
    }

    return {
        fileInputRef,
        editFileInputRef,
        deleteDialogOpen,
        editDialogOpen,
        editData,
        handlePhotoClick,
        handlePhotoChange,
        handleDeleteClick,
        handleDeleteCancel,
        handleDeleteConfirm,
        openEditDialog,
        closeEditDialog,
        handleEditChange,
        handleSaveEdit,
        handleEditPhotoChange
    }
}
