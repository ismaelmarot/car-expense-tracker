import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { addCar } from '@/api'
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
  Form, 
  InputGroup, 
  InputLabel, 
  Input, 
  SubmitButton,
  OptionalLabel,
  HiddenInput
} from './AddCarStyles'

const AddCar: React.FC = () => {
    const navigate = useNavigate()
    const fileInputRef = useRef<HTMLInputElement>(null)
    
    const [carData, setCarData] = useState({
        brand: '',
        model: '',
        year: '',
        vin: '',
        version: ''
    })
    
    const [photo, setPhoto] = useState<string | null>(null)

    useEffect(() => {
        console.log('Photo state changed:', photo ? 'HAS PHOTO' : 'NO PHOTO')
    }, [photo])

    console.log('AddCar render, photo:', photo ? 'HAS PHOTO' : 'NO PHOTO')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCarData({
            ...carData,
            [name]: name === 'vin' ? value.toUpperCase() : value
        })
    }

    const handlePhotoClick = () => {
        fileInputRef.current?.click()
    }

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            console.log('File selected:', file.name, file.size)
            const reader = new FileReader()
            reader.onerror = (error) => {
                console.error('FileReader error:', error)
            }
            reader.onloadend = () => {
                const result = reader.result as string
                console.log('Photo set:', result.substring(0, 100) + '...')
                setPhoto(result)
            };
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const car = {
            ...carData,
            year: Number(carData.year),
            photo: photo || undefined
        }
        console.log('Submitting car:', car, 'Photo state:', photo)

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
                    <PageTitle>Agregar Vehículo</PageTitle>
                    <PageSubtitle>Ingresá los datos de tu nuevo vehículo</PageSubtitle>
                </HeaderLeft>
                <HeaderRight>
                    <BackButton onClick={() => navigate('/')}>
                        ← Volver
                    </BackButton>
                </HeaderRight>
            </Header>

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
                        <span style={{ fontSize: '2rem', color: '#aeaeb2' }}>📷</span>
                    </PhotoContainer>
                )}
                <PhotoLabel>Agregar foto del vehículo</PhotoLabel>
                <HiddenInput
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    onChange={handlePhotoChange}
                />
            </PhotoSection>

            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <InputLabel>Marca</InputLabel>
                    <Input
                        placeholder="Ej: Toyota"
                        name='brand'
                        value={carData.brand}
                        onChange={handleInputChange}
                        required
                    />
                </InputGroup>

                <InputGroup>
                    <InputLabel>Modelo</InputLabel>
                    <Input
                        placeholder="Ej: Corolla"
                        name='model'
                        value={carData.model}
                        onChange={handleInputChange}
                        required
                    />
                </InputGroup>

                <InputGroup>
                    <InputLabel>
                        Versión<OptionalLabel>(opcional)</OptionalLabel>
                    </InputLabel>
                    <Input
                        placeholder="Ej: SE-G"
                        name='version'
                        value={carData.version}
                        onChange={handleInputChange}
                    />
                </InputGroup>

                <InputGroup>
                    <InputLabel>Año</InputLabel>
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

                <InputGroup>
                    <InputLabel>Patente</InputLabel>
                    <Input
                        placeholder="Ej: ABC123"
                        name='vin'
                        value={carData.vin}
                        onChange={handleInputChange}
                        required
                    />
                </InputGroup>

                <SubmitButton type='submit'>
                    Agregar Vehículo
                </SubmitButton>
            </Form>
        </Container>
    );
}

export default AddCar