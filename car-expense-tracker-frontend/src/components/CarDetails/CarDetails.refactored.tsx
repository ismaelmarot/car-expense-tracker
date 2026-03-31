import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { useLanguage } from '../../contexts/LanguageContext'
import { updateCar, deleteCar } from '../../api/api'
import { CarInterface } from '@/interfaces'
import { BackButton } from '../BackButton/BackButton'
import { AddExpense } from '../AddExpense/AddExpense'
import { CarExpenses } from '../CarExpenses/CarExpenses'
import { ExpenseStats } from '../ExpenseStats/ExpenseStats'
import { Settings } from '../Settings/Settings'
import { DeleteCarConfirmationDialog } from '../DeletCarConfirmationDialog/DeletCarConfirmationDialog'
import { useCarData } from './hooks/useCarData'
import { useCarDates } from './hooks/useCarDates'
import { CarHeader } from './CarHeader/CarHeader'
import { CarInfoCards } from './CarInfoCards/CarInfoCards'
import { CarTabs } from './CarTabs/CarTabs'
import { EditCarDialog } from './EditCarDialog/EditCarDialog'
import { 
    Container, 
    CarInfoCard, 
    CardHeader, 
    CardHeaderCollapsed, 
    CardHeaderInfo, 
    ExpandIcon, 
    CardExpandedContent,
    TabContent
} from './CarDetailsStyles'

export const CarDetails: React.FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { t } = useLanguage()
    const [expanded, setExpanded] = useState(false)
    const [activeTab, setActiveTab] = useState('historial')
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
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
    
    const { car, expenses, loading, error, lastKilometers, setCar, fetchCarData } = useCarData(id)
    const { formatDate, isDateExpired, getTimeRemaining, formatNextDueDate, formatKm, getRemainingServiceKm } = useCarDates()
    
    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth)
        }
        
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    
    useEffect(() => {
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
                service_interval_km: car.service_interval_km?.toString() || '10000',
                vtv_date: car.vtv_date || '',
                extintor_date: car.extintor_date || ''
            })
        }
    }, [car])
    
    const handlePhotoClick = () => {
        document.getElementById('photo-input')?.click()
    }
    
    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && car) {
            const reader = new FileReader()
            reader.onloadend = async () => {
                const photo = reader.result as string
                try {
                    await updateCar(car.id, { ...car, photo })
                    setCar(prev => prev ? { ...prev, photo } : null)
                } catch (err) {
                    console.error('Error updating photo:', err)
                }
            }
            reader.readAsDataURL(file)
        }
    }
    
    const handleEditClick = () => {
        setEditDialogOpen(true)
    }
    
    const handleDeleteClick = () => {
        setDeleteDialogOpen(true)
    }
    
    const handleDeleteConfirm = async () => {
        if (car) {
            try {
                await deleteCar(car.id)
                navigate('/')
            } catch (err) {
                console.error('Error deleting car:', err)
            }
        }
        setDeleteDialogOpen(false)
    }
    
    const handleEditChange = (field: string, value: string) => {
        setEditData(prev => ({ ...prev, [field]: value }))
    }
    
    const handleEditPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    
    const handleSave = async () => {
        if (car) {
            try {
                const updatedCar: CarInterface = {
                    ...car,
                    brand: editData.brand,
                    model: editData.model,
                    year: Number(editData.year) || 0,
                    vin: editData.vin,
                    version: editData.version,
                    photo: editData.photo,
                    kilometers: Number(editData.kilometers) || 0,
                    last_service_km: Number(editData.last_service_km) || 0,
                    service_interval_km: Number(editData.service_interval_km) || 10000,
                    vtv_date: editData.vtv_date,
                    extintor_date: editData.extintor_date
                }
                await updateCar(car.id, updatedCar)
                setCar(updatedCar)
                setEditDialogOpen(false)
            } catch (err) {
                console.error('Error updating car:', err)
            }
        }
    }
    
    const currentKm = lastKilometers || car?.kilometers || 0
    const serviceKmRemaining = car 
        ? getRemainingServiceKm(car.last_service_km || null, car.service_interval_km || 10000, currentKm)
        : null
    
    if (loading) {
        return (
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <span>{t('loading')}...</span>
                </Box>
            </Container>
        )
    }
    
    if (error || !car) {
        return (
            <Container>
                <BackButton />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <span>{error || t('carNotFound')}</span>
                </Box>
            </Container>
        )
    }
    
    return (
        <Container>
            <BackButton />
            
            <CarInfoCard>
                <CardHeader onClick={() => setExpanded(!expanded)}>
                    <CardHeaderCollapsed>
                        <CarHeader 
                            car={car}
                            onPhotoClick={handlePhotoClick}
                            onEditClick={handleEditClick}
                            onDeleteClick={handleDeleteClick}
                        />
                        <ExpandIcon>
                            <span style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                                ▼
                            </span>
                        </ExpandIcon>
                    </CardHeaderCollapsed>
                </CardHeader>
                
                <CardExpandedContent expanded={expanded}>
                    <CarInfoCards 
                        car={car}
                        currentKm={currentKm}
                        serviceKmRemaining={serviceKmRemaining}
                        formatDate={formatDate}
                        isDateExpired={isDateExpired}
                        formatNextDueDate={formatNextDueDate}
                        getTimeRemaining={getTimeRemaining}
                    />
                </CardExpandedContent>
            </CarInfoCard>
            
            <CarTabs 
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
            
            <TabContent>
                {activeTab === 'gasto' && <AddExpense />}
                {activeTab === 'historial' && <CarExpenses />}
                {activeTab === 'grafica' && <ExpenseStats key={`stats-${windowSize}`} />}
                {activeTab === 'reportes' && <Settings />}
            </TabContent>
            
            <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
                id="photo-input"
            />
            
            <EditCarDialog
                open={editDialogOpen}
                editData={editData}
                onChange={handleEditChange}
                onSave={handleSave}
                onClose={() => setEditDialogOpen(false)}
                onPhotoChange={handleEditPhotoChange}
            />
            
            <DeleteCarConfirmationDialog
                open={deleteDialogOpen}
                title={t('deleteCar')}
                description={`${t('deleteCarConfirm')} ${car.brand} ${car.model}?`}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteDialogOpen(false)}
            />
        </Container>
    )
}
