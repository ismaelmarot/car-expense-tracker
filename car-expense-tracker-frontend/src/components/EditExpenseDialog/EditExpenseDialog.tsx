import React, { useRef, useState, useEffect } from 'react'
import { EditExpenseDialogPropsInterface  } from '@/interfaces'
import { Dialog, DialogTitle, MenuItem, Select, Button, Box, Typography } from '@mui/material'
import {
    ButtonSave,
    DialogActionsStyled,
    DialogContentStyled,
    FormControlStyled,
    InputLabelStyled,
    TextFieldStyled,
    TypographyError
} from './EditExpenseDialogStyled'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import CloseIcon from '@mui/icons-material/Close'
import { useLanguage } from '../../contexts/LanguageContext'

const formatPrice = (value: string): string => {
    const cleanValue = value.replace(/[^\d,]/g, '')
    const parts = cleanValue.split(',')
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    if (parts.length > 1) {
        return `${integerPart},${parts[1].slice(0, 2)}`
    }
    return integerPart
}

const formatKilometers = (value: string): string => {
    const cleanValue = value.replace(/[^\d]/g, '');
    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const EditExpenseDialog: React.FC<EditExpenseDialogPropsInterface> = ({ open, expense, error, onClose, onSave, onChange, onPhotosChange }) => {
    const { t } = useLanguage()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [priceDisplay, setPriceDisplay] = useState('')
    const [kmDisplay, setKmDisplay] = useState('')

    const photos = (expense as any)?.photos || []

    useEffect(() => {
        if (expense) {
            const priceValue = expense.amount ?? 0
            setPriceDisplay(formatPrice(String(priceValue).replace('.', ',')))
            setKmDisplay(formatKilometers(String(expense.kilometers)))
        }
    }, [expense])

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const cleanValue = value.replace(/[^\d,]/g, '')
        const formatted = formatPrice(cleanValue);
        setPriceDisplay(formatted)
        const rawValue = parseFloat(cleanValue.replace(/\./g, '').replace(',', '.')) || 0
        onChange('amount', rawValue)
    };

    const handleKmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const cleanValue = value.replace(/[^\d]/g, '')
        const formatted = formatKilometers(cleanValue)
        setKmDisplay(formatted);
        const rawValue = parseInt(cleanValue, 10) || 0
        onChange('kilometers', rawValue)
    };

    const handlePhotoClick = () => {
        fileInputRef.current?.click()
    }

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || !onPhotosChange) return

        const remainingSlots = 3 - photos.length
        if (remainingSlots <= 0) return

        const filesToProcess = Array.from(files).slice(0, remainingSlots)
        
        filesToProcess.forEach(file => {
            const reader = new FileReader()
            reader.onloadend = () => {
                onPhotosChange([...photos, reader.result as string])
            }
            reader.readAsDataURL(file)
        })
    }

    const removePhoto = (index: number) => {
        if (!onPhotosChange) return
        onPhotosChange(photos.filter((_: any, i: number) => i !== index))
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                borderRadius: '20px',
                padding: '0.5rem',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                maxWidth: 400,
                width: '100%',
                },
            }}
        >
            <DialogTitle sx={{ fontWeight: 600, fontSize: '1.25rem' }}>Editar Gasto</DialogTitle>
            <DialogContentStyled>
                {error && (
                    <TypographyError color='error'>
                        {error}
                    </TypographyError>
                )}
                {expense && (
                    <>
                        <TextFieldStyled
                            label={t('description')}
                            value={expense.description}
                            onChange={(e) => onChange('description', e.target.value)}
                        />
                        <TextFieldStyled
                            label={t('price')}
                            value={priceDisplay}
                            onChange={handlePriceChange}
                            placeholder="0,00"
                        />
                        <TextFieldStyled
                            label="Kilómetros"
                            value={kmDisplay}
                            onChange={handleKmChange}
                            placeholder="0"
                        />
                        <FormControlStyled>
                            <InputLabelStyled>{t('category')}</InputLabelStyled>
                            <Select
                                value={expense.category}
                                onChange={(e) => onChange('category', e.target.value)}
                            >
                                <MenuItem value='accesorios'>{t('catAccessories')}</MenuItem>
                                <MenuItem value='chapa_pintura'>{t('catBodyPaint')}</MenuItem>
                                <MenuItem value='combustible'>{t('catFuel')}</MenuItem>
                                <MenuItem value='electricidad'>{t('catElectricity')}</MenuItem>
                                <MenuItem value='estacionamiento'>{t('catParking')}</MenuItem>
                                <MenuItem value='extintor'>{t('catExtinguisher')}</MenuItem>
                                <MenuItem value='grua_asistencia'>{t('catTowing')}</MenuItem>
                                <MenuItem value='lavado'>{t('catWashing')}</MenuItem>
                                <MenuItem value='mantenimiento'>{t('catMaintenance')}</MenuItem>
                                <MenuItem value='mejoras_tuning'>{t('catImprovements')}</MenuItem>
                                <MenuItem value='multas'>{t('catFines')}</MenuItem>
                                <MenuItem value='neumaticos'>{t('catTires')}</MenuItem>
                                <MenuItem value='patente'>{t('catRegistration')}</MenuItem>
                                <MenuItem value='peajes'>{t('catTolls')}</MenuItem>
                                <MenuItem value='reparacion'>{t('catRepairs')}</MenuItem>
                                <MenuItem value='reparaciones_mecanicas'>{t('catMechanicalRepairs')}</MenuItem>
                                <MenuItem value='repuestos'>{t('catParts')}</MenuItem>
                                <MenuItem value='seguro'>{t('catInsurance')}</MenuItem>
                                <MenuItem value='service'>{t('catService')}</MenuItem>
                                <MenuItem value='vtv_itv'>{t('catInspection')}</MenuItem>
                                <MenuItem value='otros'>{t('catOther')}</MenuItem>
                            </Select>
                        </FormControlStyled>
                        <TextFieldStyled
                            label={t('date')}
                            type='date'
                            value={expense.date}
                            onChange={(e) => onChange('date', e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        
                        {onPhotosChange && (
                            <Box sx={{ mt: 2 }}>
                                <Typography sx={{ fontSize: '0.8125rem', color: '#86868b', mb: 1, fontWeight: 500 }}>
                                    {t('photos')} ({photos.length}/3)
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    {photos.map((photo: string, index: number) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                width: 64,
                                                height: 64,
                                                borderRadius: '12px',
                                                backgroundImage: `url(${photo})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                position: 'relative',
                                            }}
                                        >
                                            <Box
                                                onClick={() => removePhoto(index)}
                                                sx={{
                                                    position: 'absolute',
                                                    top: -6,
                                                    right: -6,
                                                    width: 20,
                                                    height: 20,
                                                    borderRadius: '50%',
                                                    background: 'rgba(0,0,0,0.6)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    '&:hover': { background: '#ff3b30' }
                                                }}
                                            >
                                                <CloseIcon sx={{ fontSize: 12, color: 'white' }} />
                                            </Box>
                                        </Box>
                                    ))}
                                    {photos.length < 3 && (
                                        <Box
                                            onClick={handlePhotoClick}
                                            sx={{
                                                width: 64,
                                                height: 64,
                                                borderRadius: '12px',
                                                border: '1.5px dashed #c7c7cc',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                '&:hover': { borderColor: '#0071e3', background: 'rgba(0,113,227,0.05)' }
                                            }}
                                        >
                                            <PhotoCameraIcon sx={{ fontSize: 20, color: '#aeaeb2' }} />
                                        </Box>
                                    )}
                                </Box>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handlePhotoChange}
                                    style={{ display: 'none' }}
                                />
                            </Box>
                        )}
                    </>
                )}
                <DialogActionsStyled>
                    <Button onClick={onClose} sx={{ borderRadius: '34px' }}>{t('cancel')}</Button>
                    <ButtonSave onClick={onSave}>{t('save')}</ButtonSave>
                </DialogActionsStyled>
            </DialogContentStyled>
        </Dialog>
    )
}