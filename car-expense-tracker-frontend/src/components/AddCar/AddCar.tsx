import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { useAddCar } from './useAddCar'
import { useLanguage } from '../../contexts/LanguageContext'
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

export const AddCar: React.FC = () => {
    const navigate = useNavigate()
    const { t } = useLanguage()

    const {
        carData,
        photo,
        showAdditionalInfo,
        setShowAdditionalInfo,
        fileInputRef,
        handleInputChange,
        handlePhotoClick,
        handlePhotoChange,
        handleSubmit
    } = useAddCar()

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
                {/* FOTO */}
                <PhotoSection>
                    {photo ? (
                        <PhotoPreview
                            style={{ backgroundImage: `url(${photo})` }}
                            onClick={handlePhotoClick}
                        >
                            <PhotoOverlay>
                                <span style={{ color: 'white', fontSize: '0.875rem' }}>
                                    Cambiar
                                </span>
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

                {/* FORM */}
                <Form onSubmit={handleSubmit}>
                    <FormRow>
                        <InputGroup>
                            <InputLabel>{t('brand')}</InputLabel>
                            <Input
                                name='brand'
                                value={carData.brand}
                                onChange={handleInputChange}
                                required
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputLabel>{t('model')}</InputLabel>
                            <Input
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
                                {t('version')} <OptionalLabel>{t('optional')}</OptionalLabel>
                            </InputLabel>
                            <Input
                                name='version'
                                value={carData.version}
                                onChange={handleInputChange}
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputLabel>{t('year')}</InputLabel>
                            <Input
                                name='year'
                                value={carData.year}
                                onChange={handleInputChange}
                                required
                            />
                        </InputGroup>
                    </FormRow>

                    <FormRow>
                        <InputGroup>
                            <InputLabel>{t('licensePlate')}</InputLabel>
                            <Input
                                name='vin'
                                value={carData.vin}
                                onChange={handleInputChange}
                                required
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputLabel>{t('kilometers')}</InputLabel>
                            <Input
                                name='kilometers'
                                value={carData.kilometers}
                                onChange={handleInputChange}
                            />
                        </InputGroup>
                    </FormRow>

                    <Box sx={{ borderTop: '1px solid #e5e5ea', mt: 1 }} />

                    {/* TOGGLE INFO */}
                    <Box
                        onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            py: 1
                        }}
                    >
                        <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                            <BuildIcon sx={{ fontSize: 18 }} />
                            <span>{t('additionalInfo')}</span>
                        </Box>

                        <ExpandMoreIcon
                            sx={{
                                transform: showAdditionalInfo ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: '0.2s'
                            }}
                        />
                    </Box>

                    {/* INFO EXTRA */}
                    {showAdditionalInfo && (
                        <>
                            <FormRow>
                                <InputGroup>
                                    <InputLabel>{t('lastServiceKm')}</InputLabel>
                                    <Input
                                        name='last_service_km'
                                        value={carData.last_service_km}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <InputLabel>{t('serviceEveryKm')}</InputLabel>
                                    <Input
                                        name='service_interval_km'
                                        value={carData.service_interval_km}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </FormRow>

                            <FormRow>
                                <InputGroup>
                                    <InputLabel>{t('vtvDate')}</InputLabel>
                                    <Input
                                        type='date'
                                        name='vtv_date'
                                        value={carData.vtv_date}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <InputLabel>{t('extinguisherDate')}</InputLabel>
                                    <Input
                                        type='date'
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