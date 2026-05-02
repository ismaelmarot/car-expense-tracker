import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { MenuItem, Box } from '@mui/material'
import { updateCar, getCarById } from '@/api'
import { CATEGORIES } from '@/constants'
import { Icons } from '@/constants'
import { useLanguage } from '@/contexts'
import { SnackbarNotification, UpdateVehicleDateDialog  } from '@/components'
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
  ErrorMessage,
  PhotoItem,
  PhotoBox,
  PhotoItemBox
} from './AddExpense.styles'

export const AddExpense: React.FC = () => {
    const { t, language } = useLanguage()
    const { id } = useParams()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogCategory, setDialogCategory] = useState<'vtv_itv' | 'extintor'>('vtv_itv')
    const [dialogDate, setDialogDate] = useState('')

    const handleExpenseSuccess = (data: { category: string, date: string }) => {
        if (data.category === 'vtv_itv' || data.category === 'extintor') {
            setDialogCategory(data.category as 'vtv_itv' | 'extintor')
            setDialogDate(data.date)
            setDialogOpen(true)
        }
    }

    const handleDialogConfirm = async () => {
        try {
            const carResponse = await getCarById(Number(id))
            const carData = carResponse.data
            const updateField = dialogCategory === 'vtv_itv' ? 'vtv_date' : 'extintor_date'
            await updateCar(Number(id), { ...carData, [updateField]: dialogDate })
            window.dispatchEvent(new CustomEvent('expense-changed'))
        } catch (err) {
            console.error('Error updating vehicle date:', err)
        }
        setDialogOpen(false)
    }

    const handleDialogCancel = () => {
        setDialogOpen(false)
    }

    const {
        description, price, kilometers, category, date, photos, error,
        snackbarOpen, snackbarMessage, snackbarSeverity,
        fileInputRef, setDescription, setCategory, setDate,
        handleSubmit, handlePriceChange, handleKilometersChange,
        handlePhotoClick, handlePhotoChange, removePhoto, closeSnackbar
    } = useAddExpense(handleExpenseSuccess)

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
                                {CATEGORIES.map((cat) => (
                                    <MenuItem key={cat.key} value={cat.key}>
                                        {cat.label[language]}
                                    </MenuItem>
                                ))}
                            </Input>
                        </SelectInput>
                    </InputGroup>
                </FormRow>

                {/* PHOTOS */}
                <InputGroup>
                    <InputLabel>{t('photos')} (max 3)</InputLabel>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {photos.map((photo, index) => (
                            <PhotoItem key={index}>
                                <PhotoItemBox onClick={() => removePhoto(index)}>
                                    <Icons.Close fontSize='small' />
                                </PhotoItemBox>
                            </PhotoItem>
                        ))}

                        {photos.length < 3 && (
                            <PhotoBox onClick={handlePhotoClick}>
                                <Icons.PhotoCamera />
                            </PhotoBox>
                        )}
                    </Box>

                    <input
                        ref={fileInputRef}
                        type='file'
                        multiple
                        accept='image/*'
                        onChange={(e) => handlePhotoChange(e.target.files)}
                        style={{ display: 'none' }}
                    />
                </InputGroup>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <SubmitButton type='submit'>
                    <Icons.Add />
                    {t('addExpense')}
                </SubmitButton>
            </Form>

            <SnackbarNotification
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={closeSnackbar}
            />

            <UpdateVehicleDateDialog
                open={dialogOpen}
                category={dialogCategory}
                date={dialogDate}
                onConfirm={handleDialogConfirm}
                onCancel={handleDialogCancel}
            />
        </Container>
    )
}
