import React, { useState, useRef } from 'react'
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

export const AddCar: React.FC = () => {
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
            ...carData,
            year: Number(carData.year),
            photo: photo || undefined
        }

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
                                <span style={{ fontSize: '0.75rem' }}>Agregar foto</span>
                            </PhotoIcon>
                        </PhotoContainer>
                    )}
                    <PhotoLabel>
                        {photo ? 'Toca para cambiar la foto' : 'Opcional: agrega una foto de tu vehículo'}
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
                    </FormRow>

                    <FormRow>
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
                    </FormRow>

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
            </AddCarForm>
        </Container>
    )
}