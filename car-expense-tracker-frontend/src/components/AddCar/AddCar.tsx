import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { addCar } from '@/api'
import { Box } from '@mui/material'
import { 
  Container, 
  Header, 
  HeaderLeft,
  HeaderRight,
  BackButton, 
  PageTitle, 
  PageSubtitle,
  PhotoSection,
  PhotoContainer,
  PhotoPreview,
  PhotoOverlay,
  PhotoLabel,
  PhotoIcon,
  Form, 
  FormRow,
  InputGroup, 
  InputLabel, 
  Input, 
  SubmitButton,
  OptionalLabel,
  HiddenInput,
  AddCarForm
} from './AddCarStyles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import BuildIcon from '@mui/icons-material/Build'
import { useLanguage } from '../../contexts/LanguageContext'

export const AddCar: React.FC = () => {
    const navigate = useNavigate()
    const { t } = useLanguage()
    const fileInputRef = useRef<HTMLInputElement>(null)
    
    const [carData, setCarData] = useState({
        brand: '',
        model: '',
        year: '',
        vin: '',
        version: '',
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
        if (name === 'last_service_km' || name === 'service_interval_km') {
            setCarData({
                ...carData,
                [name]: formatKm(value)
            })
        } else {
            setCarData({
                ...carData,
                [name]: name === 'vin' ? value.toUpperCase() : value
            })
        }
    }

    const handlePhotoClick = () => {
        fileInputRef.current?.click()
    }

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const result = reader.result as string
                setPhoto(result)
            };
            reader.readAsDataURL(file)
        }
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
            last_service_km: carData.last_service_km ? Number(carData.last_service_km.replace(/\./g, '').replace(/,/g, '')) : undefined,
            service_interval_km: carData.service_interval_km ? Number(carData.service_interval_km.replace(/\./g, '').replace(/,/g, '')) : undefined,
            vtv_date: carData.vtv_date || undefined,
            extintor_date: carData.extintor_date || undefined
        }

        console.log('=== SENDING CAR DATA ===');
        console.log('last_service_km:', car.last_service_km);
        console.log('service_interval_km:', car.service_interval_km);
        console.log('vtv_date:', car.vtv_date);
        console.log('extintor_date:', car.extintor_date);

        try {
            const response = await addCar(car)
            console.log('Car added: ', response.data)
            navigate('/')
        } catch (error) {
            console.log('Error adding car: ', error)
        }
    }

    return (
        <Container>
            <Header>
                <HeaderLeft>
                    <PageTitle>{t('addVehicle')}</PageTitle>
                    <PageSubtitle>{t('enterVehicleData')}</PageSubtitle>
                </HeaderLeft>
                <HeaderRight>
                    <BackButton onClick={() => navigate('/')}>
                        {t('back')}
                    </BackButton>
                </HeaderRight>
            </Header>

            <AddCarForm>
                <PhotoSection>
                    {photo ? (
                        <PhotoPreview 
                            style={{ backgroundImage: `url(${photo})` }}
                            onClick={handlePhotoClick}
                        >
                            <PhotoOverlay className='photo-overlay'>
                                <span style={{ color: 'white', fontSize: '0.875rem' }}>Cambiar</span>
                            </PhotoOverlay>
                        </PhotoPreview>
                    ) : (
                        <PhotoContainer onClick={handlePhotoClick}>
                            <PhotoIcon>
                                <span style={{ fontSize: '1.5rem' }}>+</span>
                                <span style={{ fontSize: '0.75rem' }}>{t('addPhoto')}</span>
                            </PhotoIcon>
                        </PhotoContainer>
                    )}
                    <PhotoLabel>
                        {photo ? t('tapToChangePhoto') : t('optionalPhoto')}
                    </PhotoLabel>
                    <HiddenInput
                        ref={fileInputRef}
                        type='file'
                        accept='image/*'
                        onChange={handlePhotoChange}
                    />
                </PhotoSection>

                <Form onSubmit={handleSubmit}>
                    <FormRow>
                        <InputGroup>
                            <InputLabel>{t('brand')}</InputLabel>
                            <Input
                                placeholder="Ej: Toyota"
                                name='brand'
                                value={carData.brand}
                                onChange={handleInputChange}
                                required
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputLabel>{t('model')}</InputLabel>
                            <Input
                                placeholder="Ej: Corolla"
                                name='model'
                                value={carData.model}
                                onChange={handleInputChange}
                                required
                            />
                        </InputGroup>
                    </FormRow>

                    <FormRow>
                        <InputGroup>
                            <InputLabel>
                                {t('version')}<OptionalLabel>{t('optional')}</OptionalLabel>
                            </InputLabel>
                            <Input
                                placeholder="Ej: SE-G"
                                name='version'
                                value={carData.version}
                                onChange={handleInputChange}
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputLabel>{t('year')}</InputLabel>
                            <Input
                                placeholder="Ej: 2023"
                                name='year'
                                value={carData.year}
                                onChange={handleInputChange}
                                maxLength={4}
                                pattern='[0-9]{4}'
                                inputMode='numeric'
                                required
                            />
                        </InputGroup>
                    </FormRow>

                    <FormRow>
                        <InputGroup>
                            <InputLabel>{t('licensePlate')}</InputLabel>
                            <Input
                                placeholder="Ej: ABC123"
                                name='vin'
                                value={carData.vin}
                                onChange={handleInputChange}
                                required
                            />
                        </InputGroup>
                        <Box />
                    </FormRow>

                    <Box sx={{ borderTop: '1px solid #e5e5ea', mt: 1 }} />

                    <Box 
                        onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            py: 1
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <BuildIcon sx={{ fontSize: 18, color: '#86868b' }} />
                            <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#86868b' }}>
                                {t('additionalInfo')}
                            </span>
                        </Box>
                        <ExpandMoreIcon 
                            sx={{ 
                                fontSize: 20, 
                                color: '#86868b',
                                transform: showAdditionalInfo ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s ease'
                            }} 
                        />
                    </Box>

                    {showAdditionalInfo && (
                        <>
                            <FormRow>
                                <InputGroup>
                                    <InputLabel>
                                        {t('lastServiceKm')}<OptionalLabel>({t('optional')})</OptionalLabel>
                                    </InputLabel>
                                    <Input
                                        placeholder="Ej: 50.000"
                                        name='last_service_km'
                                        value={carData.last_service_km}
                                        onChange={handleInputChange}
                                        type="text"
                                        inputMode="numeric"
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <InputLabel>
                                        {t('serviceEveryKm')}<OptionalLabel>({t('optional')})</OptionalLabel>
                                    </InputLabel>
                                    <Input
                                        placeholder="Ej: 10.000"
                                        name='service_interval_km'
                                        value={carData.service_interval_km}
                                        onChange={handleInputChange}
                                        type="text"
                                        inputMode="numeric"
                                    />
                                </InputGroup>
                            </FormRow>

                            <FormRow>
                                <InputGroup>
                                    <InputLabel>
                                        {t('vtvDate')}<OptionalLabel>({t('optional')})</OptionalLabel>
                                    </InputLabel>
                                    <Input
                                        type="date"
                                        name='vtv_date'
                                        value={carData.vtv_date}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <InputLabel>
                                        {t('extinguisherDate')}<OptionalLabel>({t('optional')})</OptionalLabel>
                                    </InputLabel>
                                    <Input
                                        type="date"
                                        name='extintor_date'
                                        value={carData.extintor_date}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </FormRow>
                        </>
                    )}

                    <SubmitButton type='submit'>
                        {t('addVehicle')}
                    </SubmitButton>
                </Form>
            </AddCarForm>
        </Container>
    )
}