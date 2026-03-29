import React from 'react'
import { MenuItem, Box, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import CloseIcon from '@mui/icons-material/Close'
import SnackbarNotification from '../SnackbarNotification/SnackbarNotification'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAddExpense } from './useAddExpense'

import {
  Container,
  FormHeader,
  FormTitle,
  FormSubtitle,
  Form,
  FormRow,
  InputGroup,
  InputLabel,
  Input,
  SelectInput,
  SubmitButton,
  ErrorMessage
} from './AddExpenseStyles'

export const AddExpense: React.FC = () => {
    const { t } = useLanguage()

    const {
        description, price, kilometers, category, date, photos, error,
        snackbarOpen, snackbarMessage, snackbarSeverity,
        fileInputRef,

        setDescription,
        setCategory,
        setDate,

        handleSubmit,
        handlePriceChange,
        handleKilometersChange,
        handlePhotoClick,
        handlePhotoChange,
        removePhoto,
        closeSnackbar
    } = useAddExpense()

    return (
        <Container>
            <FormHeader>
                <FormTitle>{t('addExpense')}</FormTitle>
                <FormSubtitle>{t('addExpenseSubtitle')}</FormSubtitle>
            </FormHeader>

            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <InputLabel>{t('description')}</InputLabel>
                    <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </InputGroup>

                <FormRow>
                    <InputGroup>
                        <InputLabel>{t('price')}</InputLabel>
                        <Input
                            value={price}
                            onChange={(e) => handlePriceChange(e.target.value)}
                            required
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputLabel>{t('kilometers')}</InputLabel>
                        <Input
                            value={kilometers}
                            onChange={(e) => handleKilometersChange(e.target.value)}
                            required
                        />
                    </InputGroup>
                </FormRow>

                <FormRow>
                    <InputGroup>
                        <InputLabel>{t('date')}</InputLabel>
                        <Input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputLabel>{t('category')}</InputLabel>
                        <SelectInput fullWidth required>
                            <Input
                                select
                                value={category}
                                onChange={(e) => setCategory(e.target.value as string)}
                            >
                                <MenuItem value='combustible'>{t('catFuel')}</MenuItem>
                                <MenuItem value='mantenimiento'>{t('catMaintenance')}</MenuItem>
                                <MenuItem value='seguro'>{t('catInsurance')}</MenuItem>
                                <MenuItem value='reparacion'>{t('catRepairs')}</MenuItem>
                                <MenuItem value='otros'>{t('catOther')}</MenuItem>
                            </Input>
                        </SelectInput>
                    </InputGroup>
                </FormRow>

                {/* FOTOS */}
                <InputGroup>
                    <InputLabel>{t('photos')} (max 3)</InputLabel>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {photos.map((photo, index) => (
                            <Box
                                key={index}
                                sx={{
                                    width: 72,
                                    height: 72,
                                    borderRadius: 2,
                                    backgroundImage: `url(${photo})`,
                                    backgroundSize: 'cover',
                                    position: 'relative'
                                }}
                            >
                                <Box
                                    onClick={() => removePhoto(index)}
                                    sx={{
                                        position: 'absolute',
                                        top: -5,
                                        right: -5,
                                        cursor: 'pointer'
                                    }}
                                >
                                    <CloseIcon fontSize="small" />
                                </Box>
                            </Box>
                        ))}

                        {photos.length < 3 && (
                            <Box
                                onClick={handlePhotoClick}
                                sx={{
                                    width: 72,
                                    height: 72,
                                    border: '1px dashed #ccc',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <PhotoCameraIcon />
                            </Box>
                        )}
                    </Box>

                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handlePhotoChange(e.target.files)}
                        style={{ display: 'none' }}
                    />
                </InputGroup>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <SubmitButton type="submit">
                    <AddCircleOutlineIcon />
                    {t('addExpense')}
                </SubmitButton>
            </Form>

            <SnackbarNotification
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={closeSnackbar}
            />
        </Container>
    )
}